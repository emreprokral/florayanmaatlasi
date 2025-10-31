
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
            description: "Aloe vera, etli yapraklara sahip, rozet biçiminde dizilen, her dem yeşil bir sukulenttir. Bu tropik bitki, sıcak, güneşli iklimleri ve iyi drene edilmiş, kumlu toprakları tercih eder; don ve uzun süreli soğuk ( ) onun için ciddi bir tehdittir. Yapraklarının mumsu tabakası, kurak ortamlarda hayati önem taşıyan su kaybını en aza indiren önemli bir adaptasyondur. Bitki 60-100 cm boya ulaşabilir ve kalın, mızrak şeklindeki yapraklarının içinde su, vitamin ve mineraller açısından zengin, saydam bir jel barındırır. Bu jel, binlerce yıldır cilt onarımı ve sağlık alanında \"Ölümsüzlük Bitkisi\" unvanını hak ettiğini düşündürmüştür. Aloe vera'nın yaprak dokusu yüksek sıcaklıkta kolayca zarar görerek yanar; bu da genel olarak yangına dayanıklılığının düşük olduğunu gösterir. Ancak, bitkinin hayatta kalma stratejisi kök sisteminde gizlidir. Kök kısmı, hafif yüzey yangınlarından sonra yeniden sürgün verme yeteneğine sahiptir. Bu kritik özellik, bitkinin doğal yaşam alanlarında yangın sonrası ekosistemlerde bitkisel örtünün kısmen ve hızlı bir şekilde yenilenmesine olanak tanır. Kanımca, doğanın bu güçlü onarım mekanizması, basit bir sukulentin ne kadar dirençli olabileceğinin şaşırtıcı bir kanıtıdır.",
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
            description: "Kaktüs (Cactaceae), çoğunlukla kurak ve yarı kurak bölgelere özgü, su depolama yeteneği yüksek bir sukulent familyasıdır. Bitkinin etli gövdesi genellikle silindirik veya küresel biçimdedir ve temel fotosentez organı olarak işlev görür. Dikenler, evrimleşmiş yapraklardır; bunlar hem su kaybını azaltır hem de otçul hayvanlara karşı savunma sağlar. Gövde yüzeyini kaplayan kalın, mumsu tabaka, suyun buharlaşmasını minimuma indirerek çöl koşullarına mükemmel bir adaptasyon sağlar.\n\nKaktüsler, bol güneş ışığı alan, sıcak ve özellikle drenajı çok iyi olan topraklarda gelişim gösterir; soğuk ve dona karşı son derece hassastırlar. Yangına karşı dayanıklılıkları türler arasında farklılık gösterse de, genel olarak sınırlıdır. Gövdede depolanan yüksek su içeriği, kısa süreli yüzey yangınlarında bitkiye kısmi bir koruma sunabilir. Ancak yoğun ve uzun süreli yangınlarda etli dokular tamamen zarar görür. Buna karşın, bazı kaktüs türleri, tıpkı yangından sonra doğanın pes etmemesi gibi, taban veya kök sisteminden yeniden filizlenme potansiyeline sahiptir. Bence, dikenlerinin arasında gizlediği bu canlılık ve direnç, kaktüsü zorlu koşullarda bile yaşamın sessiz ve güçlü bir simgesi yapar.",
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
            description: "Adaçayı (Salvia officinalis), ballıbabagiller familyasına ait, 30-70 cm boya ulaşabilen, çok yıllık, aromatik bir yarı çalıdır. Akdeniz bölgesine özgü olan bitki, sıcak, tam güneşli ve drenajı yüksek topraklarda en iyi gelişimi gösterir. Yaprakları grimsi-yeşil renkte ve kadifemsi dokudadır; bu tüylü yapı, su kaybını azaltarak kuraklığa karşı direnç sağlar. Çiçekleri mor tonlarda olup, genellikle yaz başlarında açar.\n\nAdaçayının dokularında yüksek konsantrasyonda uçucu yağlar (başlıca Thujone, Cineole, Borneol) bulunur. Bu yağlar, bitkinin güçlü aromasını oluşturmakla birlikte, maalesef yanıcılığını da artırır. Bu nedenle yangına dayanıklılığı orta düzeydedir. Odunsu gövdesi ve toprak üstü kısmı yangında hızla tutuşup zarar görse de, bitkinin hayatta kalma mekanizması kökleridir.\n\nDerin ve sağlam kök sistemi, yüzey yangınlarından sonra hızla yeniden filizlenme yeteneği sunar. Bu ekolojik adaptasyon, adaçayının yangın sonrası alanlarda bitkisel örtünün kısmen yenilenmesine katkı sağlamasına olanak tanır. Bana kalırsa, zorlu koşullara rağmen bu güçlü kokusuyla yeniden hayata tutunabilmesi, adaçayını doğanın pes etmeyen direncinin sembolü hâline getirir.",
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
            description: "Lavanta (Lavandula spp.), 30-80 cm boya ulaşabilen, çok yıllık ve yarı çalı formunda aromatik bir bitkidir. Akdeniz iklimine özgü olup, sıcak, güneşli ortamları ve kireççe zengin, iyi drene edilmiş, geçirgen toprakları tercih eder. Mor tonlardaki çiçekleri ve gümüşi-yeşil, dar yapraklarıyla tanınır.\n\nBitkinin yaprak ve çiçeklerinde yüksek oranda uçucu yağlar (başlıca Linalool ve Linalil Asetat) bulunur; bu bileşenler ona karakteristik güçlü kokusunu ve antiseptik özelliklerini kazandırır. Ancak, bu yağların varlığı yanıcılığı artırabilir, bu nedenle yoğun lavanta alanlarında yangın riski tamamen ortadan kalkmaz.\n\nYangına karşı genel olarak orta düzeyde dayanıklılık sergiler. Odunsu gövdesi yüksek ısıda kolayca zarar görse de, geliştirdiği derin kök sistemi sayesinde yüzey yangınlarından sonra yeniden filizlenme yeteneği mevcuttur. Bu hızlı toparlanma gücü, lavantanın doğal yaşam döngüsünde önemli bir direnç karakteridir. Kanımca, mor çiçeklerin yaydığı o huzur verici koku, en zorlu koşullarda bile yaşamın ve canlılığın devam etme kararlılığını fısıldar gibidir.",
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
