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
        updateAccordionState();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePositions();
        updateAccordionState();
    }

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlidePositions();
        updateAccordionState();
    }

    // Function to update accordion state based on current slide
    function updateAccordionState() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.classList.add('active');
                // Open the accordion content
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.display = 'block';
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            } else {
                item.classList.remove('active');
                // Close the accordion content
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.display = 'none';
                    content.style.maxHeight = '0px';
                }
            }
        });
    }

    // Event listeners
    document.querySelector('.next')?.addEventListener('click', nextSlide);
    document.querySelector('.prev')?.addEventListener('click', prevSlide);

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('active')) {
                currentSlide = slides.indexOf(slide);
                updateSlidePositions();
                updateAccordionState();
            }
        });
    });

    // Accordion click handlers
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const content = otherItem.querySelector('.accordion-content');
                    if (content) {
                        content.style.display = 'none';
                        content.style.maxHeight = '0px';
                    }
                }
            });

            // Toggle current accordion item
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.display = 'none';
                    content.style.maxHeight = '0px';
                }
            } else {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.display = 'block';
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }

            // Activate corresponding slide in slider
            goToSlide(index);
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