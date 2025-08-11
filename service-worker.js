// service-worker.js

// ВАЖНО: При каждом обновлении ОСНОВНЫХ файлов (css, js) меняйте версию кеша!
// Например, 'qst-app-cache-v279', 'qst-app-cache-v280' и т.д.
const CACHE_NAME = 'qst-app-cache-v282'; // Версию пока оставляем, чтобы не вызвать лишнее обновление

// Файлы, которые составляют "оболочку" приложения и будут закешированы
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.png',
  '/manifest.json'
  // '/offline.html' // Можно добавить отдельную страницу для офлайн-режима
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

  // Игнорируем не-GET запросы и запросы к сторонним API (как и было)
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // СТРАТЕГИЯ 1: Для HTML-страниц (навигация) - "Сеть сначала, потом кэш"
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Пытаемся использовать предзагруженный ответ, если он есть
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          console.log('Service Worker: Используем предзагруженный ответ для навигации.');
          return preloadResponse;
        }

        // Если предзагрузки нет, делаем обычный запрос в сеть
        const networkResponse = await fetch(request);
        return networkResponse;
      } catch (error) {
        // Если сеть недоступна, достаем главный HTML из кэша
        console.log('Service Worker: Сеть недоступна, отдаем index.html из кэша.');
        const cache = await caches.open(CACHE_NAME);
        // Важно отдавать именно /index.html, а не "/", чтобы избежать проблем
        const cachedResponse = await cache.match('/index.html');
        return cachedResponse;
      }
    })());
    return;
  }

  // СТРАТЕГИЯ 2: Для статики (CSS, JS, картинки) - "Stale-While-Revalidate"
  // (Отдаем из кэша сразу, а в фоне обновляем)
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    // Делаем запрос в сеть в любом случае
    const fetchPromise = fetch(request).then(networkResponse => {
      // Если запрос успешный, обновляем кэш
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(err => {
      // Сетевая ошибка, ничего страшного, если есть кэш
      console.warn('Service Worker: Не удалось обновить ресурс из сети:', request.url, err.message);
    });

    // Если ресурс есть в кэше, отдаем его немедленно.
    // Если нет - ждем ответа от сети.
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