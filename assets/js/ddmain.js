'use strict';
!function ( $ ) {
    /**
     * Js - Site Loader
     */
    $( window ).load( function () {
	$( ".page-loader" ).delay( 350 ).fadeOut( "slow" );
    } );

    $( document ).ready( function () {
	/**
	 * Bootstrap submenu fix
	 */
	var value;
	/** @type {number} */
	var absoluteMaximum = 991;
	/** @type {boolean} */
	value = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
	/** @type {number} */
	var digits = Math.max( $( window ).width(), window.innerWidth );
	var $this = $( ".has-submenu" );
	if ( digits > absoluteMaximum ) {
	    $this.removeClass( "submenu-open" );
	}
	if ( digits > absoluteMaximum && value !== true ) {
	    $this.children( "a" ).unbind( "click" );
	    $this.unbind( "mouseenter mouseleave" );
	    $this.on( {
		mouseenter: function () {
		    $( this ).addClass( "submenu-open" );
		},
		mouseleave: function () {
		    $( this ).removeClass( "submenu-open" );
		}
	    } );
	} else {
	    $this.unbind( "mouseenter mouseleave" );
	    $this.children( "a" ).unbind( "click" ).click( function ( event ) {
		event.preventDefault();
		$( this ).parent().toggleClass( "submenu-open" );
		if ( digits > absoluteMaximum && 1 == value ) {
		    $( this ).parent().siblings().removeClass( "submenu-open" );
		    $( this ).parent().siblings().find( ".submenu-open" ).removeClass( "submenu-open" );
		}
	    } );
	}
        /**
	 * For back-to-top button
	 */
        function setBacktoTop() {
            if ($(window).scrollTop() > 100) {
                $(".back-to-top").removeClass("hide");
            } else {
                $(".back-to-top").addClass("hide");
            }
        }
	/**
	 * For Sticky Menu
	 */
	function setColorMenu() {
	    if ( $( window ).scrollTop() > 10 ) {
		n.addClass( "header-small" );
		$( ".header-fixed" ).removeClass( "header-transparent" );
	    } else {
		$( ".header-fixed" ).addClass( "header-transparent" );
	    }
	}

	/**
	 * Scrollbar Width JS
	 */
	function walkontableCalculateScrollbarWidth() {
	    /** @type {!Element} */
	    var text = document.createElement( "p" );
	    /** @type {string} */
	    text.style.width = "100%";
	    /** @type {string} */
	    text.style.height = "200px";
	    /** @type {!Element} */
	    var el = document.createElement( "div" );
	    /** @type {string} */
	    el.style.position = "absolute";
	    /** @type {string} */
	    el.style.top = "0px";
	    /** @type {string} */
	    el.style.left = "0px";
	    /** @type {string} */
	    el.style.visibility = "hidden";
	    /** @type {string} */
	    el.style.width = "200px";
	    /** @type {string} */
	    el.style.height = "150px";
	    /** @type {string} */
	    el.style.overflow = "hidden";
	    el.appendChild( text );
	    document.body.appendChild( el );
	    var b = text.offsetWidth;
	    /** @type {string} */
	    el.style.overflow = "scroll";
	    var w = text.offsetWidth;
	    return b == w && ( w = el.clientWidth ), document.body.removeChild( el ), b - w;
	}

	/**
	 * Carousel JS
	 */
	function init() {
	    $( ".owl-controls .owl-page" ).append( '<a class="item-link" href="#"/>' );
	    var $items = $( ".owl-controls .item-link" );
	    $.each( this.owl.userItems, function ( item_index ) {
		$( $items[item_index] ).css( {
		    background: "url(" + $( this ).find( "img" ).attr( "src" ) + ") center center no-repeat",
		    "-webkit-background-size": "cover",
		    "-moz-background-size": "cover",
		    "-o-background-size": "cover",
		    "background-size": "cover"
		} ).click( function () {
		    return $carousel.trigger( "owl.goTo", item_index ), false;
		} );
	    } );
	}

	/**
	 * Hero Header JS
	 */
	var i;
	var n = $( ".header" );
	$( ".module-hero" );
	/** @type {boolean} */
	i = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
	setColorMenu();
	setBacktoTop();
	$( window ).scroll( function () {
	    setColorMenu();
            setBacktoTop();
	} );

        // For Sticky Header
        $(window).scroll(function () {
            var div_height = $('.js-stick').height();
            var sc = $(window).scrollTop();
            if (sc > div_height) {
                $(".js-stick").addClass("def-header-fixed");
                $('.js-stick').siblings('.wrapper').css('margin-top',div_height+'px');
            } else {
                $(".js-stick").removeClass("def-header-fixed");
                $('.js-stick').siblings('.wrapper').css('margin-top','0px');
            }
        });

	//
	$( ".nav-icon-toggle" ).on( "click", function () {
	    $( this ).toggleClass( "open" );
	} );

	//
	$( ".onepage-nav" ).singlePageNav( {
	    currentClass: "active"
	} );

	//
	$( document ).on( "click", ".main-nav.in", function ( jEvent ) {
	    if ( $( jEvent.target ).is( "a" ) && !$( jEvent.target ).parent().hasClass( "has-submenu" ) ) {
		$( this ).collapse( "hide" );
		$( ".nav-icon-toggle" ).toggleClass( "open" );
	    }
	} );

//
	var thread_rows = $( ".module-hero, .module, .module-sm, .module-xs, .background-side, .footer" );
	thread_rows.each( function () {
	    if ( $( this ).attr( "data-background" ) ) {
		$( this ).css( "background-image", "url(" + $( this ).attr( "data-background" ) + ")" );
	    }
	} );

	//
	$( ".off-canvas-cart-wrapper" ).css( "margin-right", "-" + walkontableCalculateScrollbarWidth() + "px" );

	//
	$( "#modal-search, .form-close-btn" ).on( "click", function () {
	    return $( ".header-search-form" ).toggleClass( "opened" ), false;
	} );

	//
	$( ".parallax" ).jarallax( {
	    speed: .7
	} );

	//
	$( ".product-slider .item" ).zoom();
	var $carousel;
	$carousel = $( ".product-slider" );
	$carousel.owlCarousel( {
	    navigation: false,
	    slideSpeed: 300,
	    paginationSpeed: 400,
	    singleItem: true,
	    afterInit: init,
	    afterUpdate: init,
	    touchDrag: false,
	    mouseDrag: false
	} );


	$( "body" ).fitVids();
	var wow = new WOW( {
	    mobile: false
	} );
	wow.init();

	//Tooltip Js
	$( function () {
	    $( '[data-toggle="tooltip"]' ).tooltip( {
		trigger: "hover"
	    } );
	} );

	//Smoothscroll Js
	$( ".smoothscroll" ).on( "click", function ( event ) {
	    var target = this.hash;
	    var $tar = $( target );
	    $( "html, body" ).stop().animate( {
		scrollTop: $tar.offset().top - n.height()
	    }, 600, "swing" );
	    event.preventDefault();
	} );

	//OnTop button Js
	$( 'a[href="#top"]' ).on( "click", function () {
	    return $( "html, body" ).animate( {
		scrollTop: 0
	    }, "slow" ), false;
	} );
	var _takingTooLongTimeout;
	/** @type {!HTMLBodyElement} */
	var accountForm = document.body;
	window.addEventListener( "scroll", function () {
	    clearTimeout( _takingTooLongTimeout );
	    if ( !accountForm.classList.contains( "disable-hover" ) ) {
		accountForm.classList.add( "disable-hover" );
	    }
	    /** @type {number} */
	    _takingTooLongTimeout = setTimeout( function () {
		accountForm.classList.remove( "disable-hover" );
	    }, 100 );
	}, false );

	// JS - Custom product shorting filter in shop page
	$( '.catalog-ordering .orderby .current-li a' ).html( $( '.catalog-ordering .orderby ul li.current a' ).html() );
	$( '.catalog-ordering .sort-count .current-li a' ).html( $( '.catalog-ordering .sort-count ul li.current a' ).html() );

	//Shop page - When product add in cart show loader and indicate product add succesfull.
	$( 'a.add_to_cart_button' ).click( function ( e ) {
	    var link = this;
	    $( link ).closest( '.product' ).find( '.cart-loading' ).find( 'i' ).hide().removeClass( 'icon-check' ).addClass( 'icon-refresh' ).fadeIn();
	    $( this ).closest( '.product' ).find( '.cart-loading' ).css( 'display', 'block' );
	    $( this ).closest( '.product' ).find( '.cart-loading' ).fadeIn();
	    setTimeout( function () {
		$( link ).closest( '.product' ).find( '.cart-loading' ).find( 'i' ).hide().removeClass( 'icon-refresh' ).addClass( 'icon-check' ).fadeIn();
		setTimeout( function () {
		    $( link ).closest( '.product' ).find( '.cart-loading' ).fadeOut();
		}, 2500 );
	    }, 2500 );
	} );

    } );

    //General JS
    $( 'a[href*="#"]' ).not( '[href="#"]' ).not( '[href="#0"]' ).click( function ( event ) {
	if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
	    var target = $( this.hash );
	    target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
	    if ( target.length ) {
		event.preventDefault();
		$( 'html, body' ).animate( {
		    scrollTop: target.offset().top
		}, 600, function () {
		    var $target = $( target );
		    $target.focus();
		    if ( $target.is( ":focus" ) ) {
			return false;
		    } else {
			$target.attr( 'tabindex', '-1' );
			$target.focus();
		    }
		    ;
		} );
	    }
	}
    } );


//Header Cart Update JS
    $.HandleElement = $.HandleElement || { };
    $.HandleElement.daydream_header_cart = function () {
	$( "#open-cart, #cart-toggle" ).live( "click", function () {
	    return $( "body" ).toggleClass( "off-canvas-cart-open" ), false;
	} );
	$( document ).live( "click", function ( b ) {
	    var a = $( ".off-canvas-cart" );
	    if ( !( a.is( b.target ) || 0 !== a.has( b.target ).length ) ) {
		$( "body" ).removeClass( "off-canvas-cart-open" );
	    }
	} );

    };

    $.HandleElement.init = function () {
	$.HandleElement.daydream_header_cart();
    };

    $( document ).ready( $.HandleElement.init );

}( jQuery );

