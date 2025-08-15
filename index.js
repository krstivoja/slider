// Slider configuration
const slider = tns({
    container: '.team-slider',
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

// Utility functions
const addDataAttributes = () => {
    document.querySelectorAll('.tns-item').forEach((slide, index) => {
        slide.setAttribute('data-index', index);
    });
};

const markItems = () => {
    // Remove previous classes
    document.querySelectorAll('.tns-item').forEach(item => {
        item.classList.remove('middle-item', 'side-item');
    });
    
    // Get current slide info and calculate positions
    const { index: currentIndex } = slider.getInfo();
    const middleIndex = currentIndex + 2;
    const leftSideIndex = currentIndex + 1;
    const rightSideIndex = currentIndex + 3;
    
    // Mark items with appropriate classes
    const itemsToMark = [
        { index: middleIndex, class: 'middle-item' },
        { index: leftSideIndex, class: 'side-item' },
        { index: rightSideIndex, class: 'side-item' }
    ];
    
    itemsToMark.forEach(({ index, class: className }) => {
        const item = document.querySelector(`[data-index="${index}"]`);
        if (item) {
            item.classList.add(className);
        }
    });
    
    console.log(`Items marked - Current: ${currentIndex}, Middle: ${middleIndex}, Sides: ${leftSideIndex}, ${rightSideIndex}`);
};

// Initialize and set up event listeners
const init = () => {
    setTimeout(() => {
        addDataAttributes();
        markItems();
    }, 100);
    
    // Event listeners for slide changes
    slider.events.on('transitionEnd', markItems);
    slider.events.on('transitionStart', markItems);
};

// Initialize slider
init();

// Debug info
console.log('Slider initialized:', slider);