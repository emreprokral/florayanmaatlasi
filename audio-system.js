// Basit Demo Ses Sistemi - API gerektirmez
class SimpleAudioSystem {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentPlantName = null;
        this.progressInterval = null;
    }

    // Progress bar'a tıklayarak sesi ilerlet/gerilet
    seekTo(event) {
        if (!this.currentAudio || !this.currentAudio.duration) return;
        
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        const newTime = percentage * this.currentAudio.duration;
        
        this.currentAudio.currentTime = newTime;
        this.updateProgress();
    }

    // Progress bar'ı sürükleyerek kontrol et
    setupDragSeek() {
        const progressBar = document.querySelector('.audio-progress-container');
        if (!progressBar) return;
        
        let isDragging = false;
        
        // Mouse events
        progressBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.seekTo(e);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging && this.currentAudio) {
                const rect = progressBar.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = Math.max(0, Math.min(1, mouseX / width));
                const newTime = percentage * this.currentAudio.duration;
                
                this.currentAudio.currentTime = newTime;
                this.updateProgress();
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Touch events for mobile
        progressBar.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
            this.seekTo(e.touches[0]);
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging && this.currentAudio) {
                e.preventDefault();
                const rect = progressBar.getBoundingClientRect();
                const touchX = e.touches[0].clientX - rect.left;
                const width = rect.width;
                const percentage = Math.max(0, Math.min(1, touchX / width));
                const newTime = percentage * this.currentAudio.duration;
                
                this.currentAudio.currentTime = newTime;
                this.updateProgress();
            }
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // Progress bar güncelleme
    updateProgress() {
        if (!this.currentAudio) return;
        
        const progressBar = document.querySelector('.audio-progress');
        const timeDisplay = document.querySelector('.audio-time');
        
        if (progressBar && timeDisplay) {
            const currentTime = this.currentAudio.currentTime;
            const duration = this.currentAudio.duration;
            
            if (duration > 0) {
                const progress = (currentTime / duration) * 100;
                progressBar.style.width = progress + '%';
                
                const currentMinutes = Math.floor(currentTime / 60);
                const currentSeconds = Math.floor(currentTime % 60);
                const durationMinutes = Math.floor(duration / 60);
                const durationSeconds = Math.floor(duration % 60);
                
                timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
            }
        }
    }

    // Progress bar'ı başlat
    startProgressTracking() {
        this.progressInterval = setInterval(() => {
            this.updateProgress();
        }, 100);
    }

    // Progress bar'ı durdur
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    // Ses dosyalarının yollarını tanımla - Düzeltilmiş eşleştirme
    getAudioUrl(plantName) {
        const audioFiles = {
            'Aloe Vera': 'audio/plants/aloe-vera.mp3',
            'Kaktüs': 'audio/plants/kaktus.mp3',
            'Ada Çayı': 'audio/plants/ada-cayi.mp3',
            'Lavanta': 'audio/plants/lavanta.mp3',
            'Biberiye': 'audio/plants/biberiye.mp3',
            'Defne': 'audio/plants/zeytin.mp3',  // Defne için zeytin.mp3 kullan
            'Zeytin': 'audio/plants/defne.mp3',  // Zeytin için defne.mp3 kullan
            'Etli Sukulentler': 'audio/plants/etli-sukulentler.mp3',
            'Akasya': 'audio/plants/akasya.mp3',
            'Ortanca': 'audio/plants/ortanca.mp3',
            'Kekik': 'audio/plants/kekik.mp3',
            'Şimşir': 'audio/plants/simshir.mp3',
            'Paraçiçeği': 'audio/plants/para-cicegi.mp3'
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
            
            // ✨ Özel animasyon efekti ekle
            buttonElement.style.animation = 'heartbeat 1s ease-in-out infinite';
            buttonElement.style.transform = 'scale(1.05)';
            
            feather.replace();
        }

        // Ses yüklendiğinde
        this.currentAudio.addEventListener('loadedmetadata', () => {
            const duration = Math.round(this.currentAudio.duration);
            console.log(`${plantName} ses dosyası yüklendi. Süre: ${duration} saniye`);
            this.updateProgress(); // İlk progress güncellemesi
            this.setupDragSeek(); // Drag seek'i kur
        });

        // Ses bittiğinde
        this.currentAudio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentPlantName = null;
            this.stopProgressTracking();
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
            this.startProgressTracking();
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
            this.stopProgressTracking();
            if (buttonElement) {
                buttonElement.innerHTML = '<i data-feather="play" class="inline mr-2"></i>Devam Et';
                buttonElement.classList.remove('playing');
                buttonElement.title = 'Sesi devam ettir';
                
                // ✨ Animasyonu sıfırla
                buttonElement.style.animation = '';
                buttonElement.style.transform = '';
                
                feather.replace();
            }
        }
    }

    // Ses devam ettirme
    resumeAudio(buttonElement) {
        if (this.currentAudio && !this.isPlaying) {
            this.currentAudio.play();
            this.isPlaying = true;
            this.startProgressTracking();
            if (buttonElement) {
                buttonElement.innerHTML = '<i data-feather="pause" class="inline mr-2"></i>Durdur';
                buttonElement.classList.add('playing');
                buttonElement.title = 'Ses çalıyor...';
                
                // ✨ Özel animasyon efekti ekle
                buttonElement.style.animation = 'heartbeat 1s ease-in-out infinite';
                buttonElement.style.transform = 'scale(1.05)';
                
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
            
            // ✨ Animasyonu sıfırla
            button.style.animation = '';
            button.style.transform = '';
        });
        feather.replace();
        
        // Progress bar'ı sıfırla
        const progressBar = document.querySelector('.audio-progress');
        const timeDisplay = document.querySelector('.audio-time');
        if (progressBar) progressBar.style.width = '0%';
        if (timeDisplay) timeDisplay.textContent = '0:00 / 0:00';
    }
}

// Ses sistemi örneği oluştur
const audioSystem = new SimpleAudioSystem();

// Global olarak erişilebilir yap
window.audioSystem = audioSystem;
window.demoAudioSystem = audioSystem; // Geriye uyumluluk için