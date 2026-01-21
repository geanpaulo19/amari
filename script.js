// Set the date we're counting down to
const birthdayDate = new Date("Feb 28, 2026 10:00:00").getTime();

const updateCountdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in the elements
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(updateCountdown);
        document.getElementById("countdown-container").innerHTML = "<h3>It's Amari's Big Day! 🌸</h3>";
    }
}, 1000);

function downloadICS() {
    // --- EDIT THESE STRINGS ---
    const title = "Amari's 1st Birthday & Christening"; // The name of the event
    const location = "Tyvo Resort, Cainta, Rizal";       // The address
    const description = "We are excited to celebrate our baby girl's special day with you!";
    
    // --- EDIT THE DATES & TIMES ---
    // Format: YYYYMMDDTHHMMSS
    // Example: 20260228T110000 is Feb 28, 2026 at 11:00:00 AM
    const startDate = "20260228T110000"; // Change 110000 to your start time
    const endDate = "20260228T160000";   // Change 160000 to your end time (4:00 PM)

    const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    
    // --- EDIT THE FILENAME ---
    link.setAttribute("download", "Amaris_Birthday.ics"); // What the file is named when downloaded
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

window.onscroll = function() {
    // Keep your existing backToTop logic here...
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
};

function copyToClipboard(elementId, btn) {
    // Get the text from the span using the ID
    const textToCopy = document.getElementById(elementId).innerText;
    
    // Use the clipboard API
    navigator.clipboard.writeText(textToCopy).then(() => {
        // 1. Change the button text
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        
        // 2. Add the green class for styling
        btn.classList.add('copied');
        
        // 3. Reset everything after 2 seconds
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}