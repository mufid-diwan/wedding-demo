(function($){
	$(document).ready(function(){
		"use strict";
		
		var nav = $('#nav');
		var content = $('#main_content');
		
		nav.find('a').click(function(e){
			var alink = $(this),
			current_section_id = alink.attr('href');
			
			nav.find('.nav-item').removeClass('active');
			nav.find('.sub-nav-item').removeClass('active');
			
			if(current_section_id.length > 0){
				active_menu(current_section_id);
				scroll_to_section(current_section_id);
			}
			
			if ($(window).width() < 768) {
				$('body').toggleClass('open-sidebar');
			}
			
		});
		
		if( window.location.hash && window.location.hash != '#' ){
			
			var current_section_id = $.trim(window.location.hash);
			if($(current_section_id).length > 0){
				active_menu(current_section_id);
				scroll_to_section(current_section_id);
			}
		}
		
		$('.scrollto').bind('click', function(e){
			var current_section_id = $.trim($(this).attr('href'));
			if($(current_section_id).length > 0){
				active_menu(current_section_id);
				scroll_to_section(current_section_id);
			}
		});
		
		$('.srolldown').bind('click', function(e){
			var current_section_id = $.trim($(this).attr('href'));
			
			if($(current_section_id).length > 0){
				$.smoothScroll({
					scrollTarget: current_section_id,
					speed: 500,
					offset: -50
				});
			}
			
			return false;
		});
		
		
		/*=== INIT, LAZY LOAD & POPUP IMAGE ===*/
		calc_top_header_height();
		
		$('.popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom'			
		});
		
		$("a.popup img, img.lazy").lazyload({
			effect : "fadeIn",
			failure_limit : 10,
			threshold: 0,
	        event: "scroll mouseover click",
	        placeholder: 'assets/images/site/image-loading.gif'
	        
		});
		
		/*=== FAQs Accordion ===
		$(".cata-accordion > .acc-item:eq(0) h5").addClass("active").next().slideDown();*/
		$(".cata-accordion h5").click(function(j) {
			var _this = $(this),
			dropDown = _this.closest(".acc-item").find(".acc-content");

			_this.closest(".cata-accordion").find(".acc-content").not(dropDown).slideUp();

		    if (_this.hasClass("active")) {
		    	_this.removeClass("active");
		    } else {
		    	_this.closest(".cata-accordion").find("h5.active").removeClass("active");
		    	_this.addClass("active");
		    }

	    	dropDown.stop(false, true).slideToggle();
	    	j.preventDefault();
		});
	  
		/*=== WINDOW RESIZE EVENT ===*/		
		$(window).bind('load', function(){
			toggle_menu_event();
			$('.loading-wrapper').fadeOut();
		});
		
		$(window).bind('resize', function(){
			calc_top_header_height();
			
			if ($(window).width() >= 768) {
				$('body').removeClass('open-sidebar');
				$('html').css('overflow', 'visible');
			}
		});
		
		/*=== HANDLE EXTERNAL LINKS IN NEW WINDOW ===*/
		$('a[href^=http]').bind('click',function(){
			window.open($(this).attr('href'));
			return false;
		});
		
		
		/*=== FUNCTIONS ===*/
		function active_menu(current_section_id){
			
			var alink = nav.find('a[href="' + current_section_id + '"]');
			if( alink.hasClass('main-nav-item') ){ /*Parent*/
				var liparent = alink.parent();
				if(liparent.find('.sub-nav').length > 0){
					liparent.find('.sub-nav').slideToggle(function(){
						liparent.toggleClass('active');
					});
				}else{
					liparent.toggleClass('active');
				}
				
			}else{ /*Children*/
				alink.addClass('active');
				alink.closest('.sub-nav').show();
				alink.closest('.nav-item').addClass('active');
			}
		}
		
		function scroll_to_section(current_section_id){
			content.children('section').hide();
			content.find(current_section_id).fadeIn();
			$.smoothScroll({
				scrollTarget: 'body',
				speed: 1000,
				offset: 0
			});
			
			current_section_id = current_section_id.substring(1);
			set_location_hash( current_section_id );
		}
		function set_location_hash( hash ){
			if( hash && hash != '#' ){
				if( history.pushState && location.protocol != 'file:' ){
					history.pushState(null, null, "#" +hash);
				}
				else{
					location.hash = hash;
				}
			}
		}
		function get_location_hash(){
			if( location.hash ){
				return location.hash.replace('#', '');
			}
			return '';
		}
		
		function calc_top_header_height(){
			var top_header = $('#nav');
			top_header.height( $(window).height() - 100 );
		}
		
		function toggle_menu_event(){
			$('#toggle-sidebar').on('click', function () {
				$('body').toggleClass('open-sidebar');
				if ($('body').hasClass('open-sidebar')) {
					 $('html').css('overflow', 'hidden');
				}else{
					  $('html').css('overflow', 'visible');
				}
			});
		}
		
		$.fn.clickToggle = function(func1, func2) {
	        var funcs = [func1, func2];
	        this.data('toggleclicked', 0);
	        this.click(function() {
	            var data = $(this).data();
	            var tc = data.toggleclicked;
	            $.proxy(funcs[tc], this)();
	            data.toggleclicked = (tc + 1) % 2;
	        });
	        return this;
	    };
		
	});
})(jQuery);
	

	
