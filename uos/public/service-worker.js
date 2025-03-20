// 캐시를 식별하기 위한 식별자
const CACHE_NAME = "paaranuos-cache-v1";

// 캐시에 저장할 파일 목록 (= 오프라인에서 사용할 파일들)
const CACHE_LIST = [
  "/",
  "/index.html",
  "/offline.html",
  "/favicon.ico",
  "/assets/icons/icons.svg",
  "/assets/fonts/Pretendard-Light.woff",
  "/assets/fonts/Pretendard-Medium.woff",
];

// Service Worker가 설치될 때 실행 (초기 캐시 설정 병행)
self.addEventListener("install", (event) => {
  event.waitUntil(
    // 새로운 캐시를 열고, urlsToCache에 정의된 파일을 추가
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_LIST); // 지정한 파일을 캐시에 추가
    })
  );
});

// 네트워크 인터셉터
// 캐시에서 응답을 제공하거나 네트워크 요청을 시도
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 응답이 정상적인지 확인 (200 OK 등)
        if (!response || response.status !== 200) {
          // 정상적이지 않은 응답은 그대로 반환 (혹은 추가 처리 가능)
          return response;
        }
        // 정상적인 응답인 경우 캐시에 저장하여 동적 업데이트
        const responseClone = response.clone(); // 응답은 한 번만 사용 가능하므로 복제
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // 네트워크 요청 실패 시 처리
        if (event.request.mode === "navigate") {
          // 페이지 탐색 요청인 경우 오프라인 페이지 제공
          return caches.match("/offline.html");
        }
        // 그 외 요청은 캐시된 데이터 제공
        return caches.match(event.request);
      })
  );
});

// Service Worker 활성화 시, 구버전 캐시 삭제 및 클라이언트 제어
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              // 구버전 캐시 삭제
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => {
        // 새로운 SW가 즉시 모든 클라이언트를 제어할 수 있도록 함
        return self.clients.claim();
      })
  );
});
