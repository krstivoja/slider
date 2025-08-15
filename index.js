//----------JQuery-----------------//
$(function(){
    let currentSlide = 0;
    const slides = $('.slide[data-slide]');
    const totalSlides = slides.length;
    let cardWidth, cardHeight, containerWidth;
    
    // Calculate dimensions based on actual card size
    function calculateDimensions() {
        const firstSlide = slides.first();
        cardWidth = firstSlide.outerWidth(true);
        cardHeight = firstSlide.outerHeight(true);
        containerWidth = $('.container').width();
        
        // Update container height based on actual card height
        $('.container').css('height', cardHeight + 'px');
        
        // Update slide positioning based on actual dimensions
        updateSlidePositions();
    }
    
    // Initialize the slider
    function initSlider() {
        // Wait for images to load before calculating dimensions
        const images = slides.find('img');
        let loadedImages = 0;
        
        images.each(function() {
            if (this.complete) {
                loadedImages++;
                if (loadedImages === images.length) {
                    calculateDimensions();
                }
            } else {
                $(this).on('load', function() {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        calculateDimensions();
                    }
                });
            }
        });
        
        // Fallback if no images
        if (images.length === 0) {
            calculateDimensions();
        }
    }
    
    // Update slide positions based on current slide and actual dimensions
    function updateSlidePositions() {
        // First, set all slides to opacity 0 and remove all classes
        slides.removeClass('active left-1 left-2 right-1 right-2').css('opacity', 0);
        
        // Set active (center) slide
        slides.eq(currentSlide).addClass('active').css('opacity', 1);
        
        // Calculate positions based on actual card width
        const left1Offset = -(cardWidth * 0.3);
        const left2Offset = -(cardWidth * 0.5);
        const right1Offset = cardWidth * 0.3;
        const right2Offset = cardWidth * 0.5;
        
        // Set left slides
        const left1Index = (currentSlide - 1 + totalSlides) % totalSlides;
        slides.eq(left1Index).addClass('left-1').css({
            'transform': `translateX(${left1Offset}px) scale(0.85)`,
            'opacity': 0.7
        });
        
        const left2Index = (currentSlide - 2 + totalSlides) % totalSlides;
        slides.eq(left2Index).addClass('left-2').css({
            'transform': `translateX(${left2Offset}px) scale(0.7)`,
            'opacity': 0.4
        });
        
        // Set right slides
        const right1Index = (currentSlide + 1) % totalSlides;
        slides.eq(right1Index).addClass('right-1').css({
            'transform': `translateX(${right1Offset}px) scale(0.85)`,
            'opacity': 0.7
        });
        
        const right2Index = (currentSlide + 2) % totalSlides;
        slides.eq(right2Index).addClass('right-2').css({
            'transform': `translateX(${right2Offset}px) scale(0.7)`,
            'opacity': 0.4
        });
        
        // Set active slide transform
        slides.eq(currentSlide).css('transform', 'translateX(0) scale(1)');
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
    
    // Add click functionality to all slides
    slides.click(function(e) {
        // Prevent event bubbling issues
        e.stopPropagation();
        
        const clickedIndex = $(this).data('slide');
        const clickedClass = $(this).attr('class');
        
        // Only allow clicking on visible slides (not the active one)
        if (clickedClass.includes('left-1') || clickedClass.includes('left-2') || 
            clickedClass.includes('right-1') || clickedClass.includes('right-2')) {
            currentSlide = clickedIndex;
            updateSlidePositions();
        }
    });
    
    // Also add click handlers to images and names to ensure they work
    slides.find('img, .name').click(function(e) {
        e.stopPropagation();
        const parentSlide = $(this).closest('.slide');
        const clickedIndex = parentSlide.data('slide');
        const clickedClass = parentSlide.attr('class');
        
        // Only allow clicking on visible slides (not the active one)
        if (clickedClass.includes('left-1') || clickedClass.includes('left-2') || 
            clickedClass.includes('right-1') || clickedClass.includes('right-2')) {
            currentSlide = clickedIndex;
            updateSlidePositions();
        }
    });
    
    // Add a more robust click handler that checks current state
    $(document).on('click', '.slide', function(e) {
        e.stopPropagation();
        
        // Get the clicked slide and its current state
        const $clickedSlide = $(this);
        const clickedIndex = $clickedSlide.data('slide');
        
        // Check if this slide is currently in a visible position
        const isLeft1 = $clickedSlide.hasClass('left-1');
        const isLeft2 = $clickedSlide.hasClass('left-2');
        const isRight1 = $clickedSlide.hasClass('right-1');
        const isRight2 = $clickedSlide.hasClass('right-2');
        const isActive = $clickedSlide.hasClass('active');
        
        // Only allow clicking on visible side slides
        if ((isLeft1 || isLeft2 || isRight1 || isRight2) && !isActive) {
            // Prevent rapid clicking during transitions
            if ($clickedSlide.hasClass('transitioning')) {
                return;
            }
            
            // Mark as transitioning to prevent multiple clicks
            $clickedSlide.addClass('transitioning');
            
            currentSlide = clickedIndex;
            updateSlidePositions();
            
            // Remove transitioning class after animation completes
            setTimeout(() => {
                $clickedSlide.removeClass('transitioning');
            }, 500); // Match the CSS transition duration
        }
    });
    
    // Handle window resize
    $(window).on('resize', function() {
        // Debounce resize events
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            calculateDimensions();
        }, 250);
    });
    
    // Initialize the slider
    initSlider();
});