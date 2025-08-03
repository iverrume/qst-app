// service-worker.js (версия с полным исправлением CORS)

// ВАЖНО: При обновлении основных файлов (css, js) меняйте версию кеша, например, на 'v3'
const CACHE_NAME = 'qst-app-cache-v147'; // <--- ИЗМЕНЕНИЕ: Версия кеша увеличена

// Файлы, которые составляют "оболочку" приложения и могут быть закешированы
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
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Кеширование основных файлов');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Принудительно активируем новый Service Worker
      .catch(err => {
        console.error('Service Worker: Ошибка при кешировании', err);
      })
  );
});

// Событие 'activate': удаляем старые кеши
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Активация новой версии...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Удаление старого кеша', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Захватываем контроль над открытыми страницами
  );
});

// Событие 'fetch': перехватываем запросы
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // --- НАЧАЛО КЛЮЧЕВОГО ИСПРАВЛЕНИЯ ---

  // 1. Игнорируем не-GET запросы. Мы не вызываем event.respondWith(),
  //    поэтому браузер обработает их самостоятельно, как будто Service Worker нет.
  if (request.method !== 'GET') {
    // Просто выходим из обработчика, ничего не делая.
    return;
  }

  // 2. Игнорируем запросы к сторонним API (включая Google Scripts).
  //    Это предотвращает вмешательство в CORS-запросы.
  if (!request.url.startsWith(self.location.origin)) {
    // Просто выходим из обработчика.
    return;
  }

  // --- КОНЕЦ КЛЮЧЕВОГО ИСПРАВЛЕНИЯ ---

  // Для всех остальных запросов (GET-запросы к нашему сайту) используем стратегию "Сначала кеш"
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Если ответ есть в кеше, отдаем его
        if (cachedResponse) {
          return cachedResponse;
        }
        // Если нет - идем в сеть
        return fetch(request).then(response => {
           // (Опционально) Можно добавить логику для кеширования новых ресурсов на лету
           return response;
        });
      })
  );
});