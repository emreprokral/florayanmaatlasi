#!/bin/bash

# Cloudflare CDN Deployment Script for Flora Yanma Atlası
# Bu script Cloudflare entegrasyonunu otomatikleştirir

echo "🚀 Cloudflare CDN Deployment başlatılıyor..."

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonksiyonlar
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Dosya yapısını kontrol et
print_status "Dosya yapısı kontrol ediliyor..."

required_files=(
    "index.html"
    "plants.html"
    "about.html"
    "privacy.html"
    "terms.html"
    "navbar.js"
    "footer.js"
    "script.js"
    "audio-system.js"
    "manifest.json"
    "sw.js"
    "non-critical.css"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Gerekli dosya bulunamadı: $file"
        exit 1
    fi
done

print_success "Tüm gerekli dosyalar mevcut"

# 2. Static klasörü oluştur
print_status "Static klasörü oluşturuluyor..."

mkdir -p static
mkdir -p images/plants
mkdir -p audio/plants

print_success "Klasör yapısı oluşturuldu"

# 3. Favicon dosyalarını kontrol et
print_status "Favicon dosyaları kontrol ediliyor..."

favicon_files=(
    "static/favicon.ico"
    "static/apple-touch-icon.png"
    "static/favicon-32x32.png"
    "static/favicon-16x16.png"
    "static/icon-192x192.png"
    "static/icon-512x512.png"
)

for favicon in "${favicon_files[@]}"; do
    if [ ! -f "$favicon" ]; then
        print_warning "Favicon dosyası eksik: $favicon"
        print_status "Placeholder favicon oluşturuluyor..."
        
        # Placeholder favicon oluştur (ImageMagick gerekli)
        if command -v magick &> /dev/null; then
            magick -size 32x32 xc:green "$favicon" 2>/dev/null || true
        fi
    fi
done

# 4. Görsel dosyalarını kontrol et
print_status "Görsel dosyaları kontrol ediliyor..."

image_files=(
    "images/plants/aloe-vera.jpg"
    "images/plants/kaktus.jpg"
    "images/plants/ada-cayi.jpg"
    "images/plants/lavanta.jpg"
    "images/plants/biberiye.jpg"
    "images/plants/defne.jpg"
    "images/plants/zeytin.jpg"
    "images/plants/etli-sukulentler.jpg"
    "images/plants/akasya.jpg"
    "images/plants/ortanca.jpg"
)

for image in "${image_files[@]}"; do
    if [ ! -f "$image" ]; then
        print_warning "Görsel dosyası eksik: $image"
    fi
done

# 5. Audio dosyalarını kontrol et
print_status "Audio dosyaları kontrol ediliyor..."

audio_files=(
    "audio/plants/aloe-vera.mp3"
    "audio/plants/kaktus.mp3"
    "audio/plants/ada-cayi.mp3"
    "audio/plants/lavanta.mp3"
    "audio/plants/biberiye.mp3"
    "audio/plants/defne.mp3"
    "audio/plants/zeytin.mp3"
    "audio/plants/etli-sukulentler.mp3"
    "audio/plants/akasya.mp3"
    "audio/plants/ortanca.mp3"
)

for audio in "${audio_files[@]}"; do
    if [ ! -f "$audio" ]; then
        print_warning "Audio dosyası eksik: $audio"
    fi
done

# 6. HTML dosyalarını optimize et
print_status "HTML dosyaları optimize ediliyor..."

# HTML dosyalarından gereksiz boşlukları temizle
for html_file in *.html; do
    if [ -f "$html_file" ]; then
        # Gereksiz boşlukları temizle (basit minification)
        sed -i 's/^[[:space:]]*//' "$html_file"
        sed -i 's/[[:space:]]*$//' "$html_file"
        print_success "$html_file optimize edildi"
    fi
done

# 7. Service Worker cache version'ını güncelle
print_status "Service Worker cache version güncelleniyor..."

current_version=$(date +%s)
sed -i "s/flora-atlas-v[0-9]*/flora-atlas-v$current_version/g" sw.js
print_success "Service Worker cache version güncellendi: v$current_version"

# 8. Cloudflare ayarları dosyasını oluştur
print_status "Cloudflare ayarları dosyası oluşturuluyor..."

cat > cloudflare-settings.json << EOF
{
  "domain": "flora-yanma-atlasi.com",
  "settings": {
    "cache_level": "aggressive",
    "browser_cache_ttl": 86400,
    "edge_cache_ttl": 3600,
    "auto_minify": {
      "html": true,
      "css": true,
      "js": true
    },
    "brotli": "on",
    "rocket_loader": "on",
    "mirage": "on",
    "polish": "lossless",
    "webp": "on",
    "always_online": "on",
    "security_level": "high",
    "browser_integrity_check": "on"
  },
  "page_rules": [
    {
      "url": "flora-yanma-atlasi.com/static/*",
      "settings": {
        "cache_level": "cache_everything",
        "edge_cache_ttl": 2592000,
        "browser_cache_ttl": 2592000
      }
    },
    {
      "url": "flora-yanma-atlasi.com/images/*",
      "settings": {
        "cache_level": "cache_everything",
        "edge_cache_ttl": 604800,
        "browser_cache_ttl": 2592000
      }
    }
  ]
}
EOF

print_success "Cloudflare ayarları dosyası oluşturuldu"

# 9. Deployment checklist oluştur
print_status "Deployment checklist oluşturuluyor..."

cat > DEPLOYMENT_CHECKLIST.md << EOF
# Cloudflare CDN Deployment Checklist

## Pre-Deployment
- [ ] Domain Cloudflare'e eklenmiş
- [ ] DNS ayarları yapılmış (A record: 192.0.2.1)
- [ ] SSL sertifikası aktif
- [ ] Page Rules yapılandırılmış (cloudflare-page-rules.conf)

## Files Upload
- [ ] Tüm HTML dosyaları yüklenmiş
- [ ] CSS/JS dosyaları yüklenmiş
- [ ] Static klasörü yüklenmiş
- [ ] Images klasörü yüklenmiş
- [ ] Audio klasörü yüklenmiş
- [ ] manifest.json yüklenmiş
- [ ] sw.js yüklenmiş

## Post-Deployment
- [ ] CDN cache temizlenmiş
- [ ] Görseller yüklenmiş
- [ ] Favicon'lar çalışıyor
- [ ] Service Worker aktif
- [ ] PWA install çalışıyor
- [ ] Performance testleri yapılmış

## Performance Tests
- [ ] Lighthouse testi (90+ skor)
- [ ] WebPageTest testi
- [ ] Mobile performance testi
- [ ] Global erişim testi

## Expected Results
- Page Load Time: 40-60% faster
- Image Loading: 70%+ faster
- Global Access: Worldwide fast access
- Mobile Performance: 50%+ improvement
EOF

print_success "Deployment checklist oluşturuldu"

# 10. Özet rapor
print_status "Deployment özeti:"
echo "=================================="
echo "📁 Dosya yapısı: ✅ Hazır"
echo "🖼️  Görseller: ✅ Kontrol edildi"
echo "🎵 Audio dosyalar: ✅ Kontrol edildi"
echo "⚙️  Service Worker: ✅ Güncellendi"
echo "📋 Cloudflare ayarları: ✅ Hazır"
echo "📝 Deployment checklist: ✅ Oluşturuldu"
echo "=================================="

print_success "Cloudflare CDN deployment hazırlığı tamamlandı!"
print_status "Sonraki adımlar:"
echo "1. Domain'i Cloudflare'e ekleyin"
echo "2. DNS ayarlarını yapın"
echo "3. Page Rules'ları uygulayın"
echo "4. Dosyaları yükleyin"
echo "5. Performance testleri yapın"

print_warning "Not: cloudflare-page-rules.conf dosyasındaki ayarları Cloudflare Dashboard'da uygulamayı unutmayın!"
