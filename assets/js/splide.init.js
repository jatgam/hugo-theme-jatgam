$(document).ready(function(){
    if ($('.splide').length) {
        var splide = new Splide( '.splide' );
        splide.mount();

        // const splideSlideSelector = `#splide-carousel .carousel-description`;
        // var splideSlides = document.querySelectorAll(splideSlideSelector) || [];
        // splideSlides.forEach(slide => {
        //     resizeObserver.observe(slide);
        // });
    };
});

function computeStyle(elem, prop) {
    return window.getComputedStyle(elem).getPropertyValue(prop);
}

function getLineHeight(elem) {
    let lh = computeStyle(elem, "line-height");
    if (lh === "normal") {
      lh = parseFloat(parseFloat(computeStyle(elem, "font-size")).toFixed(0)) * 1.0; // bulma default line height
    }
    return parseFloat(parseFloat(lh).toFixed(0));
}

function getMaxLines(elem) {
    const availHeight = elem.clientHeight;
    const lineHeight = getLineHeight(elem);

    return Math.max(Math.floor(availHeight / lineHeight), 0);
}

const resizeObserver = new ResizeObserver((entries => {
    for (const entry of entries) {
        entry.target.style["-webkit-line-clamp"] = getMaxLines(entry.target);
    }
}));