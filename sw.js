const CACHE_NAME = 'egames-v2'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación: Guardamos lo esencial sin bloquear si falta algún extra
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(err => console.log('Error caché inicial:', err));
    }).then(() => self.skipWaiting()) 
  );
});

// Activación: Borra versiones viejas de caché
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) 
  );
});

// Estrategia: Buscar primero en la red, si no hay conexión, usar caché
self.addEventListener('fetch', (e) => {
  // Ignoramos peticiones que no sean GET (como extensiones o analíticas)
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Opcional: podrías clonar y guardar en caché dinámicamente si querés
        return response;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
