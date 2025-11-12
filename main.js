// main.js

// ------------------------------------------
// ՀԵՏՀԱՇՎԱՐԿԻ ՖՈՒՆԿՑԻԱ
// ------------------------------------------

function setupCountdown(targetDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Ֆունկցիա՝ թիվը երկու նիշով ցույց տալու համար
    function formatNumber(num) {
        return num < 10 ? '0' + num : num;
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('birthday-countdown').innerHTML = "<h2 style='color:#ff4081;'>Ծնունդդ Շնորհավոր! 🎉</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Թարմացնում ենք էկրանը
        if (daysEl) daysEl.textContent = formatNumber(days);
        if (hoursEl) hoursEl.textContent = formatNumber(hours);
        if (minutesEl) minutesEl.textContent = formatNumber(minutes);
        if (secondsEl) secondsEl.textContent = formatNumber(seconds);
    }

    // Գործարկում ենք ֆունկցիան ամեն վայրկյանը
    const countdownInterval = setInterval(updateCountdown, 1000);
    // Առաջին անգամ գործարկում ենք անմիջապես, որպեսզի չսպասենք 1 վայրկյան
    updateCountdown(); 
}

// Սահմանում ենք Ծննդյան Օրվա Ամսաթիվը և Ժամը (Հունվարի 14, 2026, 20:00)
// ՆՇՈՒՄ: Ամիսները JS-ում սկսվում են 0-ից (0=Հունվար, 11=Դեկտեմբեր)
const targetDate = new Date("Jan 14, 2026 20:00:00").getTime(); 

// Գործարկում ենք հետհաշվարկը
setupCountdown(targetDate);


document.addEventListener('DOMContentLoaded', () => {
        const music = document.getElementById('bg-music');
        const button = document.getElementById('music-control-button');

        // 1. Ավտոմատ նվագարկման փորձ (բրաուզերի սահմանափակումների պատճառով)
        let isPlaying = false;
        music.volume = 0.5; // Սկզբնական ձայնի մակարդակը

        music.play().then(() => {
            isPlaying = true;
            // Կարգավորել կոճակի դասը՝ music-on
            button.classList.remove('music-off');
            button.classList.add('music-on');
        }).catch(error => {
            // Եթե autoplay-ը արգելափակված է, սկզբում այն դնում ենք անջատված դիրքում
            isPlaying = false;
            button.classList.remove('music-on');
            button.classList.add('music-off');
            music.pause();
        });

        // 2. Կոճակի սեղմման իրադարձությունը (Toggle ֆունկցիա)
        button.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                button.classList.remove('music-on');
                button.classList.add('music-off');
                isPlaying = false;
            } else {
                music.play();
                button.classList.remove('music-off');
                button.classList.add('music-on');
                isPlaying = true;
            }
        });
    });


    
    document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const controlButton = document.getElementById('music-control-button');
    let isPlaying = false; 
    let hasInteracted = false; // Նոր դրոշակ՝ ստուգելու համար, թե արդյոք արդեն փորձել ենք միացնել

    // =======================================================
    // Ֆունկցիա՝ կոճակի տեսքը թարմացնելու համար (🔊/🔇)
    // =======================================================
    function updateButtonState() {
        if (isPlaying) {
            // Երաժշտությունը միացված է -> ցույց է տալիս 🔊
            controlButton.classList.remove('music-off');
            controlButton.classList.add('music-on');
        } else {
            // Երաժշտությունն անջատված է -> ցույց է տալիս 🔇
            controlButton.classList.remove('music-on');
            controlButton.classList.add('music-off');
        }
    }

    // =======================================================
    // Ֆունկցիա՝ ԵՐԱԺՇՏՈՒԹՅԱՆ ՄԻԱՑՄԱՆ ՓՈՐՁ (առաջին փոխազդեցությունից հետո)
    // =======================================================
    function startMusicOnAnyInteraction() {
        if (hasInteracted) {
            // Եթե արդեն փորձել ենք միացնել, այլևս ոչինչ չենք անում
            return;
        }

        hasInteracted = true; // Նշում ենք, որ փոխազդեցությունը տեղի է ունեցել

        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Միացումը հաջողվեց
                isPlaying = true;
                updateButtonState(); 
                
                // Հեռացնում ենք բոլոր լսիչները
                removeInitialListeners(); 
            }).catch(error => {
                // Միացումը ձախողվեց (նույնիսկ փոխազդեցությունից հետո՝ բրաուզերի խիստ քաղաքականության պատճառով)
                isPlaying = false;
                updateButtonState(); 
            });
        }
    }

    // =======================================================
    // Լսիչների հեռացումը՝ միացումից հետո
    // =======================================================
    function removeInitialListeners() {
        document.removeEventListener('click', startMusicOnAnyInteraction);
        document.removeEventListener('touchstart', startMusicOnAnyInteraction);
        window.removeEventListener('scroll', startMusicOnAnyInteraction);
    }

    // =======================================================
    // 1. ՍԿԶԲՆԱԿԱՆ ԿԱՐԳԱՎՈՐՈՒՄ ԵՎ ԼՍԻՉՆԵՐԻ ԿՑՈՒՄ
    // =======================================================

    // Կցում ենք լսիչները ամբողջ էջին՝ ցանկացած գործողություն որսալու համար
    document.addEventListener('click', startMusicOnAnyInteraction);
    document.addEventListener('touchstart', startMusicOnAnyInteraction);
    window.addEventListener('scroll', startMusicOnAnyInteraction);

    // Սկզբնական վիճակը (պետք է լինի 🔇)
    updateButtonState(); 


    // =======================================================
    // 2. ԿՈՃԱԿԻ ԿԱՌԱՎԱՐՈՒՄԸ (Ձեռքով Միացնել/Անջատել)
    // =======================================================
    controlButton.addEventListener('click', () => {
        if (isPlaying) {
            // ԱՆՋԱՏԵԼ
            audio.pause();
            isPlaying = false; 
            updateButtonState();
        } else {
            // ՄԻԱՑՆԵԼ
            audio.play().then(() => {
                isPlaying = true;
                updateButtonState(); 
                
                // Եթե օգտատերը միացնում է կոճակով, հեռացնում ենք ավտոմատ լսիչները
                removeInitialListeners();
            }).catch(error => {
                // Եթե կոճակով էլ չի միանում
                console.error('Երաժշտությունը չի միանում։', error);
                isPlaying = false;
                updateButtonState();
            });
        }
    });

    // Այս ֆունկցիան ուղղում է նաև սլայդերի կոճակի ֆոկուսի խնդիրը (որը քննարկում էինք)
    controlButton.addEventListener('click', (e) => {
        e.currentTarget.blur();
    });

});