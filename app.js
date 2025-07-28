// Voltriya Landing Page JavaScript
// Modern animations and interactions

class VoltriyaApp {
    constructor() {
        this.lastScrollY = 0;
        this.navbarVisible = true;
        this.scrollThreshold = 5; // Minimum scroll distance to trigger hide/show
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initScrollAnimations();
        this.initRotatingText();
        this.initCounters();
        this.initCostComparisonChart();
        this.initPartnersCarousel();
        this.initNavigation();
        this.initTiltEffects();
        this.initParticleSystem();
        this.init3DIllustrations();
    }

    setupEventListeners() {
        // DOM Content Loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));
    }

    onDOMReady() {
        // Initialize components that need DOM to be ready
        this.animateOnLoad();
    }

    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Utility: Debounce function
    debounce(func, wait) {
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

    // Initial load animations
    animateOnLoad() {
        // Fade in navigation
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.style.opacity = '0';
            setTimeout(() => {
                nav.style.transition = 'opacity 0.8s ease-out, transform 0.3s ease-in-out, background 0.3s ease-out';
                nav.style.opacity = '1';
                // Start with navbar visible at top
                nav.classList.add('nav-visible');
            }, 100);
        }

        // Animate hero content
        this.animateHeroContent();
    }

    // Hero content animation
    animateHeroContent() {
        const heroElements = [
            '.hero-title .hero-line:first-child',
            '.hero-title .hero-line:last-child',
            '.hero-subtitle',
            '.hero-actions',
            '.hero-stats'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 + (index * 150));
            }
        });
    }

    // Scroll animations using Intersection Observer
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(`
            .section-title,
            .section-description,
            .feature-card,
            .advantage-item,
            .timeline-item,
            .market-stat,
            .community-stat
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    // Animate individual elements
    animateElement(element) {
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    // Rotating text in hero
    initRotatingText() {
        const textItems = document.querySelectorAll('.text-item');
        if (textItems.length === 0) return;

        let currentIndex = 0;

        const rotateText = () => {
            // Remove active class from current item
            textItems[currentIndex].classList.remove('active');
            
            // Move to next item
            currentIndex = (currentIndex + 1) % textItems.length;
            
            // Add active class to new item
            textItems[currentIndex].classList.add('active');
        };

        // Start rotation
        setInterval(rotateText, 3000);
    }

    // Animated counters
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a slight delay for dramatic effect
                    let delay = 200;
                    if (entry.target.classList.contains('problem-number')) {
                        delay = 500;
                    } else if (entry.target.classList.contains('market-number')) {
                        // Staggered delay for market numbers
                        const marketStats = document.querySelectorAll('.market-number');
                        const index = Array.from(marketStats).indexOf(entry.target);
                        delay = 300 + (index * 400);
                        
                        // Add container effect for first market stat
                        if (index === 0) {
                            const marketContainer = document.querySelector('.market-stats');
                            if (marketContainer) {
                                marketContainer.style.transform = 'scale(0.98)';
                                marketContainer.style.transition = 'transform 0.3s ease-out';
                                setTimeout(() => {
                                    marketContainer.style.transform = 'scale(1)';
                                }, 100);
                            }
                        }
                    } else if (entry.target.classList.contains('stat-number')) {
                        // Staggered delay for community stats  
                        const communityStats = document.querySelectorAll('.community .stat-number');
                        const index = Array.from(communityStats).indexOf(entry.target);
                        delay = 200 + (index * 300);
                        
                        // Add container effect for first community stat
                        if (index === 0) {
                            const communityContainer = document.querySelector('.community-stats');
                            if (communityContainer) {
                                communityContainer.style.transform = 'scale(0.98)';
                                communityContainer.style.transition = 'transform 0.3s ease-out';
                                setTimeout(() => {
                                    communityContainer.style.transform = 'scale(1)';
                                }, 100);
                            }
                        }
                    }
                    
                    setTimeout(() => {
                        this.animateCounter(entry.target);
                    }, delay);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            // Reset to 0 initially for dramatic effect
            if (counter.classList.contains('problem-number') || 
                counter.classList.contains('market-number') || 
                counter.classList.contains('stat-number')) {
                const suffix = counter.getAttribute('data-suffix') || counter.nextElementSibling?.textContent || '';
                counter.textContent = '0';
            }
            counterObserver.observe(counter);
        });
    }

    // Animate individual counter
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        let suffix = element.getAttribute('data-suffix') || '';
        
        // For market and stat numbers, get suffix from next sibling element
        if (element.classList.contains('market-number') || element.classList.contains('stat-number')) {
            const suffixElement = element.nextElementSibling;
            suffix = suffixElement ? suffixElement.textContent : '';
        }
        
        const duration = 2500;
        const steps = 80;
        const stepValue = target / steps;
        const stepDuration = duration / steps;
        
        let current = 0;
        
        // Add animating class for visual effects
        if (element.classList.contains('problem-number') ||
            element.classList.contains('market-number') ||
            element.classList.contains('stat-number')) {
            element.classList.add('animating');
        }
        
        const updateCounter = () => {
            current += stepValue;
            if (current >= target) {
                element.textContent = target;
                // Remove animating class when done
                if (element.classList.contains('problem-number') ||
                    element.classList.contains('market-number') ||
                    element.classList.contains('stat-number')) {
                    setTimeout(() => {
                        element.classList.remove('animating');
                    }, 300);
                }
                return;
            }
            element.textContent = Math.floor(current);
            setTimeout(updateCounter, stepDuration);
        };
        
        updateCounter();
    }



    // Cost comparison chart animation
    initCostComparisonChart() {
        const chartBars = document.querySelectorAll('.chart-bar');
        
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateChartBars();
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (chartBars.length > 0) {
            chartObserver.observe(chartBars[0].closest('.cost-comparison'));
        }
    }

    animateChartBars() {
        const chartBars = document.querySelectorAll('.chart-bar');
        const chartContainer = document.querySelector('.cost-comparison');
        
        // Add subtle scale effect to container
        if (chartContainer) {
            chartContainer.style.transform = 'scale(0.98)';
            chartContainer.style.transition = 'transform 0.3s ease-out';
            setTimeout(() => {
                chartContainer.style.transform = 'scale(1)';
            }, 100);
        }
        
        chartBars.forEach((bar, index) => {
            const targetHeight = bar.getAttribute('data-height');
            bar.style.height = '0px';
            bar.style.transition = 'none';
            bar.style.opacity = '0.7';
            
            setTimeout(() => {
                bar.style.transition = 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-out';
                bar.style.height = `${targetHeight}px`;
                bar.style.opacity = '1';
                
                // Add a subtle bounce effect
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1.05)';
                    setTimeout(() => {
                        bar.style.transform = 'scaleY(1)';
                    }, 150);
                }, 1500);
                
            }, index * 400);
        });
    }

    // Partners carousel
    initPartnersCarousel() {
        const track = document.querySelector('.partners-track');
        if (!track) return;

        // Pause on hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }

    // Navigation functionality
    initNavigation() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const nav = document.querySelector('.nav');
        
        if (navToggle && navMenu && nav) {
            navToggle.addEventListener('click', () => {
                const isMenuOpen = navMenu.classList.contains('active');
                
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Prevent/allow body scroll
                if (!isMenuOpen) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close mobile menu when clicking on nav links
            const closeMenu = () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            };
            
            // Close on link click
            document.addEventListener('click', (e) => {
                if (e.target.matches('.nav-menu.active .nav-link')) {
                    closeMenu();
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    closeMenu();
                }
            });
        }

        // Copy contract address
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const contractAddress = copyBtn.previousElementSibling.textContent;
                navigator.clipboard.writeText(contractAddress).then(() => {
                    copyBtn.textContent = '✓';
                    setTimeout(() => {
                        copyBtn.textContent = '📋';
                    }, 2000);
                });
            });
        }
    }

    // Tilt effects for cards
    initTiltEffects() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'transform 0.1s ease-out';
            });
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'transform 0.3s ease-out';
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Particle system for hero background
    initParticleSystem() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #5E5BFF, #2BE4F7);
                border-radius: 50%;
                opacity: 0.6;
                animation: particleFloat ${8 + Math.random() * 4}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 8}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // 3D Illustrations throughout the site
    init3DIllustrations() {
        this.addFloatingCubes();
        this.addDataStreamAnimations();
        this.addNetworkNodes();
    }

    // Add floating 3D cubes to features section
    addFloatingCubes() {
        const featuresSection = document.querySelector('.features');
        if (!featuresSection) return;

        const cubesContainer = document.createElement('div');
        cubesContainer.className = 'floating-cubes';
        cubesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 6; i++) {
            const cube = document.createElement('div');
            cube.className = 'floating-cube';
            cube.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: linear-gradient(45deg, rgba(94, 91, 255, 0.3), rgba(46, 230, 192, 0.3));
                border: 1px solid rgba(94, 91, 255, 0.5);
                border-radius: 4px;
                transform-style: preserve-3d;
                animation: floatCube ${6 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 90}%;
                top: ${Math.random() * 80 + 10}%;
                animation-delay: ${Math.random() * 4}s;
            `;
            cubesContainer.appendChild(cube);
        }

        featuresSection.style.position = 'relative';
        featuresSection.appendChild(cubesContainer);
    }

    // Add data stream animations to advantages section
    addDataStreamAnimations() {
        const advantagesSection = document.querySelector('.advantages');
        if (!advantagesSection) return;

        const streamsContainer = document.createElement('div');
        streamsContainer.className = 'data-streams';
        streamsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        for (let i = 0; i < 4; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(to bottom, transparent, rgba(46, 230, 192, 0.8), transparent);
                border-radius: 1px;
                animation: dataStreamFlow ${4 + Math.random() * 2}s linear infinite;
                left: ${20 + Math.random() * 60}%;
                animation-delay: ${Math.random() * 4}s;
            `;
            streamsContainer.appendChild(stream);
        }

        advantagesSection.style.position = 'relative';
        advantagesSection.appendChild(streamsContainer);
    }

    // Add network nodes to community section
    addNetworkNodes() {
        const communitySection = document.querySelector('.community');
        if (!communitySection) return;

        const nodesContainer = document.createElement('div');
        nodesContainer.className = 'network-nodes';
        nodesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
        `;

        // Create nodes
        const nodePositions = [
            { x: 10, y: 20 },
            { x: 80, y: 15 },
            { x: 15, y: 70 },
            { x: 85, y: 75 },
            { x: 50, y: 30 },
            { x: 30, y: 50 }
        ];

        nodePositions.forEach((pos, index) => {
            const node = document.createElement('div');
            node.className = 'network-node';
            node.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: rgba(94, 91, 255, 0.7);
                border-radius: 50%;
                left: ${pos.x}%;
                top: ${pos.y}%;
                animation: nodePulse ${2 + Math.random()}s ease-in-out infinite;
                animation-delay: ${index * 0.3}s;
                box-shadow: 0 0 10px rgba(94, 91, 255, 0.5);
            `;
            nodesContainer.appendChild(node);
        });

        // Create connections between nodes
        for (let i = 0; i < nodePositions.length - 1; i++) {
            for (let j = i + 1; j < nodePositions.length; j++) {
                if (Math.random() > 0.6) { // Only some connections
                    const connection = document.createElement('div');
                    const pos1 = nodePositions[i];
                    const pos2 = nodePositions[j];
                    
                    const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
                    const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
                    
                    connection.style.cssText = `
                        position: absolute;
                        width: ${distance}%;
                        height: 1px;
                        background: linear-gradient(90deg, transparent, rgba(94, 91, 255, 0.3), transparent);
                        left: ${pos1.x}%;
                        top: ${pos1.y}%;
                        transform-origin: 0 0;
                        transform: rotate(${angle}deg);
                        animation: connectionPulse ${3 + Math.random() * 2}s ease-in-out infinite;
                        animation-delay: ${Math.random() * 2}s;
                    `;
                    nodesContainer.appendChild(connection);
                }
            }
        }

        communitySection.style.position = 'relative';
        communitySection.appendChild(nodesContainer);
    }

    // Handle scroll events
    handleScroll() {
        const scrollY = window.scrollY;
        const nav = document.querySelector('.nav');
        
        // Navbar hide/show logic
        if (nav) {
            // Check if near bottom of page
            const isNearBottom = (window.innerHeight + scrollY) >= (document.body.offsetHeight - 100);
            
            // Don't hide navbar at the very top (first 100px) or near bottom
            if (scrollY <= 100 || isNearBottom) {
                this.showNavbar(nav);
            } else {
                // Only trigger hide/show if scroll distance exceeds threshold
                const scrollDifference = Math.abs(scrollY - this.lastScrollY);
                
                if (scrollDifference > this.scrollThreshold) {
                    // Determine scroll direction
                    const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
                    
                    // Hide navbar when scrolling down, show when scrolling up
                    if (scrollDirection === 'down' && this.navbarVisible) {
                        this.hideNavbar(nav);
                    } else if (scrollDirection === 'up' && !this.navbarVisible) {
                        this.showNavbar(nav);
                    }
                    
                    this.lastScrollY = scrollY;
                }
            }
        }

        // Parallax effect for hero
        const heroGlow = document.querySelector('.hero-glow');
        if (heroGlow) {
            const parallaxSpeed = 0.5;
            heroGlow.style.transform = `translate(-50%, -50%) translateY(${scrollY * parallaxSpeed}px)`;
        }
    }

    // Show navbar
    showNavbar(nav) {
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
        this.navbarVisible = true;
    }

    // Hide navbar
    hideNavbar(nav) {
        nav.classList.remove('nav-visible');
        nav.classList.add('nav-hidden');
        this.navbarVisible = false;
    }

    // Handle resize events
    handleResize() {
        // No special handling needed for image-based tokenomics chart
    }
}

// Advanced Animations Class
class AdvancedAnimations {
    constructor() {
        this.initAdvancedEffects();
    }

    initAdvancedEffects() {
        this.initGlowEffects();
        this.initMorphingButtons();
        this.initAdvancedHovers();
    }

    // Dynamic glow effects
    initGlowEffects() {
        const glowElements = document.querySelectorAll('.btn-primary, .feature-card, .advantage-item');
        
        glowElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                element.style.setProperty('--glow-x', `${x}px`);
                element.style.setProperty('--glow-y', `${y}px`);
            });
        });
    }

    // Button morphing effects
    initMorphingButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transformOrigin = '50% 50%';
            });
        });
    }

    // Advanced hover states
    initAdvancedHovers() {
        // Logo pulse on hover
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.animation = 'pulse 0.6s ease-in-out';
            });
            
            logo.addEventListener('animationend', () => {
                logo.style.animation = '';
            });
        }

        // Social links with ripple effect
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.createRipple(e, link);
            });
        });
    }

    // Ripple effect
    createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(94, 91, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.initOptimizations();
    }

    initOptimizations() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
        this.optimizeAnimations();
    }

    // Lazy load images
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Preload critical assets
    preloadCriticalAssets() {
        const criticalAssets = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
        ];
        
        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = asset;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    // Optimize animations for performance
    optimizeAnimations() {
        // Use transform instead of changing layout properties
        const animatedElements = document.querySelectorAll('.feature-card, .advantage-item');
        
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
            
            element.addEventListener('animationend', () => {
                element.style.willChange = 'auto';
            });
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new VoltriyaApp();
    new AdvancedAnimations();
    new PerformanceOptimizer();
});

// Add CSS for dynamic animations
const dynamicStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .particle {
        pointer-events: none;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Tokenomics dropdown functionality
function toggleDetails(element) {
    // Remove active class from all other legend items
    const allLegendItems = document.querySelectorAll('.legend-item');
    allLegendItems.forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
        }
    });
    
    // Toggle active class on clicked element
    element.classList.toggle('active');
} 