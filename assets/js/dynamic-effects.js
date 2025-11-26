/* ================================================
   BILLION-DOLLAR DYNAMIC EFFECTS - JAVASCRIPT
   Interactive Animations & Advanced Effects
   ================================================ */

(function () {
    'use strict';

    // ========== PARTICLE SYSTEM ==========
    class ParticleSystem {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 50;

            this.init();
        }

        init() {
            const container = document.getElementById('particles');
            if (!container) return;

            container.appendChild(this.canvas);
            this.canvas.style.position = 'absolute';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.pointerEvents = 'none';

            this.resize();
            this.createParticles();
            this.animate();

            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around screen
                if (particle.x < 0) particle.x = this.canvas.width;
                if (particle.x > this.canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = this.canvas.height;
                if (particle.y > this.canvas.height) particle.y = 0;

                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(218, 165, 32, ${particle.opacity})`;
                this.ctx.fill();
            });

            // Draw connections
            this.drawConnections();

            requestAnimationFrame(() => this.animate());
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(218, 165, 32, ${0.15 * (1 - distance / 150)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    // ========== PARALLAX SCROLLING ==========
    class ParallaxEffect {
        constructor() {
            this.parallaxElements = document.querySelectorAll('.parallax-image');
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => this.handleScroll());
            this.handleScroll(); // Initial call
        }

        handleScroll() {
            const scrolled = window.pageYOffset;

            this.parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
    }

    // ========== 3D TILT EFFECT ==========
    class TiltEffect {
        constructor() {
            this.tiltElements = document.querySelectorAll('[data-tilt]');
            this.init();
        }

        init() {
            this.tiltElements.forEach(element => {
                element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
                element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
            });
        }

        handleMouseMove(e, element) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            element.style.setProperty('--rotate-x', `${rotateX}deg`);
            element.style.setProperty('--rotate-y', `${rotateY}deg`);
        }

        handleMouseLeave(element) {
            element.style.setProperty('--rotate-x', '0deg');
            element.style.setProperty('--rotate-y', '0deg');
        }
    }

    // ========== MAGNETIC BUTTON EFFECT ==========
    class MagneticButton {
        constructor() {
            this.buttons = document.querySelectorAll('.magnetic-btn');
            this.init();
        }

        init() {
            this.buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
                button.addEventListener('mouseleave', () => this.handleMouseLeave(button));
            });
        }

        handleMouseMove(e, button) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;

            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        }

        handleMouseLeave(button) {
            button.style.transform = 'translate(0, 0)';
        }
    }

    // ========== SCROLL REVEAL ANIMATIONS ==========
    class ScrollReveal {
        constructor() {
            this.animateElements = document.querySelectorAll(
                '.split-content, .split-visual, .bento-card'
            );
            this.init();
        }

        init() {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                }
            );

            this.animateElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                this.observer.observe(element);
            });
        }
    }

    // ========== SMOOTH SCROLL ==========
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#' || !href) return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    class NavbarEffect {
        constructor() {
            this.navbar = document.querySelector('.nav-premium');
            this.init();
        }

        init() {
            if (!this.navbar) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            });
        }
    }

    // ========== CURSOR GLOW EFFECT ==========
    class CursorGlow {
        constructor() {
            this.cursor = document.createElement('div');
            this.cursorGlow = document.createElement('div');
            this.init();
        }

        init() {
            // Skip on mobile
            if (window.innerWidth < 768) return;

            this.cursor.className = 'custom-cursor';
            this.cursorGlow.className = 'cursor-glow';

            Object.assign(this.cursor.style, {
                position: 'fixed',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'rgba(218, 165, 32, 0.8)',
                pointerEvents: 'none',
                zIndex: '99999',
                transition: 'transform 0.15s ease',
                transform: 'translate(-50%, -50%)'
            });

            Object.assign(this.cursorGlow.style, {
                position: 'fixed',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid rgba(218, 165, 32, 0.3)',
                pointerEvents: 'none',
                zIndex: '99998',
                transition: 'transform 0.2s ease, width 0.2s ease, height 0.2s ease',
                transform: 'translate(-50%, -50%)'
            });

            document.body.appendChild(this.cursor);
            document.body.appendChild(this.cursorGlow);

            document.addEventListener('mousemove', (e) => {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
                this.cursorGlow.style.left = e.clientX + 'px';
                this.cursorGlow.style.top = e.clientY + 'px';
            });

            // Scale up on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    this.cursorGlow.style.width = '60px';
                    this.cursorGlow.style.height = '60px';
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                });

                element.addEventListener('mouseleave', () => {
                    this.cursorGlow.style.width = '40px';
                    this.cursorGlow.style.height = '40px';
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }
    }

    // ========== INITIALIZE ALL EFFECTS ==========
    function initDynamicEffects() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            // Initialize all effects
            new ParticleSystem();
            new ParallaxEffect();
            new TiltEffect();
            new MagneticButton();
            new ScrollReveal();
            new SmoothScroll();
            new NavbarEffect();
            new CursorGlow();

            // Add loaded class to body
            setTimeout(() => {
                document.body.classList.add('effects-loaded');
            }, 100);

            console.log('🎨 Billion-Dollar Dynamic Effects Loaded');
        }
    }

    // Auto-initialize
    initDynamicEffects();

})();
