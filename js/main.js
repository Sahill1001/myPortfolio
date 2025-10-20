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
        duration: 800,
        easing: 'ease-in-out',
        once: false, // Changed to false to allow animations to occur every time an element scrolls into view
        mirror: true, // Changed to true to trigger animations when scrolling back up
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
                avatarContainer.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(${Math.sin(Date.now() / 1000) * 10}px)`;
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
}); 