document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav && mobileOverlay) {
        const toggleMenu = () => {
            mainNav.classList.toggle('is-open');
            mobileOverlay.classList.toggle('is-visible');
            document.body.style.overflow = mainNav.classList.contains('is-open') ? 'hidden' : '';
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('is-open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        mainNav.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    toggleMenu();
                }
            });
        });
    }

    // Hero Carousel Simulation
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        indicators.forEach((ind, i) => {
            if (i === index) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    };

    const nextBtn = document.querySelector('.carousel-nav.next');
    const prevBtn = document.querySelector('.carousel-nav.prev');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % indicators.length;
            updateCarousel(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
            updateCarousel(currentIndex);
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // Form submission prevention
    const form = document.querySelector('.update-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Subscribed! <i data-lucide="check"></i>';
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                lucide.createIcons();
                form.reset();
            }, 3000);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
