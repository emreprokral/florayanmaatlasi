# Flamazing Flora Explorer - Ses Sistemi Kullanım Kılavuzu 🔊

## 🎯 Ses Sistemi Nasıl Çalışır?

Bu proje iki farklı ses sistemi içerir:

### 1. **ElevenLabs TTS API Sistemi** (Gelişmiş)
- Gerçek zamanlı ses oluşturma
- Yapay zeka destekli doğal sesler
- Türkçe metin desteği

### 2. **Demo Ses Sistemi** (Basit)
- Önceden kaydedilmiş ses dosyaları
- Hızlı test için ideal
- API anahtarı gerektirmez

---

## 🚀 Ses Sistemini Kurma

### Adım 1: ElevenLabs API Anahtarı Alma
1. [ElevenLabs.io](https://elevenlabs.io) sitesine gidin
2. Hesap oluşturun ve giriş yapın
3. API anahtarınızı kopyalayın
4. `audio-system.js` dosyasında `YOUR_ELEVENLABS_API_KEY` yerine yapıştırın

### Adım 2: Ses Dosyaları Ekleme (Demo için)
```
audio/
└── plants/
    ├── cam.mp3          (Çam Ağacı)
    ├── mese.mp3         (Meşe Ağacı)
    ├── zeytin.mp3       (Zeytin Ağacı)
    ├── lavanta.mp3      (Lavanta)
    ├── okaliptus.mp3    (Okaliptüs)
    └── defne.mp3        (Defne)
```

---

## 🎵 Ses Dosyaları Nasıl Oluşturulur?

### Yöntem 1: ElevenLabs ile Otomatik Oluşturma
```javascript
// Bitki için ses oluştur
const audioUrl = await audioSystem.createPlantAudio(plant);
await audioSystem.playAudio(audioUrl, buttonElement);
```

### Yöntem 2: Manuel Ses Kaydı
1. **Metin Hazırlama:**
   ```
   "Çam Ağacı bitkisi Pinus spp. türündendir. İğne yaprakları ve reçinesi nedeniyle hızlı yanma özelliği gösterir. Yanma hızı Yüksek seviyesindedir ve yangın direnci Düşük olarak ölçülmüştür. Koruma mekanizması: Reçine yapısı yanmayı hızlandırır."
   ```

2. **Ses Kaydı:**
   - Windows: Voice Recorder uygulaması
   - Online: [Online Voice Recorder](https://online-voice-recorder.com/)
   - Telefon: Ses kayıt uygulaması

3. **Dosya Formatı:**
   - Format: MP3
   - Kalite: 128 kbps
   - Süre: 15-30 saniye

---

## 🔧 Ses Sistemini Özelleştirme

### Ses Ayarları Değiştirme
```javascript
// audio-system.js dosyasında
voice_settings: {
    stability: 0.5,        // Ses kararlılığı (0-1)
    similarity_boost: 0.5  // Ses benzerliği (0-1)
}
```

### Yeni Bitki Ekleme
```javascript
// script.js dosyasında plantData.plants dizisine ekleyin
{
    id: 7,
    name: "Yeni Bitki",
    scientificName: "Scientific Name",
    description: "Açıklama...",
    audioUrl: "audio/plants/yeni-bitki.mp3"
}
```

---

## 🎨 Ses Butonları Stil Özelleştirme

### CSS ile Buton Tasarımı
```css
.audio-button {
    background: linear-gradient(135deg, #22c55e, #f59e0b);
    transition: all 0.3s ease;
}

.audio-button:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.audio-button.playing {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}
```

---

## 🐛 Sorun Giderme

### Ses Çalmıyor
1. **Tarayıcı İzinleri:** Ses çalma izni verildiğinden emin olun
2. **Dosya Yolları:** Ses dosyalarının doğru konumda olduğunu kontrol edin
3. **İnternet Bağlantısı:** ElevenLabs API için internet bağlantısı gerekli

### API Hatası
```javascript
// Hata kontrolü
try {
    const audioUrl = await audioSystem.generateSpeech(text);
    if (!audioUrl) {
        console.error('Ses oluşturulamadı');
    }
} catch (error) {
    console.error('API Hatası:', error);
}
```

### Ses Kalitesi Düşük
1. **API Ayarları:** stability ve similarity_boost değerlerini artırın
2. **Ses Formatı:** MP3 yerine WAV kullanın
3. **Bit Oranı:** Daha yüksek bit oranı seçin

---

## 📱 Mobil Uyumluluk

### iOS Safari
- Otomatik ses çalma kısıtlamaları var
- Kullanıcı etkileşimi gerekli

### Android Chrome
- Genellikle sorunsuz çalışır
- HTTPS gerekli olabilir

---

## 🎯 İleri Seviye Özellikler

### Ses Önbellekleme
```javascript
// Ses dosyalarını önbelleğe al
const audioCache = new Map();

async function getCachedAudio(text) {
    if (audioCache.has(text)) {
        return audioCache.get(text);
    }
    
    const audioUrl = await audioSystem.generateSpeech(text);
    audioCache.set(text, audioUrl);
    return audioUrl;
}
```

### Çoklu Dil Desteği
```javascript
const languages = {
    'tr': 'pNInz6obpgDQGcFmaJgB',  // Türkçe
    'en': 'pNInz6obpgDQGcFmaJgB',  // İngilizce
    'es': 'pNInz6obpgDQGcFmaJgB'   // İspanyolca
};
```

---

## 📞 Destek

Sorularınız için:
- **E-posta:** info@flamazingflora.com
- **GitHub:** Proje repository'si
- **Dokümantasyon:** Bu dosya

---

## 🎉 Başarılı Kurulum Kontrolü

✅ Ses butonları görünüyor  
✅ Butonlara tıklayınca ses çalıyor  
✅ Ses durdurma/oynatma çalışıyor  
✅ Mobil cihazlarda uyumlu  
✅ Hata mesajları düzgün gösteriliyor  

**Tebrikler! Ses sisteminiz hazır! 🎵**
