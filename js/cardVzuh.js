function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100
    );
}

function checkBlocks() {
    const blocks = document.querySelectorAll('.animate-block, .block, .cardRandom');
    blocks.forEach(block => {
        if (isElementInViewport(block)) {
            block.classList.add('show', 'visible');
        }
    });
}

window.addEventListener('scroll', checkBlocks);
window.addEventListener('load', checkBlocks);
setTimeout(checkBlocks, 100);
