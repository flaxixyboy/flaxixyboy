document.addEventListener('DOMContentLoaded', () => {
    // রিফ্রেশ করলে অটো সবার উপরে চলে যাওয়ার জন্য
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    initHeader();
    initLightbox();
    initSidebar();
    initCookiePopup();
    initStats();
});

function initStats() {
    const daysElement = document.getElementById('days-online');
    const downloadsElement = document.getElementById('app-downloads');
    const visitorsElement = document.getElementById('total-visitors');

    // ইন্ডিভিজুয়াল অ্যাপ ডাউনলোডের জন্য এলিমেন্ট
    const hexDownloadsEl = document.getElementById('hex-theme-downloads');
    const mairaDownloadsEl = document.getElementById('maira-ai-downloads');

    if (daysElement) {
        // হার্ড কোডেড ৯ দিন
        daysElement.innerText = '9';
    }

    if (hexDownloadsEl) hexDownloadsEl.innerText = '1,594';
    if (mairaDownloadsEl) mairaDownloadsEl.innerText = '786';

    if (downloadsElement) {
        // হার্ড কোডেড ২.৩৮k
        downloadsElement.innerText = '2.38k';
    }

    if (visitorsElement) {
        // ভিজিটর সংখ্যা এখন হার্ড কোডেড (৮৭৭)
        visitorsElement.innerText = '877';
    }
}

// ডাউনলোড বাটন ক্লিক হ্যান্ডলার (হার্ড কোডেড থাকার কারণে লোকাল স্টোরেজ আপডেট বন্ধ রাখা হলো)
document.addEventListener('click', (e) => {
    // এখানে চাইলে আগের মত লোকাল স্টোরেজ আপডেট রাখা যায়,
    // কিন্তু যেহেতু ইউজার হার্ড কোডেড চেয়েছে তাই আপাতত UI পরিবর্তন করা হচ্ছে না।
});

function initCookiePopup() {
    const popup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');
    const closeBtn = document.getElementById('closeCookie');

    if (!popup || !acceptBtn || !closeBtn) return;

    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    // Check if user has recently hidden the popup
    const cookiePopupHiddenUntil = localStorage.getItem('cookiePopupHiddenUntil');
    const isHidden = cookiePopupHiddenUntil && Date.now() < parseInt(cookiePopupHiddenUntil);

    if (!cookiesAccepted && !isHidden) {
        // Show popup after a short delay
        setTimeout(() => {
            popup.classList.add('active');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        popup.classList.remove('active');
    });

    closeBtn.addEventListener('click', () => {
        // Hide for 2 hours (2 * 60 * 60 * 1000 ms)
        const hideUntil = Date.now() + (2 * 60 * 60 * 1000);
        localStorage.setItem('cookiePopupHiddenUntil', hideUntil.toString());
        popup.classList.remove('active');
    });
}

function initSidebar() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    if (!toggleBtn || !sidebar || !overlay) return;

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    };

    toggleBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // লিঙ্কে ক্লিক করলে স্লাইডার বন্ধ হবে
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

function initHeader() {
    const header = document.querySelector('.iris-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-item img, img.dev-photo');

    if (!lightbox || !lightboxImg || !closeBtn) return;

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}
