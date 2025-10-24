// Basit Demo Ses Sistemi - API gerektirmez
class SimpleAudioSystem {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentPlantName = null;
    }

    // Ses dosyalarının yollarını tanımla
    getAudioUrl(plantName) {
        const audioFiles = {
            'Aloe Vera': 'audio/plants/aloe-vera.mp3',
            'Kaktüs': 'audio/plants/kaktus.mp3',
            'Ada Çayı': 'audio/plants/ada-cayi.mp3',
            'Lavanta': 'audio/plants/lavanta.mp3',
            'Biberiye': 'audio/plants/biberiye.mp3',
            'Defne': 'audio/plants/defne.mp3',
            'Zeytin': 'audio/plants/zeytin.mp3',
            'Etli Sukulentler': 'audio/plants/etli-sukulentler.mp3',
            'Akasya': 'audio/plants/akasya.mp3',
            'Ortanca': 'audio/plants/ortanca.mp3'
        };
        return audioFiles[plantName] || null;
    }

    // Ses oynatma/durdurma - akıllı buton
    async toggleAudio(plantName, buttonElement) {
        const audioUrl = this.getAudioUrl(plantName);
        
        if (!audioUrl) {
            alert(`${plantName} için ses dosyası bulunamadı.`);
            return;
        }

        // Eğer aynı ses çalıyorsa durdur/devam ettir
        if (this.currentAudio && this.currentPlantName === plantName) {
            if (this.isPlaying) {
                this.pauseAudio(buttonElement);
            } else {
                this.resumeAudio(buttonElement);
            }
            return;
        }

        // Önceki sesi durdur
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.resetButtonStates();
        }

        // Yeni ses oluştur
        this.currentAudio = new Audio(audioUrl);
        this.currentPlantName = plantName;
        this.isPlaying = true;

        // Buton durumunu güncelle
        if (buttonElement) {
            buttonElement.innerHTML = '<i data-feather="pause" class="inline mr-2"></i>Durdur';
            buttonElement.classList.add('playing');
            buttonElement.title = 'Ses çalıyor... (1-1.5 dakika sürecek)';
            feather.replace();
        }

        // Ses yüklendiğinde
        this.currentAudio.addEventListener('loadedmetadata', () => {
            const duration = Math.round(this.currentAudio.duration);
            console.log(`${plantName} ses dosyası yüklendi. Süre: ${duration} saniye`);
        });

        // Ses bittiğinde
        this.currentAudio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentPlantName = null;
            this.resetButtonStates();
            console.log(`${plantName} ses dosyası tamamlandı.`);
        });

        // Ses oynatma hatası
        this.currentAudio.addEventListener('error', (e) => {
            console.error('Ses oynatma hatası:', e);
            this.isPlaying = false;
            this.resetButtonStates();
            alert('Ses dosyası yüklenemedi. Lütfen dosya yolunu kontrol edin.');
        });

        // Ses oynatma başladığında
        this.currentAudio.addEventListener('play', () => {
            console.log(`${plantName} ses dosyası oynatılmaya başlandı.`);
        });

        try {
            await this.currentAudio.play();
        } catch (error) {
            console.error('Ses oynatma hatası:', error);
            this.isPlaying = false;
            this.resetButtonStates();
        }
    }

    // Eski playAudio fonksiyonu - geriye uyumluluk için
    async playAudio(plantName, buttonElement) {
        return this.toggleAudio(plantName, buttonElement);
    }

    // Ses durdurma
    pauseAudio(buttonElement) {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.isPlaying = false;
            if (buttonElement) {
                buttonElement.innerHTML = '<i data-feather="play" class="inline mr-2"></i>Devam Et';
                buttonElement.classList.remove('playing');
                buttonElement.title = 'Sesi devam ettir';
                feather.replace();
            }
        }
    }

    // Ses devam ettirme
    resumeAudio(buttonElement) {
        if (this.currentAudio && !this.isPlaying) {
            this.currentAudio.play();
            this.isPlaying = true;
            if (buttonElement) {
                buttonElement.innerHTML = '<i data-feather="pause" class="inline mr-2"></i>Durdur';
                buttonElement.classList.add('playing');
                buttonElement.title = 'Ses çalıyor...';
                feather.replace();
            }
        }
    }

    // Tüm butonları sıfırla
    resetButtonStates() {
        const buttons = document.querySelectorAll('.audio-button');
        buttons.forEach(button => {
            button.innerHTML = '<i data-feather="volume-2" class="inline mr-2"></i>Sesli Anlat';
            button.classList.remove('playing');
            button.title = 'Bitki hakkında sesli bilgi dinle';
        });
        feather.replace();
    }
}

// Ses sistemi örneği oluştur
const audioSystem = new SimpleAudioSystem();

// Global olarak erişilebilir yap
window.audioSystem = audioSystem;
window.demoAudioSystem = audioSystem; // Geriye uyumluluk için