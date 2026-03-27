document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Smart Navbar
        if (currentScrollY <= 50) {
            navbar.classList.remove('nav-hidden', 'nav-compact');
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down -> hide navbar fully
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-compact');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up -> show compact navbar
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-compact');
        }
        
        // Background Glass
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-scroll, .fade-in-scroll-stagger').forEach(el => {
        observer.observe(el);
    });
});
