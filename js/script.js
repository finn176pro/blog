// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.id;
        }
    });

    if (!current && pageYOffset < 150) {
        current = 'home';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images (optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0.7';
        imageObserver.observe(img);
    });
}

console.log('Blog website loaded successfully!');
