import $ from "jquery";

//Preloader

document.onreadystatechange = () => {
  var state = document.readyState;
  if (state == 'interactive') {
       document.getElementById('contents').style.visibility = "hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
          document.getElementById('load').style.opacity = "0";
          document.getElementById('load__animation').style.opacity = "0";
          document.getElementById('contents').style.visibility = "visible";
      }, 2000);
      setTimeout(function(){
          document.getElementById('load').style.display = "none";
          document.getElementById('load__animation').style.display = "none";
      }, 2500)
  }
}

//Smooth scrolling

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

//Title Typing

function typeEffect(element, speed) {
	var text = $(element).text();
	$(element).html('');
	
	var i = 0;
	var timer = setInterval(function() {
					if (i < text.length) {
						$(element).append(text.charAt(i));
						i++;
					} else {
						clearInterval(timer);
					}
				}, speed);
}

const txt = document.querySelector(".fancy");
setTimeout(() => {
  typeEffect(txt, 150);
}, 500);

