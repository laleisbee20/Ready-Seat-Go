let lastScrollTop = 0;

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const blocks = document.querySelectorAll(".block");

    blocks.forEach((block, index) => {
        // Scrolling down
        if (currentScrollTop > lastScrollTop) {
            if (isElementInViewport(block) && !block.classList.contains("visible")) {
                setTimeout(() => {
                    block.classList.add("visible");
                }, index * 300);
            }
        }
        // Scrolling up
        else {
            if (!isElementInViewport(block) && block.classList.contains("visible")) {
                block.classList.remove("visible");
            }
        }
    });

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
}

document.addEventListener("DOMContentLoaded", () => {
    handleScroll(); // Initial check

    window.addEventListener("scroll", () => {
        handleScroll();
    });
});
