document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.backgroundColor = 'var(--bg-dark)';
            mainNav.style.padding = '1rem 2rem';
            mainNav.style.borderBottom = '1px solid var(--border-color)';
            
            const navLinks = mainNav.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.alignItems = 'flex-start';
                navLinks.style.gap = '1rem';
            }
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
