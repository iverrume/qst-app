// service-worker.js

// ВАЖНО: При каждом обновлении основных файлов (css, js, html) меняйте версию кеша!
// Например, 'qst-app-cache-v202', 'qst-app-cache-v203' и т.д.
const CACHE_NAME = 'qst-app-cache-v276';

// Файлы, которые составляют "оболочку" приложения и будут закешированы
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.png',
  '/manifest.json'
];

// Событие 'install': кешируем оболочку приложения
self.addEventListener('install', (event) => {
  console.log('Service Worker: Установка новой версии...');
  // waitUntil() заставляет браузер ждать, пока кеширование не будет завершено
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

// Событие 'activate': удаляем старые, ненужные кеши
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Активация новой версии...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // Проходим по всем кешам и удаляем те, что не совпадают с текущей версией
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Удаление старого кеша', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Захватываем контроль над всеми открытыми страницами, чтобы обновление применилось сразу
      return self.clients.claim();
    })
  );
});

// Событие 'fetch': перехватываем сетевые запросы
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 1. Игнорируем не-GET запросы (например, POST к API), чтобы они шли напрямую в сеть.
  if (request.method !== 'GET') {
    return;
  }

  // 2. Игнорируем запросы к сторонним API (Google, Firebase), чтобы избежать проблем с CORS.
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  // Для всех остальных запросов (к нашему сайту) используем стратегию "Сначала кеш, потом сеть".
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Если ответ найден в кеше, возвращаем его
        if (cachedResponse) {
          return cachedResponse;
        }
        // Если в кеше ничего нет, делаем обычный сетевой запрос
        return fetch(request);
      })
  );
});

// Событие 'message': слушаем команды от основного приложения (script.js)
self.addEventListener('message', (event) => {
  // Проверяем, пришла ли команда на пропуск ожидания
  if (event.data && event.data.action === 'skipWaiting') {
    console.log('Service Worker: Получена команда skipWaiting. Активация...');
    // Эта команда заставляет новый Service Worker немедленно стать активным,
    // не дожидаясь, пока пользователь закроет все вкладки.
    self.skipWaiting();
  }
});