// Service Worker for Flora Yanma Atlası - Cloudflare CDN Optimized
const CACHE_NAME = 'flora-atlas-v2';
const STATIC_CACHE = 'flora-static-v2';
const DYNAMIC_CACHE = 'flora-dynamic-v2';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/plants.html',
    '/about.html',
    '/privacy.html',
    '/terms.html',
    '/non-critical.css',
    '/navbar.js',
    '/footer.js',
    '/script.js',
    '/audio-system.js',
    '/manifest.json',
    // Static assets
    '/static/favicon.ico',
    '/static/apple-touch-icon.png',
    '/static/favicon-32x32.png',
    '/static/favicon-16x16.png',
    '/static/icon-192x192.png',
    '/static/icon-512x512.png',
    // Critical images
    '/images/plants/aloe-vera.jpg',
    '/images/plants/kaktus.jpg',
    '/images/plants/ada-cayi.jpg',
    '/images/plants/lavanta.jpg',
    '/images/plants/biberiye.jpg',
    '/images/plants/defne.jpg',
    '/images/plants/zeytin.jpg',
    '/images/plants/etli-sukulentler.jpg',
    '/images/plants/akasya.jpg',
    '/images/plants/ortanca.jpg'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Error caching static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    console.log('Serving from cache:', request.url);
                    return response;
                }

                // Otherwise fetch from network
                console.log('Fetching from network:', request.url);
                return fetch(request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache strategy based on file type
                        if (request.url.includes('/static/') || request.url.includes('/images/')) {
                            // Static assets and images - Cache First
                            caches.open(STATIC_CACHE)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                        } else if (request.url.endsWith('.html')) {
                            // HTML files - Network First
                            caches.open(DYNAMIC_CACHE)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                        }

                        return response;
                    })
                    .catch(error => {
                        console.error('Fetch failed:', error);
                        
                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        // Return a fallback for other requests
                        return new Response('Offline - Content not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle background sync tasks
            console.log('Background sync triggered')
        );
    }
});

// Push notifications (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/static/icon-192x192.png',
            badge: '/static/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Keşfet',
                    icon: '/static/action-explore.png'
                },
                {
                    action: 'close',
                    title: 'Kapat',
                    icon: '/static/action-close.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/plants.html')
        );
    } else if (event.action === 'close') {
        // Just close the notification
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
