(function ($) {
    if ($.fn.style) {
        return;
    }

    // Escape regex chars with \
    var escape = function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    // For those who need them (< IE 9), add support for CSS functions
    var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
    if (!isStyleFuncSupported) {
        CSSStyleDeclaration.prototype.getPropertyValue = function (a) {
            return this.getAttribute(a);
        };
        CSSStyleDeclaration.prototype.setProperty = function (styleName, value, priority) {
            this.setAttribute(styleName, value);
            var priority = typeof priority != 'undefined' ? priority : '';
            if (priority != '') {
                // Add priority manually
                var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
                    '(\\s*;)?', 'gmi');
                this.cssText =
                    this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
            }
        };
        CSSStyleDeclaration.prototype.removeProperty = function (a) {
            return this.removeAttribute(a);
        };
        CSSStyleDeclaration.prototype.getPropertyPriority = function (styleName) {
            var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
                'gmi');
            return rule.test(this.cssText) ? 'important' : '';
        }
    }

    // The style function
    $.fn.style = function (styleName, value, priority) {
        // DOM node
        var node = this.get(0);
        // Ensure we have a DOM node
        if (typeof node == 'undefined') {
            return this;
        }
        // CSSStyleDeclaration
        var style = this.get(0).style;
        // Getter/Setter
        if (typeof styleName != 'undefined') {
            if (typeof value != 'undefined') {
                // Set style property
                priority = typeof priority != 'undefined' ? priority : '';
                style.setProperty(styleName, value, priority);
                return this;
            } else {
                // Get style property
                return style.getPropertyValue(styleName);
            }
        } else {
            // Get CSSStyleDeclaration
            return style;
        }
    };
})(jQuery);



// ========================>>>gallery slider
function gallery(){
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: galleryThumbs
        }
      });
}

//===========================================================================
//---------------------resize------------------------------------------------
//===========================================================================
$(window).on("resize", function () {
    // makeSameAsWidth();
});


//===========================================================================
//---------------------End resize--------------------------------------------
//===========================================================================

//===========================================================================
//---------------------document ready----------------------------------------
//===========================================================================
$(document).ready(function () {


    "use strict";
    var scroll = new SmoothScroll(' a[href*="#"]:not([href="#"]', {


        // Selectors
        ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
        header: null, // Selector for fixed headers (must be a valid CSS selector)
        topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"
        speed: 500,
        offset: 150,
        updateURL: false,
        popstate: true, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)
        emitEvents: true // Emit custom events

    });
    $("#nav-trigger").click(function () {


        $(this).toggleClass("active");

        $("ul.nav").slideToggle(500);

    });




    gallery();
});

// =======================================

// // =======================================


function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.scroll-sec').each(function () {
        var currLink = $(this);
        // console.log(currLink);
        var refElement = $(currLink.attr('href'));

        if (refElement.position().top -300 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.scroll-sec').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}


// // Basice Code keep it
$(document).ready(function () {
    $(document).on("scroll", onScroll);
});



//===========================================================================
//---------------------end document ready------------------------------------
//===========================================================================


$(window).on('load', function () {

    "use strict";

    // Loading Elements

    $(".contain-loader").fadeOut(2000, function () {

        // Show The Scroll
        $("body").css("overflow", "hidden");

        $(this).fadeOut(2000, function () {
            $("body").css("overflow", "auto");
            $(this).remove();
        });

    });


});

