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

    const scrollTop = window.scrollY;
    const scrollBottom = scrollTop + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollTop <= 50) {
        current = 'home';
    } else if (scrollBottom >= pageHeight - 50) {
        current = 'contact';
    } else {
        const viewportMiddle = scrollTop + window.innerHeight / 2;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (viewportMiddle >= sectionTop) {
                current = section.id;
            }
        });
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

    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const item = entry.target;
            const index = Array.from(timelineItems).indexOf(item);

            if (entry.isIntersecting) {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.classList.add('is-visible');
            } else {
                item.style.transitionDelay = '0s';
                item.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

console.log('Blog website loaded successfully!');
