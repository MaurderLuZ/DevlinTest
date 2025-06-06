const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const offscreenElements = document.querySelectorAll('[offscreen]');
    offscreenElements.forEach(el => {
        observer.observe(el);
    });
    
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroImage && scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transitionDelay = `${index * 0.2}s`;
    });
    
    const locations = document.querySelectorAll('.location');
    locations.forEach((location, index) => {
        location.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });
    }
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
});

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const throttledScrollHandler = throttle(() => {
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-links.mobile-open {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .nav-links.mobile-open .nav-link {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

const heroContentStyles = `
.hero-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
}

body.loaded .hero-content {
    opacity: 1;
    transform: translateY(0);
}
`;

const heroStyleSheet = document.createElement('style');
heroStyleSheet.textContent = heroContentStyles;
document.head.appendChild(heroStyleSheet);
