// ---------- Vanilla JS Carousel ---------- //
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = Array.from(document.querySelectorAll('.slide[data-slide]'));
    const container = document.querySelector('.container');
    const totalSlides = slides.length;
    let cardWidth, cardHeight;

    // Calculate dimensions and update positions
    function calculateDimensions() {
        const firstSlide = slides[0];
        cardWidth = firstSlide.offsetWidth;
        cardHeight = firstSlide.offsetHeight;
        container.style.height = `${cardHeight}px`;
        updateSlidePositions();
    }

    function updateSlidePositions() {
        slides.forEach(slide => {
            slide.className = 'slide';
            slide.style.opacity = 0;
            slide.style.transform = 'translateX(0) scale(1)';
        });

        const offsets = [
            { className: 'left-2', offset: -cardWidth * 0.5, scale: 0.7, opacity: 0.4 },
            { className: 'left-1', offset: -cardWidth * 0.3, scale: 0.85, opacity: 0.7 },
            { className: 'active', offset: 0, scale: 1, opacity: 1 },
            { className: 'right-1', offset: cardWidth * 0.3, scale: 0.85, opacity: 0.7 },
            { className: 'right-2', offset: cardWidth * 0.5, scale: 0.7, opacity: 0.4 },
        ];

        offsets.forEach(({ className, offset, scale, opacity }, i) => {
            let index = (currentSlide + i - 2 + totalSlides) % totalSlides;
            const slide = slides[index];
            slide.classList.add(className);
            slide.style.transform = `translateX(${offset}px) scale(${scale})`;
            slide.style.opacity = opacity;
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePositions();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePositions();
    }

    // Event listeners
    document.querySelector('.next')?.addEventListener('click', nextSlide);
    document.querySelector('.prev')?.addEventListener('click', prevSlide);

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('active')) {
                currentSlide = slides.indexOf(slide);
                updateSlidePositions();
            }
        });
    });

    // Recalculate dimensions on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(calculateDimensions, 250);
    });

    // Wait for all images to load
    const images = container.querySelectorAll('img');
    let loaded = 0;
    if (images.length === 0) {
        calculateDimensions();
    } else {
        images.forEach(img => {
            if (img.complete) {
                loaded++;
            } else {
                img.addEventListener('load', () => {
                    loaded++;
                    if (loaded === images.length) calculateDimensions();
                });
            }
        });
        if (loaded === images.length) calculateDimensions();
    }
});