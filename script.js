// EagleTech Solutions - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initTechSlider();
    initInteractiveFeatures();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    }
}

// Navigation
function initNavigation() {
    const header = document.querySelector('header');
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav) nav.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Scroll indicator hide on scroll
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .team-member, .feature'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Technologies Slider
function initTechSlider() {
    const techTrack = document.querySelector('.tech-track');
    if (!techTrack) return;
    
    // Duplicate items for infinite scroll
    const items = techTrack.innerHTML;
    techTrack.innerHTML = items + items;
    
    // Pause animation on hover
    techTrack.addEventListener('mouseenter', () => {
        techTrack.style.animationPlayState = 'paused';
    });
    
    techTrack.addEventListener('mouseleave', () => {
        techTrack.style.animationPlayState = 'running';
    });
}

// Additional interactive features
function initInteractiveFeatures() {
    // Service cards interactive effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.member-overlay');
            const image = this.querySelector('.member-image img');
            
            if (overlay && image) {
                overlay.style.opacity = '1';
                image.style.transform = 'scale(1.1)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.member-overlay');
            const image = this.querySelector('.member-image img');
            
            if (overlay && image) {
                overlay.style.opacity = '0';
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Feature cards hover effect
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Performance optimization - Lazy loading
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Utility function for debounce
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Handle responsive behavior
function handleResize() {
    const nav = document.querySelector('nav ul');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (window.innerWidth > 768) {
        if (nav) nav.style.display = 'flex';
        if (mobileMenu) mobileMenu.classList.remove('active');
    } else {
        if (nav && !nav.classList.contains('active')) {
            nav.style.display = 'none';
        }
    }
}

// Initialize resize handler
window.addEventListener('resize', debounce(handleResize, 250));
handleResize(); // Initial check

// Export functions for global access
window.EagleTech = {
    initNavigation,
    initScrollEffects,
    initAnimations,
    initTechSlider,
    initInteractiveFeatures
};