$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
    // just control the "is-action" class for the drop down menu, and use the above css to control this display
    $(".navbar-item.has-dropdown")
        .click(function () {
            $(this).children(".navbar-dropdown").toggleClass("is-active");
    });
});
