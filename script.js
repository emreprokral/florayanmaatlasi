
// Shared JavaScript across all pages
console.log('Flamazing Flora Explorer loaded');

// Audio management
class AudioManager {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
    }

    playAudio(audioUrl, buttonElement) {
        // Stop current audio if playing
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.resetButtonStates();
        }

        // Create new audio element
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.play();
        this.isPlaying = true;

        // Update button state
        if (buttonElement) {
            buttonElement.innerHTML = '<i data-feather="pause" class="inline mr-2"></i>Durdur';
            feather.replace();
        }

        // Add event listener for when audio ends
        this.currentAudio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.resetButtonStates();
        });
    }

    pauseAudio(buttonElement) {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.isPlaying = false;
            if (buttonElement) {
                buttonElement.innerHTML = '<i data-feather="play" class="inline mr-2"></i>Oynat';
                feather.replace();
            }
        }
    }

    resetButtonStates() {
        // Reset all audio buttons to play state
        const buttons = document.querySelectorAll('.audio-button');
        buttons.forEach(button => {
            button.innerHTML = '<i data-feather="volume-2" class="inline mr-2"></i>Sesli Anlat';
        });
        feather.replace();
    }
}

// Initialize audio manager
const audioManager = new AudioManager();

// Plant data management
const plantData = {
    plants: [
        {
            id: 1,
            name: "Aloe Vera",
            scientificName: "Aloe barbadensis",
            image: "images/plants/aloe-vera.jpg",
            description: "Yüksek su içeriği ve jel yapısı sayesinde yangına karşı çok dayanıklıdır.",
            burnSpeed: "Çok Düşük",
            fireResistance: "Çok Yüksek",
            protectionMechanism: "Yüksek su içeriği ve jel yapısı",
            audioUrl: "audio/plants/aloe-vera.mp3"
        },
        {
            id: 2,
            name: "Kaktüs",
            scientificName: "Cactaceae",
            image: "images/plants/kaktus.jpg",
            description: "Su depolama özelliği ve kalın epidermis tabakası yangına karşı koruma sağlar.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Su depolama ve kalın epidermis",
            audioUrl: "audio/plants/kaktus.mp3"
        },
        {
            id: 3,
            name: "Ada Çayı",
            scientificName: "Salvia officinalis",
            image: "images/plants/ada-cayi.jpg",
            description: "Uçucu yağları ve aromatik bileşenleri yangın direncini etkiler.",
            burnSpeed: "Orta",
            fireResistance: "Orta",
            protectionMechanism: "Aromatik bileşenler ve yaprak yapısı",
            audioUrl: "audio/plants/ada-cayi.mp3"
        },
        {
            id: 4,
            name: "Lavanta",
            scientificName: "Lavandula angustifolia",
            image: "images/plants/lavanta.jpg",
            description: "Uçucu yağları ve yaprak yapısı yangına dayanıklıdır.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Uçucu yağ bileşenleri",
            audioUrl: "audio/plants/lavanta.mp3"
        },
        {
            id: 5,
            name: "Biberiye",
            scientificName: "Rosmarinus officinalis",
            image: "images/plants/biberiye.jpg",
            description: "Aromatik yağları ve kalın yaprakları yangına karşı koruma sağlar.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Aromatik yağlar ve kalın epidermis",
            audioUrl: "audio/plants/biberiye.mp3"
        },
        {
            id: 6,
            name: "Defne",
            scientificName: "Laurus nobilis",
            image: "images/plants/defne.jpg",
            description: "Kalın yaprakları ve uçucu yağları yangın direncini artırır.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Kalın yaprak yapısı ve uçucu yağlar",
            audioUrl: "audio/plants/defne.mp3"
        },
        {
            id: 7,
            name: "Zeytin",
            scientificName: "Olea europaea",
            image: "images/plants/zeytin.jpg",
            description: "Kalın gövde ve yaprakları ile yangına karşı dayanıklıdır.",
            burnSpeed: "Çok Düşük",
            fireResistance: "Çok Yüksek",
            protectionMechanism: "Kalın kabuk ve yaprak yapısı",
            audioUrl: "audio/plants/zeytin.mp3"
        },
        {
            id: 8,
            name: "Etli Sukulentler",
            scientificName: "Succulentae",
            image: "images/plants/etli-sukulentler.jpg",
            description: "Su depolama özelliği ve kalın epidermis ile yangına karşı çok dayanıklıdır.",
            burnSpeed: "Çok Düşük",
            fireResistance: "Çok Yüksek",
            protectionMechanism: "Su depolama ve kalın epidermis",
            audioUrl: "audio/plants/etli-sukulentler.mp3"
        },
        {
            id: 9,
            name: "Akasya",
            scientificName: "Acacia",
            image: "images/plants/akasya.jpg",
            description: "Kalın kabuk ve yaprak yapısı yangın direncini etkiler.",
            burnSpeed: "Orta",
            fireResistance: "Orta",
            protectionMechanism: "Kalın kabuk ve yaprak yapısı",
            audioUrl: "audio/plants/akasya.mp3"
        },
        {
            id: 10,
            name: "Ortanca",
            scientificName: "Hydrangea",
            image: "images/plants/ortanca.jpg",
            description: "Yüksek su içeriği ve yaprak yapısı yangına karşı koruma sağlar.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Yüksek su içeriği ve yaprak yapısı",
            audioUrl: "audio/plants/ortanca.mp3"
        }
    ],

    getPlantById(id) {
        return this.plants.find(plant => plant.id === parseInt(id));
    },

    getAllPlants() {
        return this.plants;
    },

    getFireResistantPlants() {
        return this.plants.filter(plant => plant.fireResistance === "Yüksek" || plant.fireResistance === "Çok Yüksek");
    },

    getFastBurningPlants() {
        return this.plants.filter(plant => plant.burnSpeed === "Yüksek" || plant.burnSpeed === "Çok Yüksek");
    }
};

// Utility functions
const utils = {
    formatBurnSpeed(speed) {
        const speedMap = {
            "Çok Düşük": "bg-green-100 text-green-800",
            "Düşük": "bg-green-50 text-green-700",
            "Orta": "bg-yellow-100 text-yellow-800",
            "Yüksek": "bg-orange-100 text-orange-800",
            "Çok Yüksek": "bg-red-100 text-red-800"
        };
        return speedMap[speed] || "bg-gray-100 text-gray-800";
    },

    formatFireResistance(resistance) {
        const resistanceMap = {
            "Çok Düşük": "bg-red-100 text-red-800",
            "Düşük": "bg-orange-100 text-orange-800",
            "Orta": "bg-yellow-100 text-yellow-800",
            "Yüksek": "bg-green-100 text-green-800",
            "Çok Yüksek": "bg-green-200 text-green-900"
        };
        return resistanceMap[resistance] || "bg-gray-100 text-gray-800";
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for use in other modules
window.audioManager = audioManager;
window.plantData = plantData;
window.utils = utils;
