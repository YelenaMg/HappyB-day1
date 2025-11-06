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