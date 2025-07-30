// service-worker.js

// Имя и версия нашего кеша. 
// ВАЖНО: Если вы обновите файлы (например, измените CSS), 
// вам нужно будет изменить эту версию (например, на 'qst-app-cache-v2'),
// чтобы Service Worker понял, что нужно кешировать файлы заново.
const CACHE_NAME = 'qst-app-cache-v2';

// Список файлов, которые мы хотим сохранить в кеш для офлайн-работы.
// Мы кешируем основные "оболочечные" файлы приложения.
const URLS_TO_CACHE = [
  '/', // Кешируем главную страницу
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.png',
  '/manifest.json'
  // Если у вас есть другие важные ресурсы (шрифты, изображения), добавьте их сюда.
];

// Событие 'install' (установка). Срабатывает, когда браузер впервые видит этот service worker.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Установка...');
  
  // Мы говорим браузеру подождать, пока не выполнится наш код внутри.
  event.waitUntil(
    // Открываем (или создаем) наш кеш по имени.
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Кеширование основных файлов');
        // Добавляем все файлы из нашего списка в кеш.
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error('Service Worker: Ошибка при кешировании', err);
      })
  );
});

// Событие 'activate' (активация). Срабатывает после установки.
// Здесь мы обычно удаляем старые кеши, чтобы не занимать лишнее место.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Активация...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Если имя кеша не совпадает с текущим, удаляем его.
          // Это полезно, когда вы обновляете версию с 'v1' на 'v2'.
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

// Событие 'fetch' (перехват запросов).
// Это сердце Service Worker. Он перехватывает ВСЕ запросы с вашего сайта.
self.addEventListener('fetch', (event) => {
  // Мы применяем стратегию "Cache first" (сначала кеш).
  event.respondWith(
    // Пытаемся найти ответ на этот запрос в нашем кеше.
    caches.match(event.request)
      .then((cachedResponse) => {
        // Если ответ нашелся в кеше - отдаем его.
        // Это и обеспечивает офлайн-работу и быструю загрузку.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Если в кеше ничего нет - делаем обычный запрос в интернет.
        return fetch(event.request);
      })
  );
});