document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !modalImg || !closeBtn) {
        console.error('Modal elements not found:', {
            modal: !!modal,
            modalImg: !!modalImg,
            closeBtn: !!closeBtn
        });
    }

    // Add click event to all collection items
    const collectionItems = document.querySelectorAll('.collection-item');
    console.log('Found collection items:', collectionItems.length);

    collectionItems.forEach(item => {
        item.addEventListener('click', function() {
            const imagePath = this.getAttribute('data-image');
            console.log('Clicked item, image path:', imagePath);
            modal.style.display = "block";
            modalImg.src = imagePath;
            console.log('Set modal image src to:', modalImg.src);
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        console.log('Close button clicked');
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log('Clicked outside image');
            modal.style.display = "none";
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === "block") {
            console.log('Escape key pressed');
            modal.style.display = "none";
        }
    });
});
