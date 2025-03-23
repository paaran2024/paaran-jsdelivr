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
        // 네트워크 요청이 성공하면 그대로 반환
        return response;
      })
      .catch(() => {
        // 네트워크 요청이 실패한 경우
        if (event.request.mode === "navigate") {
          // 탐색 요청(navigate)이 실패하면 offline.html 반환
          return caches.match("/offline.html");
        }
        // 탐색 요청이 아닌 경우 기존 캐시 확인
        return caches.match(event.request);
      })
  );
});

// Service Worker가 활성화될 때 실행
self.addEventListener("activate", (event) => {
  // 유지할 캐시 이름 리스트
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    // 현재 저장된 모든 캐시 조회
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          // 현재 버전에 포함되지 않은 캐시 삭제 (= 구버전 캐시 삭제)
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
