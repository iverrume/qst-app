// service-worker.js (версия с исправлением CORS)

// ВАЖНО: При обновлении основных файлов (css, js) меняйте версию кеша, например, на 'v3'
const CACHE_NAME = 'qst-app-cache-v2';

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
  console.log('Service Worker: Установка...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Кеширование основных файлов');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error('Service Worker: Ошибка при кешировании', err);
      })
  );
});

// Событие 'activate': удаляем старые кеши
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Активация...');
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
    })
  );
  return self.clients.claim();
});

// Событие 'fetch': перехватываем запросы
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // --- НАЧАЛО ИСПРАВЛЕНИЯ ---
  
  // 1. Не перехватываем запросы, которые не являются GET (например, POST для загрузки файлов)
  if (request.method !== 'GET') {
    // Просто пропускаем запрос напрямую в сеть, не пытаясь его кешировать
    event.respondWith(fetch(request));
    return;
  }
  
  // 2. Не перехватываем запросы к сторонним API (включая Google Scripts)
  if (!request.url.startsWith(self.location.origin)) {
     // Просто пропускаем запрос напрямую в сеть
    event.respondWith(fetch(request));
    return;
  }

  // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

  // Для всех остальных (GET-запросы к нашему сайту) используем стратегию "Сначала кеш"
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