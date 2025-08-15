//----------JQuery-----------------//
$(function(){
    let currentSlide = 0;
    const slides = $('.slide[data-slide]');
    const totalSlides = slides.length;
    
    // Initialize the slider
    function initSlider() {
        // Set initial positions
        updateSlidePositions();
    }
    
    // Update slide positions based on current slide
    function updateSlidePositions() {
        slides.removeClass('active left-1 left-2 right-1 right-2');
        
        // Set active (center) slide
        slides.eq(currentSlide).addClass('active');
        
        // Set left slides
        const left1Index = (currentSlide - 1 + totalSlides) % totalSlides;
        slides.eq(left1Index).addClass('left-1');
        
        const left2Index = (currentSlide - 2 + totalSlides) % totalSlides;
        slides.eq(left2Index).addClass('left-2');
        
        // Set right slides
        const right1Index = (currentSlide + 1) % totalSlides;
        slides.eq(right1Index).addClass('right-1');
        
        const right2Index = (currentSlide + 2) % totalSlides;
        slides.eq(right2Index).addClass('right-2');
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePositions();
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePositions();
    }
    
    // Event handlers
    $('.next').click(function(){
        nextSlide();
    });
    
    $('.prev').click(function(){
        prevSlide();
    });
    
    // Initialize the slider
    initSlider();
});