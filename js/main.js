/**
 * Portfolio Scripts - Sahilkumar Prasad
 * Main JavaScript file for portfolio website
 * Enhanced version with improved animations
 */

// Handle preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Delay hiding preloader slightly for smoother transition
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after transition completes
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 650,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        anchorPlacement: 'center-bottom',
        disable: 'mobile' // Disable on mobile for better performance
    });

    // Initialize Vanta.js background based on theme - disabled as per user request
    function initVantaBackground() {
        // Function disabled to remove animated background
        if (window.vantaInstance) {
            window.vantaInstance.destroy();
        }
        return;
    }
    
    // Initialize Vanta.js on page load
    initVantaBackground();

    // Initialize tsParticles for code particles - disabled as per user request
    function initParticles() {
        // Function disabled to remove particles animation
        return;
    }

    // Initialize particles
    initParticles();

    // Initialize Lottie animation
    if (lottie && document.getElementById('lottie-container')) {
        const lottieAnim = lottie.loadAnimation({
            container: document.getElementById('lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets9.lottiefiles.com/packages/lf20_3rwasyjy.json' // Perfect NPC-like character with laptop
        });
    }

    // Make the avatar container interactive with better 3D effect
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            
            if (window.innerWidth > 992) {
                avatarContainer.style.transform = `perspective(1100px) rotateY(${x * 0.6}deg) rotateX(${y * 0.6}deg) translateY(${Math.sin(Date.now() / 1000) * 6}px)`;
            }
        });
    }

    // Create code typing animation
    function createCodeElement() {
        const codeText = [
            "@SpringBootApplication\npublic class Application {\n  public static void main(String[] args) {\n    SpringApplication.run(Application.class, args);\n  }\n}",
            "@RestController\n@RequestMapping(\"/api\")\npublic class UserController {\n  @Autowired\n  private UserService userService;\n}",
            "@Entity\n@Table(name = \"users\")\npublic class User {\n  @Id\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\n  private Long id;\n}",
            "@Service\npublic class UserService {\n  @Autowired\n  private UserRepository userRepository;\n}",
            "@GetMapping(\"/users\")\npublic List<User> getAllUsers() {\n  return userService.findAll();\n}",
            "@PostMapping(\"/users\")\npublic ResponseEntity<User> createUser(@RequestBody User user) {\n  return ResponseEntity.ok(userService.save(user));\n}",
            "public interface UserRepository extends JpaRepository<User, Long> {\n  List<User> findByEmail(String email);\n}"
        ];
        
        // Rest of the animation logic can be handled by CSS
    }
    
    createCodeElement();

    // Mobile menu toggle with improved animations
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Change hamburger icon to X when menu is open
            if (mobileMenu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Smooth scroll for navigation links with improved easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced sticky header with background change on scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Improved back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add active class to nav links on scroll with improved accuracy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 200; // Adjusted offset
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Enhanced Dark mode toggle with improved interaction
    const themeToggles = document.querySelectorAll('.theme-toggle, .nav-theme-toggle');
    if (themeToggles.length) {
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            themeToggles.forEach(toggle => {
                const icon = toggle.querySelector('i');
                if (icon) {
                    if (theme === 'dark') {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                }
            });
            // Reinitialize backgrounds for theme
            if (typeof initVantaBackground === 'function') initVantaBackground();
            if (typeof initParticles === 'function') initParticles();
        }

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDarkScheme.matches) {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }

        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.style.transform = 'rotate(360deg)';
                setTimeout(() => { toggle.style.transform = ''; }, 300);
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        });

        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                setTheme(newTheme);
            }
        });
    }
    
    // Add scroll reveal animations for section-dividers
    const dividers = document.querySelectorAll('.section-divider');
    if (dividers.length) {
        const observerOptions = {
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                } else {
                    entry.target.style.opacity = '0.5';
                }
            });
        }, observerOptions);
        
        dividers.forEach(divider => {
            divider.style.transition = 'opacity 0.5s ease';
            divider.style.opacity = '0.5';
            observer.observe(divider);
        });
    }

    // Case Study modal
    const modal = document.getElementById('case-study-modal');
    const overlay = document.getElementById('case-study-overlay');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    let lastFocusedElement = null;

    const modalEls = modal ? {
        title: document.getElementById('case-study-title'),
        subtitle: document.getElementById('case-study-subtitle'),
        results: document.getElementById('case-study-results'),
        problem: document.getElementById('case-study-problem'),
        solution: document.getElementById('case-study-solution'),
        impact: document.getElementById('case-study-impact'),
        tech: document.getElementById('case-study-tech'),
        repo: document.getElementById('case-study-repo'),
        contact: document.getElementById('case-study-contact')
    } : null;

    const caseStudies = {
    "tally": {
        "title": "ERP-to-Tally Integration",
        "subtitle": "Professional work: Java/Spring Boot accounting bridge",
        "results": [
            "Accounting validation",
            "Duplicate-request checks",
            "Finance review"
        ],
        "problem": "ERP billing entries need to be translated and checked before they are posted to Tally.",
        "solution": "Built a Java/Spring Boot bridge that maps ERP billing to accounting entries and Tally XML/HTTP requests.",
        "impact": [
            "Validated debit/credit balance before posting.",
            "Added duplicate-request checks and a finance review step.",
            "Diagnosed API and synchronization failures."
        ],
        "tech": [
            "Java",
            "Spring Boot",
            "Tally XML/HTTP"
        ],
        "repoUrl": "https://github.com/Sahill1001"
    },
    "rate": {
        "title": "Redis Rate Limiter",
        "subtitle": "Personal Java project: token-bucket request throttling",
        "results": [
            "Redis Lua script",
            "HTTP 429 response",
            "Configurable token bucket"
        ],
        "problem": "Practice enforcing a shared request limit without separate read-and-write races inside Redis.",
        "solution": "Implemented a Spring Boot endpoint backed by a Redis Lua script that refills and consumes tokens atomically.",
        "impact": [
            "Returns HTTP 429 when a client exhausts its bucket.",
            "Uses configurable capacity and refill settings.",
            "Includes controller tests and opt-in real-Redis tests; no throughput benchmark is claimed."
        ],
        "tech": [
            "Java",
            "Spring Boot",
            "Redis",
            "Lua"
        ],
        "repoUrl": "https://github.com/Sahill1001/rate-limiter"
    },
    "notify": {
        "title": "Notification System",
        "subtitle": "Learning project: Kafka-based notification processing",
        "results": [
            "API and worker modules",
            "Retry and DLQ flow",
            "Completed-delivery checks"
        ],
        "problem": "Practice asynchronous processing and failure handling across separate API and worker modules.",
        "solution": "Built a Kafka event flow with Redis-backed completion checks and rate limiting, provider routing, retries and a dead-letter topic.",
        "impact": [
            "Fixed failed sends being incorrectly skipped on retry.",
            "Added regression tests for retries, redelivery and exhausted attempts.",
            "Provider calls are simulated until endpoints are configured; exactly-once delivery is not guaranteed."
        ],
        "tech": [
            "Java",
            "Spring Boot",
            "Kafka",
            "Redis"
        ],
        "repoUrl": "https://github.com/Sahill1001/notification-system"
    },
    "shortener": {
        "title": "URL Shortener",
        "subtitle": "Personal Java project: redirects, caching and click events",
        "results": [
            "Custom short codes",
            "Redis cache",
            "Kafka click events"
        ],
        "problem": "Practice short-link creation, cached redirects and asynchronous click processing.",
        "solution": "Built Spring Boot APIs using PostgreSQL persistence, Redis caching and Kafka click events.",
        "impact": [
            "Supports custom codes, expiration checks and deletion.",
            "Added service tests for cache hits, missing/expired links, duplicate codes and rate-limit rejection.",
            "No production traffic or measured latency reduction is claimed."
        ],
        "tech": [
            "Java",
            "Spring Boot",
            "PostgreSQL",
            "Redis",
            "Kafka"
        ],
        "repoUrl": "https://github.com/Sahill1001/url-shortener"
    },
    "manisha": {
        "title": "Manisha Enterprise Website",
        "subtitle": "Business website for fabrication and interior services",
        "results": [
            "Service showcase",
            "Project gallery",
            "Contact links"
        ],
        "problem": "Present the business services and project work online.",
        "solution": "Created a responsive website with service information, a project gallery and contact links.",
        "impact": [
            "Made services and project examples accessible online.",
            "Provided a direct way for visitors to contact the business."
        ],
        "tech": [
            "Responsive web design",
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "repoUrl": "https://www.manishaenterprise.in/",
        "repoLabel": "live"
    }
};

    function setModalOpen(isOpen) {
        if (!modal || !overlay) return;
        modal.setAttribute('aria-hidden', String(!isOpen));
        overlay.setAttribute('aria-hidden', String(!isOpen));
        document.body.classList.toggle('modal-open', isOpen);
    }

    function getFocusableElements(container) {
        if (!container) return [];
        const selectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];
        return Array.from(container.querySelectorAll(selectors.join(',')))
            .filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    }

    function renderCaseStudy(projectId) {
        if (!modalEls) return;
        const data = caseStudies[projectId];
        if (!data) return;

        modalEls.title.textContent = data.title;
        modalEls.subtitle.textContent = data.subtitle || '';
        modalEls.problem.textContent = data.problem || '';
        modalEls.solution.textContent = data.solution || '';

        if (modalEls.results) {
            while (modalEls.results.firstChild) modalEls.results.removeChild(modalEls.results.firstChild);
            (data.results || []).forEach(item => {
                const chip = document.createElement('span');
                chip.className = 'result-chip';
                chip.textContent = item;
                modalEls.results.appendChild(chip);
            });
        }

        while (modalEls.impact.firstChild) modalEls.impact.removeChild(modalEls.impact.firstChild);
        (data.impact || []).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalEls.impact.appendChild(li);
        });

        while (modalEls.tech.firstChild) modalEls.tech.removeChild(modalEls.tech.firstChild);
        (data.tech || []).forEach(tag => {
            const el = document.createElement('span');
            el.className = 'modal-tag';
            el.textContent = tag;
            modalEls.tech.appendChild(el);
        });

        modalEls.repo.href = data.repoUrl || '#';
        if (modalEls.repo.querySelector('i')) {
            const icon = modalEls.repo.querySelector('i');
            if (data.repoLabel === 'live') {
                icon.className = 'fas fa-external-link-alt';
                modalEls.repo.childNodes[modalEls.repo.childNodes.length - 1].textContent = ' Live Site';
            } else {
                icon.className = 'fab fa-github';
                modalEls.repo.childNodes[modalEls.repo.childNodes.length - 1].textContent = ' Repository';
            }
        }
    }

    function openCaseStudy(projectId, triggerEl) {
        lastFocusedElement = triggerEl || document.activeElement;
        renderCaseStudy(projectId);
        setModalOpen(true);
        modal.dataset.trigger = triggerEl ? '1' : '0';
        setTimeout(() => {
            (closeBtn || modal).focus?.();
        }, 0);
    }

    function closeCaseStudy() {
        setModalOpen(false);
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            setTimeout(() => lastFocusedElement.focus(), 0);
        }
    }

    document.querySelectorAll('.project-card .case-study-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.project-card');
            const id = card ? card.getAttribute('data-project') : null;
            if (id) openCaseStudy(id, e.currentTarget);
        });
    });

    if (overlay) overlay.addEventListener('click', closeCaseStudy);
    if (closeBtn) closeBtn.addEventListener('click', closeCaseStudy);
    document.addEventListener('keydown', (e) => {
        if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
        if (e.key === 'Escape') {
            closeCaseStudy();
            return;
        }
        if (e.key === 'Tab') {
            const focusables = getFocusableElements(modal);
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;

            if (e.shiftKey) {
                if (active === first || !modal.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
}); 