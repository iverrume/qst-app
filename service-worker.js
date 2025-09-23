
// Импортируем скрипты Firebase для работы с Firestore внутри Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');

// Конфигурация Firebase (та же, что и в основном приложении)
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDk4J8N0mdPpFtulT5DMr2Y8tHX93HrU2s",
    authDomain: "qst-chat.firebaseapp.com",
    projectId: "qst-chat",
    storageBucket: "qst-chat.appspot.com",
    messagingSenderId: "24969645733",
    appId: "1:24969645733:web:47bc96a13817544246074c"
};

// Инициализируем Firebase
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

// Настройки для IndexedDB
const IDB_NAME = 'QSTiUM_AppDB';
const IDB_STORE_NAME = 'offlineMessages';


const CACHE_NAME = 'qst-app-cache-v393'; 

// Файлы, которые составляют "оболочку" приложения и будут закешированы
const URLS_TO_CACHE = [
  './', 
  'index.html',
  'style.css',
  'script.js',
  'favicon.png',
  'manifest.json',
  // === НАЧАЛО НОВОГО КОДА ===
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js'
  // === КОНЕЦ НОВОГО КОДА ===
];

// Событие 'install': кешируем оболочку приложения
self.addEventListener('install', (event) => {
  console.log('Service Worker: Установка новой версии...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Кеширование основных файлов приложения');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error('Service Worker: Ошибка при кешировании', err);
      })
  );
});

// Событие 'activate': удаляем старые кеши и включаем Navigation Preload
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Активация новой версии...');
  event.waitUntil((async () => {
    // 1. Включаем Navigation Preload для ускорения загрузки
    if (self.registration.navigationPreload) {
      try {
        await self.registration.navigationPreload.enable();
        console.log('Service Worker: Navigation Preload включен.');
      } catch (e) {
        console.error('Service Worker: Не удалось включить Navigation Preload.', e);
      }
    }
    
    // 2. Удаляем старые, ненужные кеши
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log('Service Worker: Удаление старого кеша', cacheName);
          return caches.delete(cacheName);
        }
      })
    );
    
    // 3. Захватываем контроль над всеми открытыми страницами
    return self.clients.claim();
  })());
});

// Событие 'fetch': перехватываем сетевые запросы с новыми стратегиями
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // === НАЧАЛО ИЗМЕНЕНИЙ: Логика для сторонних ресурсов (CDN) ===
  const requestUrl = new URL(request.url);
  const cdnHosts = ['unpkg.com', 'cdn.jsdelivr.net', 'fonts.gstatic.com', 'fonts.googleapis.com'];

  if (cdnHosts.includes(requestUrl.hostname)) {
    // Стратегия "Кэш, потом сеть" (Cache First) для стабильных CDN-ресурсов
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse; // Если есть в кэше, отдаем сразу
        }
        // Если нет, идем в сеть и кешируем ответ
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      })
    );
    return;
  }
  // === КОНЕЦ ИЗМЕНЕНИЙ ===

  // Игнорируем не-GET запросы и запросы к Firebase
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // СТРАТЕГИЯ 1: Для HTML-страниц (навигация) - "Сеть сначала, потом кэш"
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          console.log('Service Worker: Используем предзагруженный ответ для навигации.');
          return preloadResponse;
        }
        const networkResponse = await fetch(request);
        return networkResponse;
      } catch (error) {
        console.log('Service Worker: Сеть недоступна, отдаем index.html из кэша.');
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match('index.html');
        return cachedResponse;
      }
    })());
    return;
  }

  // СТРАТЕГИЯ 2: Для статики (CSS, JS, картинки) - "Stale-While-Revalidate"
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(err => {
      console.warn('Service Worker: Не удалось обновить ресурс из сети:', request.url, err.message);
    });
    return cachedResponse || fetchPromise;
  })());
});


// Событие 'message' остается без изменений
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    console.log('Service Worker: Получена команда skipWaiting. Активация...');
    self.skipWaiting();
  }
});

// Событие 'sync': срабатывает, когда появляется интернет
self.addEventListener('sync', (event) => {
  // Проверяем, что это именно наш тэг для синхронизации чата
  if (event.tag === 'sync-chat-messages') {
    console.log('Service Worker: Обнаружено событие синхронизации чата. Отправка сообщений...');
    // Говорим браузеру не выключать SW, пока мы не закончим
    event.waitUntil(sendOfflineMessages());
  }
});

// Асинхронная функция для отправки сообщений
async function sendOfflineMessages() {
  const messagesToSend = await getMessagesFromIDB();

  if (messagesToSend.length === 0) {
    console.log('Service Worker: Нет сообщений для синхронизации.');
    return;
  }

  const promises = messagesToSend.map(async (msg) => {
    try {
      // Для каждого сообщения пытаемся добавить его в Firestore
      // Добавляем серверное время, так как сообщение отправляется только сейчас
      msg.data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('messages').add(msg.data);
      // Если успешно, удаляем его из локальной базы
      await deleteMessageFromIDB(msg.key);
      console.log('Service Worker: Сообщение успешно синхронизировано и удалено из IDB.');
    } catch (error) {
      console.error('Service Worker: Не удалось синхронизировать сообщение:', error);
      // Если произошла ошибка, сообщение останется в IDB для следующей попытки
    }
  });

  await Promise.all(promises);

  // Показываем уведомление пользователю, что его сообщения доставлены
  self.registration.showNotification('Сообщения доставлены!', {
    body: 'Ваши офлайн-сообщения были успешно отправлены.',
    icon: '/favicon.png'
  });
}

// Функции-хелперы для работы с IndexedDB внутри Service Worker
function openIDB() {
  return new Promise((resolve, reject) => {
    const request = self.indexedDB.open(IDB_NAME, 1);
    request.onerror = (e) => reject('Ошибка открытия IDB в SW:', e.target.error);
    request.onsuccess = (e) => resolve(e.target.result);
  });
}

async function getMessagesFromIDB() {
  const db = await openIDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(IDB_STORE_NAME, 'readonly');
    const store = transaction.objectStore(IDB_STORE_NAME);
    const request = store.getAll();
    const keysRequest = store.getAllKeys(); // Запрашиваем и ключи
    
    let messages = [];
    // Когда оба запроса завершены
    Promise.all([
        new Promise(res => keysRequest.onsuccess = () => res(keysRequest.result)),
        new Promise(res => request.onsuccess = () => res(request.result))
    ]).then(([keys, data]) => {
        messages = data.map((d, i) => ({ key: keys[i], data: d }));
        resolve(messages);
    });
  });
}

async function deleteMessageFromIDB(key) {
  const db = await openIDB();
  const transaction = db.transaction(IDB_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(IDB_STORE_NAME);
  store.delete(key);
}