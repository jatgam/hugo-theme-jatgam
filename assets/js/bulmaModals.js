document.addEventListener('DOMContentLoaded', () => {
    var gallerySlideIndexes = {};

    function openModal($el) {
        $el.classList.add('is-active');
    }
  
    function closeModal($el) {
        $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }
      
    function currentSlide(n, modalId) {
        showSlides(gallerySlideIndexes[modalId] = n, modalId);
    }
      
    function showSlides(n, modalId) {
        var i;
        const slideSelectors = `#${modalId} > .gallery-modal-content > .gallery-item-slide`;
        var slides = document.querySelectorAll(slideSelectors) || [];
        if (n >= slides.length) {gallerySlideIndexes[modalId] = 0}
        if (n < 0) {gallerySlideIndexes[modalId] = slides.length - 1}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[gallerySlideIndexes[modalId]].style.display = "block";
    }

    function loadImages(modalId) {
        const imgSelector = `#${modalId} > .gallery-modal-content > .gallery-item-slide > figure > img.gallery-lazy-load`;
        var images = document.querySelectorAll(imgSelector) || [];
        var i;
        for (i = 0; i < images.length; i++) {
            const currentSrc = images[i].getAttribute("src");
            if (currentSrc !== images[i].dataset.src) {
                images[i].setAttribute("src", images[i].dataset.src);
            }
        }
    }

    (document.querySelectorAll('.gallery-thumbnail') || []).forEach(($trigger) => {
        const target = $trigger.dataset.target;
        var slide = $trigger.dataset.slide;
        slide = parseInt(slide);
        const modal = document.getElementById(target);
        if (!gallerySlideIndexes.hasOwnProperty(target)) {
            gallerySlideIndexes[target] = 0;
        }
  
        $trigger.addEventListener('click', () => {
            currentSlide(slide, target);
            loadImages(target);
            openModal(modal);
        });
    });
  
    (document.querySelectorAll('.modal-content > .gallery-next') || []).forEach(($nav) => {
        const modal = $nav.dataset.parent;
        $nav.addEventListener('click', () => {
            showSlides(gallerySlideIndexes[modal] += 1, modal);
        });
    });

    (document.querySelectorAll('.modal-content > .gallery-prev') || []).forEach(($nav) => {
        const modal = $nav.dataset.parent;
        $nav.addEventListener('click', () => {
            showSlides(gallerySlideIndexes[modal] += -1, modal);
        });
    });

    (document.querySelectorAll('.model-open-button') || []).forEach(($trigger) => {
        const target = $trigger.dataset.target;
        const modal = document.getElementById(target);
  
        $trigger.addEventListener('click', () => {
            openModal(modal);
        });
    });

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
  
        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });
  
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;
  
        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});