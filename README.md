# 🚀 paaran-jsdelivr ::: 파아란 서비스의 Static File CDN 저장소
이 저장소는 **파아란(PAARAN) 서비스의 정적 파일(CSS, JS, 이미지 등)을 CDN으로 제공하기 위한 GitHub 저장소**입니다.  
GitHub에 업로드된 파일은 [JSDelivr](https://www.jsdelivr.com/)을 통해 글로벌 CDN으로 빠르게 서빙됩니다.  

---

## 📂 레포지토리 구조
```
/public          → 앱에서 사용하는 기본 정적 파일 (favicon, manifest.json, og 이미지 등)
/static
  ├── css       → CSS 스타일 파일
  ├── fonts     → 웹 폰트
  ├── images    → 서비스에서 사용하는 정적 이미지 파일
  ├── js        → React 번들 파일 (최소한의 JS 파일만 업로드)
```

---

## 🚀 CDN 사용 방법
이 저장소의 정적 파일들은 **JSDelivr CDN**을 통해 빠르게 로드할 수 있습니다.

### ✅ JavaScript 파일 불러오기
```html
<script src="https://cdn.jsdelivr.net/gh/junwoo5914/paaran-static@main/static/js/main.js"></script>
```

### ✅ CSS 파일 불러오기
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/junwoo5914/paaran-static@main/static/css/main.css">
```

### ✅ 이미지 파일 불러오기
```html
<img src="https://cdn.jsdelivr.net/gh/junwoo5914/paaran-static@main/static/images/logo.png" />
```

### ✅ 웹 폰트 로드
```css
@import url('https://cdn.jsdelivr.net/gh/junwoo5914/paaran-static@main/static/fonts/pretendard.css');
```

---

## 🛠 배포 및 관리 가이드
### 📌 1. 새로운 정적 파일 업로드
새로운 정적 파일을 업로드할 때는 반드시 `main` 브랜치에 올려야 합니다.  
✅ **CDN이 최신 버전을 제공하려면 브랜치를 `@main`으로 유지하세요.**

### 📌 2. 변경된 파일 즉시 반영
JSDelivr는 GitHub의 최신 커밋을 자동으로 캐싱하지만, 강제 갱신이 필요할 경우 **URL 끝에 `?v=1.0.1` 등의 버전 쿼리를 추가**하면 됩니다.

```html
<script src="https://cdn.jsdelivr.net/gh/junwoo5914/paaran-static@main/static/js/main.js?v=1.0.1"></script>
```

### 📌 3. 파일 삭제 또는 업데이트
- **기존 파일을 삭제하지 않는 것을 권장**합니다.  
- 새로운 버전의 파일은 기존 파일을 덮어쓰는 방식으로 업데이트하세요.  

---

## ❓ FAQ
### **Q1: JSDelivr를 통해 모든 파일이 즉시 반영되나요?**
> JSDelivr는 자동으로 최신 커밋을 캐싱하지만, 변경 사항이 즉시 반영되지 않을 수 있습니다.  
> 👉 **강제 갱신이 필요하면 URL 끝에 `?v=1.0.1` 등의 버전 쿼리를 추가하세요.**

### **Q2: CDN에서 특정 파일을 삭제할 수 있나요?**
> GitHub에서 파일을 삭제해도 **JSDelivr의 캐싱 정책상 일정 기간 동안 캐싱된 파일이 유지될 수 있습니다.**  
> 👉 빠른 제거가 필요하면 새로운 파일명을 사용하여 업로드하는 것이 가장 효과적입니다.

---

## 🚀 결론
이 레포지토리는 **파아란 서비스의 정적 파일을 글로벌 CDN(JSDelivr)으로 배포하는 용도로 사용됩니다.**  
💡 **React 앱의 필수 파일만 업로드하여 경량화하고, 빠르게 로딩될 수 있도록 최적화합니다.** 🚀

---

📌 **문의 및 제안사항**은 paaran2024@gmail.com으로 이메일 보내주세요. 🙌
