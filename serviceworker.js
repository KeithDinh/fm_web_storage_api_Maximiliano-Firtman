// Also registered the service worker file in app.js
// The service worker need to be at project level folder to have scope entire project

self.addEventListener("install", async event => {
    const assets = ["/", "styles.css", "/scripts/API.js", "/scripts/app.js", 
            "/scripts/Menu.js", "/scripts/Order.js", "/scripts/Router.js",
            "/images/logo.svg", "/images/icons/icon.png",
            "https://cdn.jsdelivr.net/npm/idb@7/build/umd.js",
            "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap",
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
            "https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2",
            "https://fonts.gstatic.com/s/materialsymbolsoutlined/v68/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHOejbd5zrDAt.woff2"
        ];
    const cache = await caches.open("cm-assets");
    cache.addAll(assets);
});

// Everytime the app makes a fetch request, this event will fire
self.addEventListener("fetch", async event => {
    event.respondWith(
        
        (async () => {
            try {
                const fetchResponse = await fetch(event.request);
                // Update the cache
                const cache = await caches.open("cm-updateassets");
                cache.put(event.request, fetchResponse);
                
                return fetchResponse;
            } catch (e) {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;
            }
        })()
            
    );
});
