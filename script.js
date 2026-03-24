/* 
  ─── MASTER CODING INTERACTIVE LOGIC ─── 
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR LOGIC
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const trailContainer = document.getElementById('cursorTrailContainer');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createTrail(e.clientX, e.clientY);
    });

    // Smooth cursor movement
    const animateCursor = () => {
        // Dot follows instantly but with slight lag for smoothness
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Ring follows with more lag
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor interaction states
    const interactables = document.querySelectorAll('a, button, .feat-card, .pill, [data-hover]');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '80px';
            cursorRing.style.height = '80px';
            cursorRing.style.borderColor = 'var(--accent-primary)';
            cursorRing.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            cursorRing.style.backgroundColor = 'transparent';
        });
    });

    // Trail effect
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        trailContainer.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            setTimeout(() => trail.remove(), 500);
        }, 100);
    }

    // 2. HERO CANVAS & MESH ORBS — removed (background animations disabled)


    // 3. SCROLL REVEAL & NAVBAR BEHAVIOR
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter if it's a stat
                if (entry.target.classList.contains('stat')) {
                    const numEl = entry.target.querySelector('.stat-num');
                    const target = parseInt(numEl.getAttribute('data-count'));
                    animateCount(numEl, target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feat-card, .step, .price-card, .testi-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s var(--ease-out)';
        observer.observe(el);
    });

    // Number counting animation
    function animateCount(el, target) {
        let current = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        const updateShowcaseItems = (index) => {
            const item = items[index];
            badge.textContent = `● ${item.name} Code`;
            // In a real app, we'd update code lines here too
        };
        const timer = setInterval(() => {
            current += 1;
            el.textContent = current;
            if (current == target) clearInterval(timer);
        }, stepTime);
    }

    // 4. CODE SHOWCASE TYPEWRITER EFFECT
    const codeLines = [
        '<span class="code-keyword">import</span> <span class="code-func">mastercoding</span>',
        '<span class="code-comment"># Building a secure auth layer</span>',
        '<span class="code-keyword">@</span><span class="code-func">app.route</span>(<span class="code-string">"/api/secure-data"</span>)',
        '<span class="code-keyword">async def</span> <span class="code-func">get_data</span>(request):',
        '    user = <span class="code-keyword">await</span> auth.<span class="code-func">verify</span>(request)',
        '    <span class="code-keyword">return await</span> db.<span class="code-func">fetch_protected</span>(user.id)'
    ];

    const codeBody = document.getElementById('codeBody');
    const pills = document.querySelectorAll('.pill');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            // Mock language switch
            codeBody.innerHTML = '<div class="code-typing-cursor"></div>';
            typeCode();
        });
    });

    function typeCode() {
        let lineIdx = 0;
        const typingCursor = codeBody.querySelector('.code-typing-cursor');
        
        function typeLine() {
            if (lineIdx < codeLines.length) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.innerHTML = codeLines[lineIdx];
                codeBody.insertBefore(lineDiv, typingCursor);
                lineIdx++;
                setTimeout(typeLine, 400);
            }
        }
        // Initial wait
        setTimeout(typeLine, 1000);
    }

    // 5. MAGNETIC BUTTONS
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 6. MOUSE MOVE GRADIENT ON CARDS
    document.querySelectorAll('.feat-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 7. MOBILE MENU
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.style.display === 'flex';
        mobileMenu.style.display = isOpen ? 'none' : 'flex';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    });

    // 8. PROFESSIONAL PRICING (Optional logic)
    // No specific slider logic needed for static matrix, but we can add hover effects or toggles later.
    // 9. TESTIMONIAL GLOW BUTTON INTERACTION
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<span class="btn-glow-inner">Loading more excellence...</span><span class="btn-glow-bg"></span>';
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<span class="btn-glow-inner">All Reviews Loaded ✓</span><span class="btn-glow-bg"></span>';
                loadMoreBtn.style.pointerEvents = 'none';
                loadMoreBtn.style.opacity = '0.7';
            }, 1500);
        });
    }
    // 10. VIDEO MODAL LOGIC
    const videoBtn = document.getElementById('videoBtn');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const demoVideo = document.getElementById('demoVideo');

    const openModal = (e) => {
        if(e) e.preventDefault();
        videoModal.style.display = 'flex';
        setTimeout(() => videoModal.classList.add('active'), 10);
        demoVideo.play();
    };

    const closeModal = () => {
        videoModal.classList.remove('active');
        setTimeout(() => videoModal.style.display = 'none', 500);
        demoVideo.pause();
        demoVideo.currentTime = 0;
    };

    if (videoBtn) videoBtn.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Esc to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeModal();
        }
    });
});
