'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "3121b3d799c8d72b37b470bf0a2c2047",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/images/Ameli/Slide1.PNG": "1de7fb5cf1fbc23fb1cf79e464f39e57",
"assets/images/Ameli/Slide10.PNG": "da05673fe376b2e87559a5b5b9283964",
"assets/images/Ameli/Slide11.PNG": "1e6042fb266abec21a1c567bcf5aa1be",
"assets/images/Ameli/Slide12.PNG": "b02bd70c4d333c7d53606c618e84b9c3",
"assets/images/Ameli/Slide13.PNG": "f40cfe92b6e5bcce3f01155eec461163",
"assets/images/Ameli/Slide14.PNG": "eb0919921f39659efb6e8d5d1a5d2082",
"assets/images/Ameli/Slide15.PNG": "496347c28dc6044d7b1def52d3e4ad7a",
"assets/images/Ameli/Slide16.PNG": "9cc7530bf80aef24dbceec75e3054ef2",
"assets/images/Ameli/Slide2.PNG": "5fc296e8002ccf4c7e47b5191268318d",
"assets/images/Ameli/Slide3.PNG": "d2070e6fdd7604f7e948bb6a1dfa0ae4",
"assets/images/Ameli/Slide4.PNG": "96e90c0408f2656183807a1d6fc07693",
"assets/images/Ameli/Slide5.PNG": "cfddeb619f9190001aef590602930e52",
"assets/images/Ameli/Slide6.PNG": "aae113fbda7b08af7cb1e4495d3b5efc",
"assets/images/Ameli/Slide7.PNG": "629639112d91d0fbcfdfc9170c527aff",
"assets/images/Ameli/Slide8.PNG": "09e91ceff36e9725114e7f2bf690daaf",
"assets/images/Ameli/Slide9.PNG": "a12d24803883a23f9325896dbd07b239",
"assets/images/aymen_profil.jpg": "ac5a41f2fab1e2796a02ee17a1bbc044",
"assets/images/computer_engineer.png": "bc53b2e3c03669952e653a3a307f8b1c",
"assets/images/social_media/address.png": "034fba3bd049afbf7cb32e390e1f1813",
"assets/images/social_media/facebook.png": "c64e7abb1e9965f246134584eff1fd4c",
"assets/images/social_media/github.png": "64f10cd1360f79dcf35556a615fcbbfd",
"assets/images/social_media/gmail.png": "5b90d15eb0cf386a19fe545c676d08f9",
"assets/images/social_media/instagram.png": "13e82ffb2ba5b735a1728fbe7b8d6c71",
"assets/images/social_media/linkedin.png": "65d5c37359de4d33df40a6a5676febfd",
"assets/images/social_media/phone.png": "615422813cedb8e86be82d62d7fe144d",
"assets/images/social_media/twitter.png": "fb5ece9be6e41ee5c8446ff88e703712",
"assets/images/social_media/youtube.png": "4c553f89cc541767b82e12e7048c05f4",
"assets/NOTICES": "a681c612104e8a17bf4590b46a1da62b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"aymen_profil.jpg": "ac5a41f2fab1e2796a02ee17a1bbc044",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "13575b1731b3918f2984f1642906bfe2",
"/": "13575b1731b3918f2984f1642906bfe2",
"main.dart.js": "774c3d9b61c6b02e9a1ab989b64a6192",
"manifest.json": "068335c4a426d13f92d38e512f78a403",
"version.json": "f017367c31e7d480e89c747233bc3f47"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
