// JavaScript for smooth scrolling (optional, but nice UX)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
