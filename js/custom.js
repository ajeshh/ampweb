/*
* Theme Name: Tyger
* File name: custom.js
* Theme URL: tyger.mordorthemes.com
* Description: Tyger - Beautiful onepage template
* Author: Mordorthemes
* Author URL: http://www.mordorthemes.com
* Support: support@mordorthemes.com
* Version: 1.0
*/



/* ==============================================
	Start window load function strict mode
=============================================== */
$(window).on("load", function () {
	'use strict';

	/* preloader */
	$("#loader").delay(500).fadeOut(); 
	$(".mask").delay(1000).fadeOut("slow");

	/* parallax */
	$(window).stellar({
		responsive: true,
		horizontalScrolling:false,
		parallaxBackgrounds: true
	});

	var urlHash = window.location.href.split("#")[1];
	if (urlHash &&  $('#' + urlHash).length )
		$('html,body').animate({
			scrollTop: $('#' + urlHash).offset().top
		}, 900);
});




/* ==============================================
	Start ready function strict mode
=============================================== */
jQuery(document).ready(function($){

	use:"strict";



	// Sticky header
	$(function(){
		var shrinkHeader = 100;
		$(window).scroll(function() {
			var scroll = getCurrentScroll();
			if ( scroll >= shrinkHeader ) {
				$('header').addClass('shrink');
			}
			else {
				$('header').removeClass('shrink');
			}
		});
		function getCurrentScroll() {
			return window.pageYOffset || document.documentElement.scrollTop;
		}
	});



	// Tabs animation
	function tabsAnimation(tabs){
		var $this = $(tabs);
		var $link = $this.find('li > a');

		$this.find('.tabs-content').css('height', $this.find('.content.active').height());

		$link.on('click', function(){
			$this.find('.tabs-content').css('height',  $this.find( $(this).attr('href') ).height());
		});
	};
	tabsAnimation($('.tabs-container'));



	// Accordion	
	(function($) {
		$.fn.accordionAnimated = function() {

			var
			$accordion = this,
				$items = $accordion.find('> li'),
				$targets = $items.find('.content'),
				options = {
					active_class : 'active',  // class for items when active
					multi_expand: false,    // whether mutliple items can expand
					speed : 500,        // speed of animation
					toggleable: true      // setting to false only closes accordion panels when another is opened
				}
			;

			$.extend(options, Foundation.utils.data_options($accordion));

			$items.each(function(i) {
				$(this).find('a:eq(0)').on('click.accordion', function() {
					if(!options.toggleable && $items.eq(0).hasClass(options.active_class)) {
						return;
					}

					$targets.eq(i)
						.stop(true, true)
						.slideToggle(options.speed);

					if(!options.multi_expand) {
						$targets.not(':eq('+i+')')
							.stop(true, true)
							.slideUp(options.speed);
					}
				});
			});
		};
	}(jQuery)); 


	$('.accordion').accordionAnimated(); 



	// Animation on appear.js
	$('.animated').appear(function() {
		var elem = $(this);
		var animate = elem.data('animate');
		if ( !elem.hasClass('visible') ) {
			var animateDelay = elem.data('animate-delay');
			if ( animateDelay ) {
				setTimeout(function(){
					elem.addClass( animate + " visible" );
				}, animateDelay);
			} else {
				elem.addClass( animate + " visible" );
			}
		}
	});



	// Navigation
	$.daisyNav();

	$('.menu-list a').click(function(){	
		$('ul#navigation').removeClass( 'show-for-devices' );
		$('.menu-toggle-button').removeClass( 'active' )
	});	




	// Fading main slider
	var page_title = $('body');
	var intro = page_title.find('#slider');
	if( intro.length > 0 ) var intro_top = intro.offset().top;  
	$( window ).scroll(function() {
		var current_top = $(document).scrollTop(); 
		var intro_height = $('#slider').height();  
		intro.css('top', (current_top*0.50)); 
		intro.css('opacity', (1 - current_top/intro_height*1.2));
	});

	$("#slider").owlCarousel({
		transitionStyle: "fade",
		slideSpeed: 350,
		singleItem: true,
		autoHeight: true,
		pagination: true,
		autoPlay: 5000,
		navigation: false,
		afterMove: function(){
			$('[data-caption-animate]').each(function(){
				var $toAnimateElement = $(this);
				var toAnimateDelay = $(this).attr('data-caption-delay');
				var toAnimateDelayTime = 0;
				if( toAnimateDelay ) { toAnimateDelayTime = Number( toAnimateDelay ) + 750; } else { toAnimateDelayTime = 750; }
				if( !$toAnimateElement.hasClass('animated') ) {
					$toAnimateElement.addClass('not-animated');
					var elementAnimation = $toAnimateElement.attr('data-caption-animate');
					setTimeout(function() {
						$toAnimateElement.removeClass('not-animated').addClass( elementAnimation + ' animated');
					}, toAnimateDelayTime);
				}
			});
		}, 

		beforeMove: function(){
			$('[data-caption-animate]').each(function(){
				var $toAnimateElement = $(this);
				var elementAnimation = $toAnimateElement.attr('data-caption-animate');
				$toAnimateElement.removeClass('animated').removeClass(elementAnimation).addClass('not-animated');
			});
		},

		afterAction: function(){
			$('[data-caption-animate]').each(function(){
				var $toAnimateElement = $(this);
				var toAnimateDelay = $(this).attr('data-caption-delay');
				var toAnimateDelayTime = 0;
				if( toAnimateDelay ) { toAnimateDelayTime = Number( toAnimateDelay ) + 300; } else { toAnimateDelayTime = 300; }
				if( !$toAnimateElement.hasClass('animated') ) {
					$toAnimateElement.addClass('not-animated');
					var elementAnimation = $toAnimateElement.attr('data-caption-animate');
					setTimeout(function() {
						$toAnimateElement.removeClass('not-animated').addClass( elementAnimation + ' animated');
					}, toAnimateDelayTime);
				}
			});
		}
	});




	/* Clients Carousel */
	$("#clients-slider").owlCarousel({
		navigation : false,
		slideSpeed : 300,
		pagination: true,
		paginationSpeed : 400,
		autoPlay: 4000,
		responsive:true,
		items : 5, //10 items above 1000px browser width
		itemsDesktop : [1000,2], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,4], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		itemsMobile : 1// itemsMobile disabled - inherit from itemsTablet option
	}); 




	/* Testimonial Carousel */
	$("#testimonial-slider").owlCarousel({
		navigation : false,
		slideSpeed : 300,
		pagination: false,
		paginationSpeed : 400,
		autoHeight: true,
		autoPlay: true,
		transitionStyle : "backSlide",
		singleItem : true,
	});




	/*Portfolio Carousel */
	$("#portfolio-carousel").owlCarousel({
		navigation : false,
		slideSpeed : 300,
		pagination: true,
		paginationSpeed : 400,
		autoPlay: false,
		items : 5, //10 items above 1000px browser width
		itemsDesktop : [1000,5], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,3], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		itemsMobile : 2 // itemsMobile disabled - inherit from itemsTablet option
	});	    





	/* Gallery on portfolio detail */
	// AJAX project slider
	$(document).ajaxComplete(function(){
		$("#project-gallery").owlCarousel({
			autoPlay : true,
			singleItem : true,
			pagination: false,
			navigation: true,
			navigationText: ["<i class='icon tyger-chevron-left-1 '></i>", "<i class='icon tyger-chevron-right-1 '></i>"]
		});
	});





	/* Gallery on blog */
	$("#blog-gallery").owlCarousel({
		navigation : true,
		navigationText: ["<i class='icon tyger-chevron-left-1 '></i>", "<i class='icon tyger-chevron-right-1 '></i>"],
		slideSpeed : 300,
		pagination: false,
		paginationSpeed : 400,
		autoPlay: false,
		singleItem : true,
	});




});
/* end ready function */



/*********************************
   CUBEPORTFOLIO SETTINGS FOR SERVICES, TEAM AND PORTFOLIO
*********************************/

/* TEAM SLIDER */
(function($, window, document, undefined) {
	
	'use strict';

	var gridContainer = $('#team-slider'),
		filtersContainer = $('#filters-container'),
		wrap, filtersCallback;

	gridContainer.cubeportfolio({
		layoutMode: 'slider',
		drag: true,
		auto: false,
		autoTimeout: 5000,
		autoPauseOnHover: true,
		showNavigation: false,
		showPagination: true,
		rewindNav: true,
		scrollByPage: true,
		gridAdjustment: 'responsive',
		mediaQueries: [{
			width: 800,
			cols: 3
		}, {
			width: 500,
			cols: 2
		}, {
			width: 320,
			cols: 1
		}],
		gapHorizontal: 0,
		gapVertical: 30,
		caption: '',
		displayType: 'lazyLoading',
		displayTypeSpeed: 100,

		// lightbox
		lightboxDelegate: '.cbp-lightbox',
		lightboxGallery: true,
		lightboxTitleSrc: 'data-title',
		lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

		// singlePage popup
		singlePageDelegate: '.cbp-singlePage',
		singlePageDeeplinking: true,
		singlePageStickyNavigation: true,
		singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
		singlePageAnimation: 'fade',
		singlePageCallback: function(url, element) {
			// to update singlePage content use the following method: this.updateSinglePage(yourContent)
		},

		// single page inline
		singlePageInlineDelegate: '.cbp-singlePageInline',
		singlePageInlinePosition: 'above',
		singlePageInlineInFocus: true,
		singlePageInlineCallback: function(url, element) {
			// to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
		}
	});
	
	
	/* SERVICES */

	var gridContainer = $('#services-container'),
		filtersContainer = $('#services-filters'),
		wrap, filtersCallback;

	gridContainer.cubeportfolio({
		layoutMode: 'grid',
		rewindNav: true,
		scrollByPage: false,
		mediaQueries: [{
			width: 1100,
			cols: 3
		}, {
			width: 800,
			cols: 3
		}, {
			width: 500,
			cols: 2
		}, {
			width: 320,
			cols: 1
		}],
		defaultFilter: '*',
		animationType: 'rotateSides',
		gapHorizontal: 30,
		gapVertical: 30,
		gridAdjustment: 'responsive',
		caption: 'overlayBottomPush',
		displayType: 'sequentially',
		displayTypeSpeed: 100,


		// singlePageInline
		singlePageInlineDelegate: '.cbp-singlePageInline',
		singlePageInlinePosition: 'top',
		singlePageInlineInFocus: true,
		singlePageInlineCallback: function(url, element) {
			// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
			var t = this;

			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'html',
				timeout: 5000
			})
				.done(function(result) {

				t.updateSinglePageInline(result);

			})
				.fail(function() {
				t.updateSinglePageInline("Error! Please refresh the page!");
			});
		}
	});
		
	
	/* PORTFOLIO */


	var gridContainer = $('#grid-container'),
		filtersContainer = $('#filters-container'),
		wrap, filtersCallback;

	gridContainer.cubeportfolio({
		defaultFilter: '*',
		animationType: 'fadeOutTop',
		gapHorizontal: 0,
		gapVertical: 0,
		gridAdjustment: 'responsive',
		mediaQueries: [{
			width: 1600,
			cols: 4
		},{
			width: 1200,
			cols: 4
		}, {
			width: 800,
			cols: 3
		}, {
			width: 500,
			cols: 2
		}, {
			width: 320,
			cols: 1
		}],
		caption: 'zoom',
		displayType: 'lazyLoading',
		displayTypeSpeed: 100,

		// lightbox
		lightboxDelegate: '.cbp-lightbox',
		lightboxGallery: true,
		lightboxTitleSrc: 'data-title',
		lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

		// singlePage popup
		singlePageDelegate: '.cbp-singlePage',
		singlePageDeeplinking: true,
		singlePageAnimation: 'fade',
		singlePageStickyNavigation: true,
		singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
		singlePageCallback: function(url, element) {
			// to update singlePage content use the following method: this.updateSinglePage(yourContent)
			var t = this;
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'html',
				timeout: 5000
			})
				.done(function(result) {
				t.updateSinglePage(result);
			})
				.fail(function() {
				t.updateSinglePage("Error! Please refresh the page!");
			});
		},

		// singlePageInline
		singlePageInlineDelegate: '.cbp-singlePageInline',
		singlePageInlinePosition: 'above',
		singlePageInlineInFocus: true,
		singlePageInlineCallback: function(url, element) {
			// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
		}
	});


	/*********************************
        add listener for filters
     *********************************/
	if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
		wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');

		wrap.on({
			'mouseover.cbp': function() {
				wrap.addClass('cbp-l-filters-dropdownWrap-open');
			},
			'mouseleave.cbp': function() {
				wrap.removeClass('cbp-l-filters-dropdownWrap-open');
			}
		});

		filtersCallback = function(me) {
			wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
			wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
			me.addClass('cbp-filter-item-active');
			wrap.trigger('mouseleave.cbp');
		};
	} else {
		filtersCallback = function(me) {
			me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
		};
	}

	filtersContainer.on('click.cbp', '.cbp-filter-item', function() {
		var me = $(this);

		if (me.hasClass('cbp-filter-item-active')) {
			return;
		}

		// get cubeportfolio data and check if is still animating (reposition) the items.
		if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
			filtersCallback.call(null, me);
		}

		// filter the items
		gridContainer.cubeportfolio('filter', me.data('filter'), function() {});
	});


	/*********************************
        activate counter for filters
     *********************************/
	gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'), function() {
		// read from url and change filter active
		var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
			item;
		if (match !== null) {
			item = filtersContainer.find('.cbp-filter-item').filter('[data-filter="' + match[1] + '"]');
			if (item.length) {
				filtersCallback.call(null, item);
			}
		}
	});




	// when the height of grid is changed
	gridContainer.on('filterComplete.cbp', function() {
		//  loadMoreObject.window.trigger('scroll.loadMoreObject');
	});
	
	

})(jQuery, window, document);
/* END CUBEPORTFOLIO SETINGS */


/* ==============================================
  Google Map
=============================================== */ 
function initialize() {
	var myLatLng = new google.maps.LatLng(43.7726657,11.2043491);
	var roadAtlasStyles = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}];

	var mapOptions = {
		zoom: 16,
		center: myLatLng,
		disableDefaultUI: true,
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: true,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
		}
	};

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);


	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: 'img/pin.png',
		title: '',
	});

	var contentString = '<div style="max-width: 300px" id="content">'+
		'<div id="bodyContent">'+
		'<h4>Jonathan Doe</h4>' +
		'<p style="font-size: 12px">12, Segun Bagicha, 10th floor, Dhaka, Bangladesh. Lorem ipsum dolor sit amet incididunt ut labore et dolore psum dolor magna aliqua.</p>'+
		'</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

	var styledMapOptions = {
		name: 'US Road Atlas'
	};

	var usRoadMapType = new google.maps.StyledMapType(
		roadAtlasStyles, styledMapOptions);

	map.mapTypes.set('roadatlas', usRoadMapType);
	map.setMapTypeId('roadatlas');
}

google.maps.event.addDomListener(window, "load", initialize);
// ========== END GOOGLE MAP ========== //





/* ==============================================
	Main Slider Full Height
=============================================== */
var windowHeight = $(window).height();
$('#slider .slider-cont').height( windowHeight );
$('#slider .slider-cont.mvisible').height( windowHeight - 80 ); // add blog class to hero in order to show menu
if( !device.tablet() && !device.mobile() ) {
	$('#slider .slider-cont-single').height( windowHeight / 2 );
} 
else {
	$('#slider .slider-cont-single').height( windowHeight );
}

$(window).resize(function() {
	var windowHeight = $(window).height();
	$('#slider .slider-cont').height( windowHeight );
	$('#slider .slider-cont.mvisible').height( windowHeight - 80 ); // add blog class to hero in order to show menu
	if( !device.tablet() && !device.mobile() ) {
		$('#slider .slider-cont-single').height( windowHeight / 2 );
	}

	else {
		$('#slider .slider-cont-single').height( windowHeight );
	}
});




/* ==============================================
  Counter
=============================================== */  
jQuery(function() {

	$(".counter").appear(function(){
		$(this).each(function(){
			dataperc = $(this).attr("data-perc"),
				$(this).find(".number").delay(6000).countTo({
				from: 50,
				to: dataperc,
				speed: 3000,
				refreshInterval: 50,

			});  
		});
	});
});
(function($) {
	$.fn.countTo = function(options) {
		// merge the default plugin settings with the custom options
		options = $.extend({}, $.fn.countTo.defaults, options || {});

		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(options.speed / options.refreshInterval),
			increment = (options.to - options.from) / loops;

		return $(this).each(function() {
			var _this = this,
				loopCount = 0,
				value = options.from,
				interval = setInterval(updateTimer, options.refreshInterval);

			function updateTimer() {
				value += increment;
				loopCount++;
				$(_this).html(value.toFixed(options.decimals));

				if (typeof(options.onUpdate) == 'function') {
					options.onUpdate.call(_this, value);
				}

				if (loopCount >= loops) {
					clearInterval(interval);
					value = options.to;

					if (typeof(options.onComplete) == 'function') {
						options.onComplete.call(_this, value);
					}
				}
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,  // the number the element should start at
		to: 100,  // the number the element should end at
		speed: 1000,  // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,  // the number of decimal places to show
		onUpdate: null,  // callback method for every time the element is updated,
		onComplete: null,  // callback method for when the element finishes updating
	};
})(jQuery);





/* ==============================================
    Contact Form
=============================================== */
$('#contactform').submit(function(){

	'use strict';

	var action = $(this).attr('action');

	$("#message").slideUp(300,function() {
		$('#message').hide();

		$('#submit')
			.after('<img src="img/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');

		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			comments: $('#comments').val()
		},
			   function(data){
			document.getElementById('message').innerHTML = data;
			$('#message').slideDown(300);
			$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
			$('#submit').removeAttr('disabled');
			if(data.match('success') != null) $('#contactform').slideUp('slow');

		}
			  );

	});

	return false;

});


