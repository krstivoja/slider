var slider = tns({
    container: '.my-slider',
    items: 5,
    slideBy: 1,
    autoplay: true,
    loop: true,
    nav: false,
    controls: true,
    gutter: 0,
    edgePadding: 0,
    autoWidth: false,
    center: false,
    mouseDrag: true,
    touch: true,
    swipeAngle: false,
    preventScrollOnTouch: 'auto',
    speed: 1000,
    lazyload: false,
    rewind: false
});

// Add data attributes to slides for better targeting
function addDataAttributes() {
    const slides = document.querySelectorAll('.tns-item');
    slides.forEach((slide, index) => {
        slide.setAttribute('data-index', index);
    });
}

// Function to identify and mark the middle item and side items
function markMiddleAndSideItems() {
    // Remove previous classes
    document.querySelectorAll('.tns-item').forEach(item => {
        item.classList.remove('middle-item', 'side-item');
    });
    
    // Get current slide info from tiny-slider
    const info = slider.getInfo();
    const currentIndex = info.index;
    
    // Calculate which items should be marked
    // With items: 5, the middle item is at current index + 2
    const middleIndex = currentIndex + 2;
    const leftSideIndex = currentIndex + 1;  // Left of middle
    const rightSideIndex = currentIndex + 3; // Right of middle
    
    // Mark the middle item
    const middleItem = document.querySelector(`[data-index="${middleIndex}"]`);
    if (middleItem) {
        middleItem.classList.add('middle-item');
        console.log('✅ Middle item marked:', middleItem, 'at index:', middleIndex);
    }
    
    // Mark the left side item
    const leftSideItem = document.querySelector(`[data-index="${leftSideIndex}"]`);
    if (leftSideItem) {
        leftSideItem.classList.add('side-item');
        console.log('✅ Left side item marked:', leftSideItem, 'at index:', leftSideIndex);
    }
    
    // Mark the right side item
    const rightSideItem = document.querySelector(`[data-index="${rightSideIndex}"]`);
    if (rightSideItem) {
        rightSideItem.classList.add('side-item');
        console.log('✅ Right side item marked:', rightSideItem, 'at index:', rightSideIndex);
    }
    
    console.log('Current slider index:', currentIndex);
}

// Call after slider is initialized
setTimeout(() => {
    addDataAttributes();
    markMiddleAndSideItems();
}, 100);

// Mark items on slide change
slider.events.on('transitionEnd', function() {
    console.log('🔄 Transition ended, marking items...');
    markMiddleAndSideItems();
});

// Also mark on slide change start
slider.events.on('transitionStart', function() {
    console.log('🔄 Transition started, marking items...');
    markMiddleAndSideItems();
});

// Debug: Log slider info
console.log('Slider initialized:', slider);
console.log('Container:', document.querySelector('.my-slider'));
console.log('Items:', document.querySelectorAll('.tns-item'));