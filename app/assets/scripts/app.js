import $ from "jquery";

//Smooth scrolling

var returnBtn = document.querySelector(".return-btn");
var largeHero = document.querySelector(".large-hero");
var largeHeroBottom = largeHero.offsetTop;

function checkBtn() {
    if (window.pageYOffset >= largeHeroBottom) {
        returnBtn.classList.add("return-btn--revealed");
    } else {
        returnBtn.classList.remove("return-btn--revealed");
    }
}

$(function() {
    // This will select everything with the class smoothScroll
    // This should prevent problems with carousel, scrollspy, etc...
    $('.smoothScroll').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 800); // The number here represents the speed of the scroll in milliseconds
          target.focus(); // Setting focus
          if (target.is(":focus")){ // Checking if the target was focused
            return false;
          } else {
            target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            target.focus(); // Setting focus
          };
          return false;
        }
      }
    });
  });