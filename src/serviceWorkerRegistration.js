export function register() {
    // Register the service worker in production only
    if ('serviceWorker' in navigator && 'SyncManager' in window && process.env.NODE_ENV === 'production') {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register(`${process.env.PUBLIC_URL}/sw.js`) // Adjust path to your service worker
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration);

                    // Register Background Sync
                    registration.sync.register('sync-cache').catch((err) => {
                        console.error('Background Sync registration failed:', err);
                    });

                    // Register Periodic Sync (if supported by the browser)
                    if ('periodicSync' in registration) {
                        registration.periodicSync
                            .register('periodic-cache-update', {
                                minInterval: 24 * 60 * 60 * 1000, // Once every 24 hours
                            })
                            .then(() => console.log('Periodic Sync registered successfully'))
                            .catch((err) => {
                                console.error('Periodic Sync registration failed:', err);
                            });
                    }

                    // Listen for updates to the service worker
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log('New content is available; please refresh.');
                                } else {
                                    console.log('Content is cached for offline use.');
                                }
                            }
                        };
                    };
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration
                    .unregister()
                    .then(() => {
                        console.log('Service Worker unregistered successfully.');
                    })
                    .catch((error) => {
                        console.error('Service Worker unregistration failed:', error);
                    });
            })
            .catch((error) => {
                console.error('Service Worker readiness check failed:', error);
            });
    }
}