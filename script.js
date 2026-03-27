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

    // Mobile Swipe effect for Fleet
    const fleetGrid = document.querySelector('.fleet-grid');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    if (fleetGrid && window.innerWidth <= 800) {
        fleetGrid.addEventListener('scroll', () => {
            const containerCenter = fleetGrid.getBoundingClientRect().left + (fleetGrid.offsetWidth / 2);
            let closestIndex = 0;
            let minDistance = Infinity;

            document.querySelectorAll('.fleet-card').forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + (rect.width / 2);
                const distance = Math.abs(containerCenter - cardCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }

                // Calculate scale and drop based on distance from center
                const drop = Math.min(distance * 0.15, 80); // Max drop 80px
                const scale = Math.max(1 - (distance * 0.001), 0.85); // Min scale 85%
                
                card.style.transform = `translateY(${drop}px) scale(${scale})`;
            });

            if (dots.length > 0) {
                dots.forEach(d => d.classList.remove('active'));
                dots[closestIndex].classList.add('active');
            }
        });
        // Initial trigger
        setTimeout(() => { fleetGrid.dispatchEvent(new Event('scroll')); }, 500);
    }
});
