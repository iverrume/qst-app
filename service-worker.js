// service-worker.js

// Имя нашего кэша. Важно менять его (например, v2, v3), когда вы обновляете файлы.
const CACHE_NAME = 'qst-app-cache-v1';

// Список файлов, которые нужно сразу сохранить в кэш (наш "каркас" приложения).
const URLS_TO_CACHE = [
  '/', // Главная страница
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'favicon.png'
  // Добавьте сюда другие статичные файлы, если они есть (например, картинки, шрифты)
];

// Событие 'install' (установка): Срабатывает, когда браузер впервые видит этот Service Worker.
// Это идеальное место, чтобы закэшировать наш каркас приложения.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Установка...');
  
  // Мы просим браузер подождать, пока мы не закончим кэширование.
  event.waitUntil(
    // Открываем (или создаем) наш кэш по имени.
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Кэширование каркаса приложения...');
        // Добавляем все файлы из нашего списка в кэш.
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch((err) => {
        console.error('Service Worker: Ошибка при кэшировании', err);
      })
  );
});

// Событие 'fetch' (перехват запросов): Срабатывает КАЖДЫЙ РАЗ, когда страница делает запрос
// (например, за файлом стилей, картинкой или даже запросом к API).
self.addEventListener('fetch', (event) => {
  // Мы не будем кэшировать запросы к Firebase, чтобы чат всегда работал с актуальными данными.
  // Также игнорируем запросы к Google Apps Script.
  if (event.request.url.includes('firebase') || event.request.url.includes('script.google.com')) {
    // Просто продолжаем выполнять запрос как обычно, ничего не делая.
    return;
  }

  // Применяем стратегию "Cache First" (Сначала кэш, потом сеть).
  event.respondWith(
    // Ищем соответствующий запрос в нашем кэше.
    caches.match(event.request)
      .then((cachedResponse) => {
        // Если ответ найден в кэше - отдаем его.
        if (cachedResponse) {
          // console.log('Service Worker: Отдаем из кэша:', event.request.url);
          return cachedResponse;
        }

        // Если в кэше ничего нет - выполняем реальный сетевой запрос.
        // console.log('Service Worker: Запрос в сеть:', event.request.url);
        return fetch(event.request);
      })
  );
});

// Событие 'activate' (активация): Срабатывает после установки.
// Здесь можно почистить старые кэши, если они есть.
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Активация...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Если имя кэша не совпадает с текущим, удаляем его.
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Удаление старого кэша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});```

