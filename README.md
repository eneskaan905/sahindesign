# Şahin Design

Cloudflare Pages üzerinde yayınlanmak üzere hazırlanmış Türkçe kurumsal web sitesi. Arayüz React, TypeScript ve Vite; içerik yönetimi Sveltia CMS; içerik deposu GitHub'dır.

## Yerelde çalıştırma

`npm install` ile bağımlılıkları kurun. `npm run dev` ile Vite geliştirme sunucusunu başlatın. `/admin` CMS sayfası yerel sunucuda açılır; Sveltia, gerçek GitHub OAuth girişi ve kayıt için GitHub deposu ile Authenticator Worker yapılandırması gerektirir.

## Cloudflare'e yayınlama

1. GitHub'da bu projeye ait bir repository oluşturup proje dosyalarını `main` dalına gönderin. Sveltia CMS konfigürasyonundaki `repo` değeri `owner/repository` biçiminde olmalı.
2. Cloudflare Pages'te **Connect to Git** ile aynı GitHub repository'sini bağlayın. Build command `npm run build`, build output directory `dist`, production branch `main` olsun. CMS her kayıtta GitHub'a commit eder; bu bağlantı commit'leri otomatik yeni site yayınına dönüştürür. Manuel `wrangler pages deploy` akışı bu CMS kullanımında uygun değildir.
3. [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) deposundaki **Deploy to Cloudflare Workers** adımıyla ayrı Authenticator Worker'ı yayınlayın. Worker adresi `https://<worker>.<hesap>.workers.dev` biçimindedir.
4. GitHub'da bir OAuth App oluşturun. Callback URL'si tam olarak `<AUTHENTICATOR_WORKER_URL>/callback` olmalı. Uygulamanın Client ID ve Client Secret değerlerini not edin.
5. Authenticator Worker ayarlarına `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` ve `ALLOWED_DOMAINS` değerlerini ekleyin. Client Secret'ı Secret olarak kaydedin; `ALLOWED_DOMAINS` alanına sitenin Cloudflare Pages alan adını ve varsa özel alan adını virgülle ayrılmış şekilde yazın.
6. [public/admin/config.yml](public/admin/config.yml) içindeki `repo` değerini gerçek `owner/repository` ile, `base_url` değerini Authenticator Worker adresiyle değiştirin. Bu değişiklikleri GitHub'a gönderin.
7. Cloudflare Pages projesinin **Custom domains** bölümünden isterseniz kendi alan adınızı bağlayın. Alan adı Cloudflare DNS'teyse DNS ve HTTPS ayarlarını Cloudflare yönetir.

CMS'e `https://alan-adiniz/admin/` adresinden girilir. Giriş, GitHub OAuth üzerinden yapılır; kullanıcının GitHub hesabında yapılandırılmış repository için yazma yetkisi olmalıdır. Bağımsız CMS kullanıcı adı/parolası yoktur. Sveltia CMS, burada tanımlanan `src/content.json` ve `public/media` dosyalarını GitHub'a commit eder; Pages Git entegrasyonu yeni commit'i otomatik yayınlar.

## CMS ve içerik

Ana sayfa metinleri, hizmet kartları, portföy başlıkları ve görseller Sveltia panelinden düzenlenebilir. Portföy fotoğrafları CMS'ten yüklenerek `public/media` altında Git deposunda saklanır. WhatsApp numarasını ülke koduyla, yalnızca rakam kullanarak girin. Örnek Unsplash görsellerini gerçek atölye fotoğraflarıyla değiştirin.

## Komutlar

- `npm run dev`: Yerel Vite geliştirme sunucusu.
- `npm run build`: TypeScript kontrolü ve production derlemesi.
