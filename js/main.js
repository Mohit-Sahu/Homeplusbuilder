(function($) {
	
	'use strict';
	
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	var menuLoop = '',
	menuOpen = false,
	menuHover = true,
	activeMap = '',
	latLong = '',
	gMapActive = false;
	
	$(document).ready(function(e) {
		
		// global
		var Modernizr = window.Modernizr;
		
		// support for CSS Transitions & transforms
		var support = Modernizr.csstransitions && Modernizr.csstransforms;
		var support3d = Modernizr.csstransforms3d;
		// transition end event name and transform name
		// transition end event name
		var transEndEventNames = {
								'WebkitTransition' : 'webkitTransitionEnd',
								'MozTransition' : 'transitionend',
								'OTransition' : 'oTransitionEnd',
								'msTransition' : 'MSTransitionEnd',
								'transition' : 'transitionend'
							},
		transformNames = {
						'WebkitTransform' : '-webkit-transform',
						'MozTransform' : '-moz-transform',
						'OTransform' : '-o-transform',
						'msTransform' : '-ms-transform',
						'transform' : 'transform'
					};
					
		if( support ) {
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.PMMain';
			this.transformName = transformNames[ Modernizr.prefixed( 'transform' ) ];
			//console.log('this.transformName = ' + this.transformName);
		}

		runParallax();
		
		
	/* ==========================================================================
	   Page preloader
	   ========================================================================== */
		
		function preloadShow() {
			
			// Setup HTML
			if($('.preloader')) {
				$('.preloader').remove();
			}
			
			var preloader = '<div class="preloader"><div class="top"></div><div class="bottom"></div><div class="logo">' + ("undefined" === typeof $('body').attr('data-preloadable-logo') ? 'Logo' : $('body').attr('data-preloadable-logo')) + '</div><div class="percent">0%</div></div>';
			
			$('body').append(preloader);
			var $preloader = $('.preloader');
	
			// Attach image loaded callback
			var $images     = $('img');
			if(0 < $images.length) {
				var current = 0;
				var total   = $images.length;
				$images.imgpreload({each: function() {
					var percent = Math.round((++current / total) * 100);
					$preloader.find('.percent').html(percent + '%');
					$preloader.find('.bar .value').width(percent + '%');
					if(100 === percent) {
						setTimeout(preloadHide, 1000);
					}
				}});
			}
		}
		function preloadHide() {
			// Skip if no preloader
			var $preloader  = $('.preloader');
			if(0 === $preloader.length) {
				return;
			}
	
			// Remove the preloader
			$preloader.find('.logo, .bar, .percent').css('opacity', 0);
			setTimeout(function() {
				$preloader.find('.top, .bottom').css('height', 0);
			}, 500);
			setTimeout(function() {
				$preloader.remove();
				$('body').triggerHandler('preload-removed');
			}, 1000);
		}
		
		
		if($('body').is('.preloadable')) {
			$('body').removeClass('preloadable');
			preloadShow();
			var preloadTimeout = setTimeout(preloadHide, 5000);
			$('body').on('preload-removed', function() {
				clearTimeout(preloadTimeout);
			});
		}
		
	/* ==========================================================================
	   Initialize Twitterfetch
	   ========================================================================== */
	   /*if( typeof twitterFetcher != 'undefined'  ){
		   //Update the '330034190164819968' with your Twitter widget ID number. Instructions can be found here -> http://www.dezzain.com/tutorials/easy-twitter-feeds-with-javascript/
		   twitterFetcher.fetch( '330034190164819968', 'pm-twitter-news', 3, true, false, false, 'default'); 
	   }*/
	   
	   
	   if( typeof twitterFetcher != 'undefined'  ){
			
			
			var configProfile = {
			  "profile": {"screenName": 'Micro_Themes_WP'},
			  "domId": 'pm-twitter-news',
			  "maxTweets": 2,
			  "enableLinks": true, 
			  "showUser": false,
			  "showTime": false,
			  "showImages": false,
			  "lang": 'en'
			};
			
			twitterFetcher.fetch(configProfile);
		   
	   }
	   
	   
		
	/* ==========================================================================
	   Initialize animations
	   ========================================================================== */
		animateMilestones();
		animateProgressBars();
		animatePieCharts();
		setDimensionsPieCharts();
		
		
	/* ==========================================================================
	   Initialize WOW plugin for element animations
	   ========================================================================== */
		if( $(window).width() > 991 ){
			new WOW().init();
		}
		
	/* ==========================================================================
	   setDimensionsPieCharts
	   ========================================================================== */
		
		function setDimensionsPieCharts() {
	
			$(".pm-pie-chart").each(function() {
	
				var $t = $(this);
				var n = $t.parent().width();
				var r = $t.attr("data-barSize");
				
				if (n < r) {
					r = n;
				}
				
				$t.css("height", r);
				$t.css("width", r);
				$t.css("line-height", r + "px");
				
				$t.find("i").css({
					"line-height": r + "px",
					"font-size": r / 3
				});
				
			});
	
		}
		
	/* ==========================================================================
	   Like boxes
	   ========================================================================== */
	   
	   if( $('.meta-like', 'article').length > 0 ){
			 
			 $('.meta-like', 'article').each(function(index, element) {
           
		   		var $this = $(element),
				btn = $this.find('a'),
				span = $this.find('span');
				
				btn.on('click', function(e) {
										
					e.preventDefault();
					
					var currentValue = span.text(),
					//intValue = parseInt(span.text(), 10),
					newValue = parseInt(currentValue, 10)  + 1; //Specify 10 for the radix (decimal numeral system commonly used by humans);
										
					span.html(newValue);
					
					//Save value into database
					
				});
		    
           });
			   
	   }
	   
	   if( $('.pm-single-post-like-feature', '#pm-single-post-social-features').length > 0 ){
			 
			 $('.pm-single-post-like-feature', '#pm-single-post-social-features').each(function(index, element) {
           
		   		var $this = $(element),
				btn = $this.find('a'),
				span = $this.find('span');
				
				btn.on('click', function(e) {
										
					e.preventDefault();
					
					var currentValue = span.text(),
					//intValue = parseInt(span.text(), 10),
					newValue = parseInt(currentValue, 10)  + 1; //Specify 10 for the radix (decimal numeral system commonly used by humans);
										
					span.html(newValue + ' Likes');
					
					//Save value into database
					
				});
		    
           });
			   
	   }
	   
	   
		
	/* ==========================================================================
	   Conact page google map interaction
	   ========================================================================== */
	   if( $("#pm-contact-google-map-container").length > 0 ){
			
			var $btn = $('#pm-contact-google-map-reset');
			
			//Retrieve data and initialize map on load
			var mapURL = $btn.data("logo-url"),
			mapPhone = $btn.data("phone"),
			mapAddress = $btn.data("address"),
			mapLatitude = $btn.data("gmap-latitude"),
			mapLongitude = $btn.data("gmap-longitude");
			
			var mapMessage = '<div class="pm-google-map-info-window"><img src="'+mapURL+'" alt="Logo" /><p>'+mapAddress+'</p></div>';
					
			//Load google map
			methods.initializeGoogleMap('pm-contact-google-map-loader', mapLatitude, mapLongitude, mapMessage);
			
			$btn.on('click', function(e) {
				
				e.preventDefault();
				
				methods.initializeGoogleMap('pm-contact-google-map-loader', mapLatitude, mapLongitude, mapMessage);
				
			});
			
			
			
	   }
		
	/* ==========================================================================
	   Agencies google map interaction
	   ========================================================================== */
	   if( $("#pm-agencies-posts-list").length > 0 ){
		   
		   //Initialize first map
		   var defaultMap = $('.pm-agencies-list-title-btn:eq(0)', '#pm-agencies-posts-list');
		   
		   //Retrieve data
			var defaultMapURL = defaultMap.data("logo-url"),
			defaultMapPhone = defaultMap.data("phone"),
			defaultMapAddress = defaultMap.data("address"),
			defaultMapLatitude = defaultMap.data("gmap-latitude"),
			defaultMapLongitude = defaultMap.data("gmap-longitude");
			
			var defaultMapMessage = '<div class="pm-google-map-info-window"><img src="'+defaultMapURL+'" alt="Logo" /><p>'+defaultMapAddress+'</p></div>';
					
			//Load google map
			methods.initializeGoogleMap('pm-agencies-gmap-container', defaultMapLatitude, defaultMapLongitude, defaultMapMessage);
			
		   
		   $('.pm-agencies-list-title-btn', '#pm-agencies-posts-list').each(function(index, element) {
           
		   		var $this = $(element);
				
				$this.on('click', function(e) {
					
					e.preventDefault();
					
					//Retrieve data
					var logoURL = $(this).data("logo-url"),
					phone = $(this).data("phone"),
					address = $(this).data("address"),
					latitude = $(this).data("gmap-latitude"),
					longitude = $(this).data("gmap-longitude");
					
					var message = '<div class="pm-google-map-info-window"><img src="'+logoURL+'" alt="Logo" /><p>'+address+'</p></div>';
					
					//Load google map
					methods.initializeGoogleMap('pm-agencies-gmap-container',latitude, longitude,message);
					
					if( $(window).width() < 992 ){
						
						$('html, body').animate({
							scrollTop: $('#pm-agencies-gmap-container').offset().top - 80
						}, 1000);
						
					}
					
					
				});
		    
           });
		   
	   }
		
		
	/* ==========================================================================
	   Property filter selections
	   ========================================================================== */
	   if( $("#pm-property-filter-container").length > 0 ){
		   
		   //Retrieve lists
		   var status = $('#pm-property-filter-status-list'),
		   location = $('#pm-property-filter-location-list'),
		   type = $('#pm-property-filter-type-list');
		   
		   //Retrieve targets
		   var statusContainer = $('#pm-property-filter-property-status').find('.pm-menu-title'),
		   locationContainer = $('#pm-property-filter-location').find('.pm-menu-title'),
		   typeContainer = $('#pm-property-filter-property-type').find('.pm-menu-title');
		   
		   //Activate status list
		   status.children().each(function(i,e) {
						
			   //add click functionality
			   $(e).find('a').on('click', function(e) {
				
					e.preventDefault();
					
					var data = $(this).data("property-status");
					
					statusContainer.html('Property status: ' + data);
					
				});
							
				
			});//end of Activate status list
			
			
		   //Activate location list
		   location.children().each(function(i,e) {
						
			   //add click functionality
			   $(e).find('a').on('click', function(e) {
				
					e.preventDefault();
					
					var data = $(this).data("country");
					
					locationContainer.html('Location: ' + data);
					
				});
							
				
			});//end of Activate location list
			
			
		   //Activate location list
		   type.children().each(function(i,e) {
						
			   //add click functionality
			   $(e).find('a').on('click', function(e) {
				
					e.preventDefault();
					
					var data = $(this).data("property-type");
					
					typeContainer.html('Property Type: ' + data);
					
				});
							
				
			});//end of Activate status list
		   
		   
	   }
		
		
	/* ==========================================================================
	   Property filter price range slider (widget)
	   ========================================================================== */
	   
	   if( $("#pm-slider-range").length > 0 ){
		   
		   $("#pm-slider-range").slider({
			  range: true,
			  min: 50000,
			  max: 5000000,
			  values: [ 50000, 5000000 ],
			  slide: function( event, ui ) {
				$( "#pm-amount-slider" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			  }
			});
			$( "#pm-amount-slider" ).val( "$" + $( "#pm-slider-range" ).slider( "values", 0 ) +" - $" + $( "#pm-slider-range" ).slider( "values", 1 ) );
		   
	   }
	   
		
		
	/* ==========================================================================
	   animatePieCharts
	   ========================================================================== */
	
		function animatePieCharts() {
	
			if(typeof $.fn.easyPieChart != 'undefined'){
	
				$(".pm-pie-chart:in-viewport").each(function() {
		
					var $t = $(this);
					var n = $t.parent().width();
					var r = $t.attr("data-barSize");
					
					if (n < r) {
						r = n;
					}
					
					$t.easyPieChart({
						animate: 1300,
						lineCap: "square",
						lineWidth: $t.attr("data-lineWidth"),
						size: r,
						barColor: $t.attr("data-barColor"),
						trackColor: $t.attr("data-trackColor"),
						scaleColor: "transparent",
						onStep: function(from, to, percent) {
							$(this.el).find('.pm-pie-chart-percent span').text(Math.round(percent));
						}
		
					});
					
				});
				
			}
	
		}
		
		
	/* ==========================================================================
	   Mobile Menu trigger
	   ========================================================================== */
		$('.pm-mobile-menu-trigger').on('click', function(e) {
			
			if( !menuOpen ){
				
				menuOpen = true;
				$('body').removeClass('menu-collapsed').addClass('menu-opened');
				$('#pm-mobile-menu-overlay').addClass('active');
				
				//Show the neccessary menu
				$('.pm-mobile-global-menu-container', '#pm-mobile-global-menu').addClass('active');
				
				//Hide other menus
				$('.pm-mobile-global-sign-in-container', '#pm-mobile-global-menu').removeClass('active');
				$('.pm-mobile-global-registration-container', '#pm-mobile-global-menu').removeClass('active');
				
				methods.activateCloseMenuBtn();
				
			} 
			
			e.preventDefault();
			
		});
		
		$('.pm-mobile-login-trigger').on('click', function(e) {
			
			if( !menuOpen ){
				
				menuOpen = true;
				$('body').removeClass('menu-collapsed').addClass('menu-opened');
				$('#pm-mobile-menu-overlay').addClass('active');
				
				//Show the neccessary menu
				$('.pm-mobile-global-sign-in-container', '#pm-mobile-global-menu').addClass('active');
				
				//Hide other menus
				$('.pm-mobile-global-menu-container', '#pm-mobile-global-menu').removeClass('active');
				$('.pm-mobile-global-registration-container', '#pm-mobile-global-menu').removeClass('active');
				
				methods.activateCloseMenuBtn();
				
			} 
			
			e.preventDefault();
			
		});
		
		
		$('.pm-mobile-registration-trigger').on('click', function(e) {
			
			if( !menuOpen ){
				
				menuOpen = true;
				$('body').removeClass('menu-collapsed').addClass('menu-opened');
				$('#pm-mobile-menu-overlay').addClass('active');
				
				//Show the neccessary menu
				$('.pm-mobile-global-registration-container', '#pm-mobile-global-menu').addClass('active');
				
				//Hide other menus
				$('.pm-mobile-global-sign-in-container', '#pm-mobile-global-menu').removeClass('active');
				$('.pm-mobile-global-menu-container', '#pm-mobile-global-menu').removeClass('active');
				
				
				methods.activateCloseMenuBtn();
				
			} 
			
			e.preventDefault();
			
		});
		
		$('#pm-mobile-menu-overlay').on('click', function(e) { 
						
			if( menuOpen ){
				menuOpen = false;
				$('body').removeClass('menu-opened').addClass('menu-collapsed');
				$('#pm-mobile-menu-overlay').removeClass('active');
				
				methods.hideCloseMenuBtn();
				
			}
			
			e.preventDefault();
			
		});
		
		
	/* ==========================================================================
	   Staff profile
	   ========================================================================== */
	   if( $(".pm-staff-profile-img-container").length > 0 ){
			   
			 $(".pm-staff-profile-img-container").each(function(index, element) {
                
				var $this = $(this),
				btn = $this.find('.pm-staff-profile-img-container-btn'),
				overlay = $this.find('.overlay'),
				info = $this.find('.pm-staff-profile-img-container-info');
				
				btn.on('click', function(e) {
					
					e.preventDefault(); 
					
					var icon = $(this).find('i');
					
					if( !$(this).hasClass('active') ){
						
						icon.removeClass('fa fa-chevron-up').addClass('fa fa-close');
						
						$(this).addClass('active');
						
						overlay.animate({
							'height' : '218px',
						}, 600, 'easeOutBounce');
						
						info.animate({
							'top' : '0px',
							'opacity' : 1
						}, 900, 'easeOutElastic');
						
					} else {
					
						icon.removeClass('fa fa-close').addClass('fa fa-chevron-up');
						
						$(this).removeClass('active');
						
						overlay.animate({
							'height' : '0px',
						}, 600, 'easeOutQuint');
						
						info.animate({
							'top' : '50px',
							'opacity' : 0
						}, 400, 'easeOutQuint');
						
					}
					
				});
				
             });
			   
	   }
	   
		
	/* ==========================================================================
	   Gallery Carousel
	   ========================================================================== */
	   
	   if( $("#pm-image-gallery").length > 0 ){
		   
		    var e = 100 / 6,
			f = Math.floor(3);
			
			$(".pm-image-gallery-item-hover-btn", "#pm-image-gallery").on('click', function(b) { //apply context for faster DOM parsing
				
				b.preventDefault();
				
				var $this = $(this);
				
				//Clear gmap if active
				if(gMapActive) {
				
					//Close the map first
					$('#pm-image-gallery-lightbox-gmap-container').empty().css({'background-color' : 'transparent'});
				
					gMapActive = false
					
					$('.pm-image-gallery-lightbox-info-container', '#pm-image-gallery-lightbox').animate({ //apply context for faster DOM parsing
						'right' : '0px' 
					},500,'easeInOutBack');
					
					$('.pm-image-gallery-lightbox-title-container', '#pm-image-gallery-lightbox').animate({ //apply context for faster DOM parsing
						'left' : '0px' 
					},500,'easeInOutBack');
					
				}
				
				//Capture values
				var postTitle = $(this).data("post-title"),
				salePrice = $(this).data("sale-price"),
				saleStatus = $(this).data("sale-status"),
				gmapLatitude = $(this).data("gmap-latitude"),
				gmapLongitude = $(this).data("gmap-longitude"),
				address = $(this).data("address");
								
				//Get target containers for values
				var titleContainer = $('#pm_image_gallery_title'),
				saleStatusContainer = $('#sale_status'),
				salePriceContainer = $('#sale_price'),
				mapBtn = $('#lightbox_map_btn');
				
				//Assign values
				titleContainer.html(postTitle);
				saleStatusContainer.html(saleStatus);
				salePriceContainer.html('$'+salePrice);
				mapBtn.data("gmap-latitude", gmapLatitude);
				mapBtn.data("gmap-longitude", gmapLongitude);
				mapBtn.data("address", address);
				
				//remove previous instances of active
				$(".pm-image-gallery-item-hover-btn", '#pm-image-gallery').removeClass('active');
				$('.pm-image-gallery-item-hover-btn-shadow', '#pm-image-gallery').removeClass('active');
				
				
				$this.addClass('active');
				$this.parent().find('.pm-image-gallery-item-hover-btn-shadow').addClass('active');
				
				
				//Calculate position of lightbox for desktop
				if( $(window).width() > 767 ){
					
					b = $("#pm-image-gallery-lightbox");
				
					var g = $("#pm-image-gallery-lightbox .inner"),
						c = $(this);
						
					c.outerWidth();
					
					var d = c.data("column"),
						c = c.data("big-image");
					d <= f ? b.css({
						left: e * d + "%"
					}) : b.css({
						left: Math.abs(e * (6 - d + 1) - 50) + "%"
					});
					
					//console.log(Math.abs(e * (6 - d + 1) - 50) + "%");
					
					g.css({
						"background-image": "url(" + c + ")"
					});
					
					b.addClass("visible");
					$("#pm-image-gallery").addClass("faded");
					
				} else {
				
					//remove active class on gallery image containers first
					$('.pm-image-gallery-image', '#pm-image-gallery').removeClass('active');
					
					//Get top position of image gallery container
					var index = $(this).data("index"),
					imgContainer = $('.pm-image-gallery-image:eq('+ index +')', '#pm-image-gallery'),
					topPositionOffset = imgContainer.offset().top,
					topPosition = imgContainer.position().top;
					
					
					b = $("#pm-image-gallery-lightbox");
					
					b.animate({
						top : topPosition,
						left : 0
					},500, 'easeInBack');
					
					var g = $("#pm-image-gallery-lightbox .inner"),
						c = $(this);
						
					var d = c.data("column"),
						c = c.data("big-image");
					
					g.css({
						"background-image": "url(" + c + ")"
					});
					
					b.addClass("visible");
					$("#pm-image-gallery").addClass("faded");
					
				}
				
				
			});
			
			$(".pm-image-gallery-close", '#pm-image-gallery-lightbox').on('click', function(b) {
				
				b.preventDefault();
				
				if(gMapActive) {
				
					//Close the map first
					$('#pm-image-gallery-lightbox-gmap-container').empty().css({'background-color' : 'transparent'});
				
					gMapActive = false;
					
					$('.pm-image-gallery-lightbox-info-container', '#pm-image-gallery-lightbox').animate({ 
						'right' : '0px' 
					},500,'easeInOutBack');
					
					$('.pm-image-gallery-lightbox-title-container', '#pm-image-gallery-lightbox').animate({ 
						'left' : '0px' 
					},500,'easeInOutBack');
					
				} else {
					
					//Close the gallery lightbox
					$("#pm-image-gallery").removeClass("faded");
					$("#pm-image-gallery-lightbox").removeClass("visible").css({
						left: ""
					});
					$(".pm-image-gallery-item-hover-btn", '#pm-image-gallery').removeClass('active');
					$('.pm-image-gallery-item-hover-btn-shadow', '#pm-image-gallery').removeClass('active');
					
				}
				
				
			})
			
			$('#lightbox_map_btn').on('click', function(e) {
				
				e.preventDefault();
				
				//Capture map co-ords
				var gmapLatitude = $(this).data("gmap-latitude"),
				gmapLongitude = $(this).data("gmap-longitude"),
				address = $(this).data("address"),
				container = 'pm-image-gallery-lightbox-gmap-container';
				
				$('.pm-image-gallery-lightbox-info-container', '#pm-image-gallery-lightbox').animate({ 
					'right' : '-450px' 
				},500,'easeInOutBack');
				
				$('.pm-image-gallery-lightbox-title-container', '#pm-image-gallery-lightbox').animate({ 
					'left' : '-450px' 
				},500,'easeInOutBack', function(e) {
					
					//Load map into container element
					methods.initializeGoogleMap(container, gmapLatitude, gmapLongitude, address);
										
					gMapActive = true;
					
				});
				
				
			});
			   
	   }
	   
	/* ==========================================================================
	   Property Post map toggle
	   ========================================================================== */
	   if( $('#pm-property-post-map-btn').length > 0 ){
		   
		   $('#pm-property-post-map-btn').on('click', function(e) {
				
				e.preventDefault();
				
				//Capture map co-ords
				var gmapLatitude = $(this).data("gmap-latitude"),
				gmapLongitude = $(this).data("gmap-longitude"),
				address = $(this).data("address"),
				container = 'pm-property-post-dynamic-content-container';
				
				if( !$(this).hasClass('active') ){
					
					$(this).addClass('active');
					$(this).html('Hide Map');
										
					//Load map into container element
					$('#'+container).addClass('active');
					methods.initializeGoogleMap(container, gmapLatitude, gmapLongitude, address);
					
					//Reset video if active
					$('#pm-property-post-video-container').removeClass('active');
					$('#pm-property-post-video-btn').removeClass('active');
					$('#pm-property-post-video-btn').html('View Video');
					
				} else {
				
					$(this).removeClass('active');
					$(this).html('View Map');
					$('#'+container).removeClass('active');
					
				}
				
			});
		   
	   }
	   
	/* ==========================================================================
	   Property Post video toggle
	   ========================================================================== */
	   if( $('#pm-property-post-video-btn').length > 0 ){
		   
		    $('#pm-property-post-video-btn').on('click', function(e) {
				
			   e.preventDefault();
		   
			   var container = 'pm-property-post-video-container';
			   
			   if( !$(this).hasClass('active') ){
						
					$(this).addClass('active');
					$(this).html('Hide Video');
										
					//Load map into container element
					$('#'+container).addClass('active');
					
					//Reset map if active
					$('#pm-property-post-dynamic-content-container').removeClass('active');
					$('#pm-property-post-map-btn').removeClass('active');
					$('#pm-property-post-map-btn').html('View Map');
					
				} else {
				
					$(this).removeClass('active');
					$(this).html('View Video');
					$('#'+container).removeClass('active');
					
				}
				
			});
		   
	   }
		
	
		
		
	/* ==========================================================================
	   animateMilestones
	   ========================================================================== */
	
		function animateMilestones() {
	
			$(".milestone:in-viewport").each(function() {
				
				var $t = $(this);
				var	n = $t.find(".milestone-value").attr("data-stop");
				var	r = parseInt($t.find(".milestone-value").attr("data-speed"), 10); //Specify 10 for the radix (decimal numeral system commonly used by humans)
					
				if (!$t.hasClass("already-animated")) {
					$t.addClass("already-animated");
					$({
						countNum: $t.find(".milestone-value").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".milestone-value").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".milestone-value").text(this.countNum);
						}
					});
				}
				
			});
	
		}
		
	/* ==========================================================================
	   animateProgressBars
	   ========================================================================== */
	
		function animateProgressBars() {
				
			$(".pm-progress-bar .pm-progress-bar-outer:in-viewport").each(function() {
				
				var $t = $(this),
				progressID = $t.attr('id'),
				numID = progressID.substr(progressID.lastIndexOf("-") + 1),
				targetDesc = '#pm-progress-bar-desc-' + numID,
				$target = $(targetDesc).find('span'),
				$diamond = $(targetDesc).find('.pm-progress-bar-diamond'),
				dataWidth = $t.attr("data-width");
												
				
				if (!$t.hasClass("already-animated")) {
					
					$t.addClass("already-animated");
					$t.animate({
						width: dataWidth + "%"
					}, 2000);
					$target.animate({
						"left" : dataWidth + "%",
						"opacity" : 1
					}, 2000);
					$diamond.animate({
						"left" : dataWidth + "%",
						"opacity" : 1
					}, 2000);
					
					$({
						countNum: 0 //start counter
					}).animate({
						countNum: dataWidth //end counter
					}, {
						duration: 1500,
						easing: "linear",
						step: function() {
							$target.text(Math.floor(this.countNum) + '%');
						},
						complete: function() {
							$target.text(this.countNum + '%');
						}
					});
						
				}
				
			});
	
		}
		
		
	/* ==========================================================================
	   Staff post item
	   ========================================================================== */
	   if( $(".pm-staff-profile-container").length > 0 ){
			
			$(".pm-staff-profile-container").each(function(index, element) {
				
				 var $this = $(element),
				 expandBtn = $this.find('.pm-staff-profile-expander'),
				 quoteBox = $this.find('.pm-staff-profile-quote'),
				 socialIcons = $this.find('.pm-staff-profile-icons'),
				 isActive = false;
				 
				 expandBtn.on('click', function(e) {
					 
					 e.preventDefault();
					 
					 if(!isActive){
						 
						 isActive = true
						 
						 expandBtn.removeClass('fa fa-plus').addClass('fa fa-close');
						 
						 quoteBox.css({
							'top' : 0
						 });
						 
						 socialIcons.css({
							'opacity' : 0,
							'right' : -70
						 });
						 
						 
					 } else {
						
						isActive = false;
						
						expandBtn.removeClass('fa fa-close').addClass('fa fa-plus');
						
						quoteBox.css({
							'top' : 290
						});
						 
						socialIcons.css({
							'opacity' : 1,
							'right' : 15
						});
						 
					 }
					 
					 
				 });				 
				
			});
			   
	   }
	   
			
		
	/* ==========================================================================
	   Testimonials carousel (homepage)
	   ========================================================================== */
	   if( $("#pm-testimonials-carousel").length > 0 ){
			  
			$("#pm-testimonials-carousel").PMTestimonials({
				speed : 500,
				slideShow : false,
				slideShowSpeed : 7000,
				controlNav : false,
				arrows : true	
			});
			   
	   }
		
	/* ==========================================================================
	   Brand carousel (homepage)
	   ========================================================================== */
	   if( $("#pm-brands-carousel").length > 0 ){
		   
		    var owl = $("#pm-brands-carousel");
			var isPlaying = false;
		   
		    owl.owlCarousel({
				
				items : 4, //10 items above 1000px browser width
				itemsDesktop : [5000,4],
				itemsDesktopSmall : [991,2],
				itemsTablet: [767,2],
				itemsTabletSmall: [720,1],
				itemsMobile : [320,1],
				
				//Pagination
				pagination : false,
				paginationNumbers: false,
				
		   });
		   
		    // Custom Navigation Events
			$(".pm-owl-next", '#pm-brand-carousel-btns').on('click', function(){
				owl.trigger('owl.next');
			})
			$(".pm-owl-prev", '#pm-brand-carousel-btns').on('click', function(){
				owl.trigger('owl.prev');
			})
			
				
			$("#pm-owl-play").on('click', function(){
				
				if(!isPlaying){
					isPlaying = true;
					$(this).removeClass('fa fa-play').addClass('fa fa-stop');
					owl.trigger('owl.play',3000); //owl.play event accept autoPlay speed as second parameter
				} else {
					isPlaying = false;
					$(this).removeClass('fa fa-stop').addClass('fa fa-play');
					owl.trigger('owl.stop');
				}
				
				
			});
			
			
				
		   
	   }
		
	/* ==========================================================================
	   Flexslider
	   ========================================================================== */
	   if( $("#pm-property-post-slider").length > 0 ){
		   
		   $("#pm-property-post-slider").flexslider({
				animation:"slide", 
				controlNav: false, 
				directionNav: true, 
				animationLoop: true, 
				slideshow: false, 
				arrows: true, 
				touch: false, 
				prevText : "", 
				nextText : "",
				/*start : function() {
					$('.flex-direction-nav').find('li').eq(0).append('<div class="flex-prev-shadow" />');
					$('.flex-direction-nav').find('li').eq(1).append('<div class="flex-next-shadow" />');
				},*/
			});
		   
	   }
		
	/* ==========================================================================
	   PrettyPhoto activation
	   ========================================================================== */
	  if( $("a[data-rel^='prettyPhoto']").length > 0 ){
		  							
			$("a[data-rel^='prettyPhoto']").prettyPhoto({
				animation_speed: 'normal', /* fast/slow/normal */
				slideshow: 5000, /* false OR interval time in ms */
				autoplay_slideshow: false, /* true/false */
				opacity: 0.80, /* Value between 0 and 1 */
				show_title: true, /* true/false */
				//allow_resize: true, /* Resize the photos bigger than viewport. true/false */
				//default_width: 640,
				//default_height: 480,
				counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
				theme: 'dark_square', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
				horizontal_padding: 20, /* The padding on each side of the picture */
				hideflash: true, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
				wmode: 'opaque', /* Set the flash wmode attribute */
				autoplay: true, /* Automatically start videos: True/False */
				modal: false, /* If set to true, only the close button will close the window */
				deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
				overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
				keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
				changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
				
			});
			
		}	
	   	    
		

		
	/* ==========================================================================
	   Homepage slider
	   ========================================================================== */
		if($('#pm-slider').length > 0){
						
			$('#pm-slider').PMSlider({
				speed : 700,
				easing : 'ease',
				loop : true,
				controlNav : true, //false = no bullets / true = bullets
				controlNavThumbs : true, //true or false
				animation : 'fade', //slide or fade
				slideshow : false, //true or false
				slideshowSpeed : 7000,
				pauseOnHover : true, //true or false
				arrows : true, //true or false
				touch : true, //true or false
			});
			
		}
		
	/* ==========================================================================
	   Detect page scrolls on buttons
	   ========================================================================== */
		if( $('.pm-page-scroll').length > 0 ){
			
			$('.pm-page-scroll').on('click', function(e){
								
				e.preventDefault();
				var $this = $(this);
				var sectionID = $this.attr('href');
								
				$('html, body').animate({
					scrollTop: $(sectionID).offset().top - 80
				}, 1000);
				
			});
			
		}
		
	
		
	/* ==========================================================================
	   Datepicker
	   ========================================================================== */
	   if($("#pm_app_form_date").length > 0){
		   $("#pm_app_form_date").datepicker();
	   }
	   
	/* ==========================================================================
	   Gallery Isotope activation
	   ========================================================================== */
	   if($("#gallery-posts").length > 0){
		  
		  $('#gallery-posts').imagesLoaded( function(){
			$('#gallery-posts').isotope({
			  itemSelector : '.isotope-item',
			});
			$('.isotope-item').css({
			  opacity : 1,
			});
		  });
		  
	   }
	   		
	/* ==========================================================================
	   Properties visual layout selector
	   ========================================================================== */
	   if($('.pm-visual-layout-btn', '#pm-property-filter-options-list').length > 0){
		   
		   $('.pm-visual-layout-btn', '#pm-property-filter-options-list').on('click', function(e) {
			  
			  var $this = $(this),
			  id = $this.attr('id');
			  
			  $('#pm-property-listings-list').removeClass('pm-list-mode');
			  $('#pm-property-listings-list').removeClass('pm-grid-mode');
			 
			  $('#pm-property-listings-list').addClass(id);			  
			  
			  e.preventDefault();
			   
		   });
		   
	   }
	   
	/* ==========================================================================
	   Agencis visual layout selector
	   ========================================================================== */
	   if($('.pm-agencies-visual-layout-btn', '#pm-property-filter-options-list-agencies').length > 0){
		   
		   $('.pm-agencies-visual-layout-btn', '#pm-property-filter-options-list-agencies').on('click', function(e) {
			  
			  var $this = $(this),
			  id = $this.attr('id');
			  
			  $('#pm-agencies-posts-list').removeClass('pm-list-mode');
			  $('#pm-agencies-posts-list').removeClass('pm-grid-mode');
			 
			  $('#pm-agencies-posts-list').addClass(id);			  
			  
			  e.preventDefault();
			   
		   });
		   
	   }
		
		
	/* ==========================================================================
	   Language Selector drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-language-selector-menu').length > 0){
			$('.pm-dropdown.pm-language-selector-menu').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Filter system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-filter-system').length > 0){
			$('.pm-dropdown.pm-filter-system').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Properties Filter system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-property-filter-system').length > 0){
			$('.pm-dropdown.pm-property-filter-system').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Properties Filter options system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-property-filter-options').length > 0){
			$('.pm-dropdown.pm-property-filter-options').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Agencies Filter options system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-agencies-filter-options').length > 0){
			$('.pm-dropdown.pm-agencies-filter-options').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Categories system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-categories-menu').length > 0){
			$('.pm-dropdown.pm-categories-menu').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		

		
	/* ==========================================================================
	   Main menu interaction
	   ========================================================================== */
		if( $('.pm-nav').length > 0 ){
						
			//superfish activation
			$('.pm-nav').superfish({
				delay: 0,
				animation: {opacity:'show',height:'show'},
				speed: 300,
				dropShadows: false,
			});
			
			$('.sf-sub-indicator').html('<i class="fa fa-angle-down"></i>');
			
			$('.sf-menu ul .sf-sub-indicator').html('<i class="fa fa-angle-right"></i>');
						
		};	
		
	/* ==========================================================================
	   Checkout expandable forms
	   ========================================================================== */
		if ($('#pm-returning-customer-form-trigger').length > 0){
			
			var $returningFormExpanded = false;
			
			$('#pm-returning-customer-form-trigger').on('click', function(e) {
				
				e.preventDefault();
				
				if( !$returningFormExpanded ) {
					$returningFormExpanded = true;
					$('#pm-returning-customer-form').fadeIn(700);
					
				} else {
					$returningFormExpanded = false;
					$('#pm-returning-customer-form').fadeOut(300);
				}
				
			});
			
		}
		
		if ($('#pm-promotional-code-form-trigger').length > 0){
			
			var $promotionFormExpanded = false;
			
			$('#pm-promotional-code-form-trigger').on('click', function(e) {
				
				e.preventDefault();
				
				if( !$promotionFormExpanded ) {
					$promotionFormExpanded = true;
					$('#pm-promotional-code-form').fadeIn(700);
					
				} else {
					$promotionFormExpanded = false;
					$('#pm-promotional-code-form').fadeOut(300);
				}
				
			});
			
		}

				
	/* ==========================================================================
	   isTouchDevice - return true if it is a touch device
	   ========================================================================== */
	
		function isTouchDevice() {
			return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
		}
				
		
		//dont load parallax on mobile devices
		function runParallax() {
			
			//enforce check to make sure we are not on a mobile device
			if( !isMobile.any()){
							
				//stellar parallax
				$.stellar({
				  horizontalOffset: 0,
				  verticalOffset: 0,
				  horizontalScrolling: false,
				});
				
				$('.pm-parallax-panel').stellar();
				
								
			}
			
		}//end of function
		
	/* ==========================================================================
	   Checkout form - Account password activation
	   ========================================================================== */
	   
	   if( $('#pm-create-account-checkbox').length > 0){
			  			
			$('#pm-create-account-checkbox').change(function(e) {
				
				if( $('#pm-create-account-checkbox').is(':checked') ){
					
					$('#pm-checkout-password-field').fadeIn(500);
					
				} else {
					$('#pm-checkout-password-field').fadeOut(500);	
				}
				
			});
			   
	   }
	   
	   
	 /* ==========================================================================
	   Accordion and Tabs
	   ========================================================================== */
	   
	    $('#accordion').collapse({
		  toggle: false
		})
	    $('#accordion2').collapse({
		  toggle: false
		})
	   
		if($('.panel-title').length > 0){
			
			var $prevItem = null;
			var $currItem = null;
			
			$('.pm-accordion-link').on('click', function(e) {
				
				var $this = $(this);
				
				if($prevItem == null){
					$prevItem = $this;
					$currItem = $this;
				} else {
					$prevItem = $currItem;
					$currItem = $this;
				}				
				
				
				if( $currItem.attr('href') != $prevItem.attr('href') ) {
										
					//toggle previous item
					if( $prevItem.parent().find('i').hasClass('fa fa-minus') ){
						$prevItem.parent().find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
					}
					
					$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					
				} else if($currItem.attr('href') == $prevItem.attr('href')) {
										
					//else toggle same item
					if( $currItem.parent().find('i').hasClass('fa fa-minus') ){
						$currItem.parent().find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
					} else {
						$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					}
						
				} else {
					
					//console.log('toggle current item');
					$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					
				}
				
				
			});

			
		}
		
	/* ==========================================================================
	   Back to top button
	   ========================================================================== */
		$('#back-top').on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});

	/* ==========================================================================
	   Set inital position of float menu
	   ========================================================================== */
		var windowWidth = $(window).width() / 2,
		floatMenuWidth = $('#pm-float-menu-container').outerWidth() / 2;
				
		$('#pm-float-menu-container').css({
			'left' : windowWidth - floatMenuWidth
		});
		
	/* ==========================================================================
	   When the window is scrolled, do
	   ========================================================================== */
		$(window).scroll(function () {
			
			animateMilestones();
			animateProgressBars();
			animatePieCharts();
			setDimensionsPieCharts();
			
			if ($(this).scrollTop() > 190) {
					
				$('#pm-float-menu-container').addClass('active');
								
			} else {
				
				$('#pm-float-menu-container').removeClass('active');
									
			}//end of if
						
			//toggle fixed nav
			/*if( $(window).width() > 991 ){
				
				if ($(this).scrollTop() > headerHeight) {
					
					$('header').addClass('fixed');
									
				} else {
					
					$('header').removeClass('fixed');
										
				}
			
			}*/
						
		});
		
	/* ==========================================================================
	   Detect page scrolls on buttons
	   ========================================================================== */
		if( $('.pm-page-scroll').length > 0 ){
			
			$('.pm-page-scroll').on('click', function(e){
								
				e.preventDefault();
				var $this = $(e.target);
				var sectionID = $this.attr('href');
				
				
				$('html, body').animate({
					scrollTop: $(sectionID).offset().top - 80
				}, 1000);
				
			});
			
		}

	
	/* ==========================================================================
	   Back to top button
	   ========================================================================== */
		$('#pm-back-to-top').on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
	/* ==========================================================================
	   Accordion menu
	   ========================================================================== */
		if($('#accordionMenu').length > 0){
			$('#accordionMenu').collapse({
				toggle: false,
				parent: false,
			});
		}
		
		
	/* ==========================================================================
	   Tab menu
	   ========================================================================== */
		if($('.pm-nav-tabs').length > 0){
			//actiavte first tab of tab menu
			$('.pm-nav-tabs a:first').tab('show');
			$('.pm-nav-tabs li:first-child').addClass('active');
		}

	/* ==========================================================================
	   Parallax check
	   ========================================================================== */
		var $window = $(window);
		var $windowsize = 0;
		
		function checkWidth() {
			$windowsize = $window.width();
			if ($windowsize < 980) {
				//if the window is less than 980px, destroy parallax...
				$.stellar('destroy');
			} else {
				runParallax();	
			}
		}
		
		// Execute on load
		checkWidth();
		// Bind event listener
		$(window).resize(checkWidth);

		
	/* ==========================================================================
	   Window resize call
	   ========================================================================== */
		$(window).resize(function(e) {
			methods.windowResize();
		});

		
	/* ==========================================================================
	   Tooltips
	   ========================================================================== */
		if( $('.pm_tip').length > 0 ){
			$('.pm_tip').PMToolTip();
		}
		if( $('.pm_tip_static_bottom').length > 0 ){
			$('.pm_tip_static_bottom').PMToolTip({
				floatType : 'staticBottom'
			});
		}
		if( $('.pm_tip_static_top').length > 0 ){
			$('.pm_tip_static_top').PMToolTip({
				floatType : 'staticTop'
			});
		}
		
	/* ==========================================================================
	   TinyNav
	   ========================================================================== */
		$(".pm-footer-navigation").tinyNav();
		
			
	}); //end of document ready

	
	/* ==========================================================================
	   Options
	   ========================================================================== */
		var options = {
			dropDownSpeed : 100,
			slideUpSpeed : 200,
			slideDownTabSpeed: 50,
			changeTabSpeed: 200,
		}
	
	/* ==========================================================================
	   Methods
	   ========================================================================== */
		var methods = {
			
			initializeGoogleMap : function(id, latitude, longitude, message) {
								
				
				  var myLatlng = new google.maps.LatLng(latitude,longitude);
				  latLong = myLatlng;
				  var myOptions = {
					center: myLatlng, 
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				  };
				  									  
				  //alert(document.getElementById(id).getAttribute('id'));
				  
				  //clear the html div first
				  document.getElementById(id).innerHTML = "";
				  
				  var map = new google.maps.Map(document.getElementById(id), myOptions);
				  
				  var iconBase = 'img/';
				  var marker = new google.maps.Marker({
					  position: myLatlng,
					  map: map,
					  icon: iconBase + 'map-marker.png'
				  });
		 
				  var contentString = message;
				  var infowindow = new google.maps.InfoWindow({
					  content: contentString
				  });
				  
				   
				  google.maps.event.addListener(marker, "click", function() {
					  infowindow.open(map,marker);
				  });
				   
				  marker.setMap(map);
				  
				  activeMap = map;
				  
				  google.maps.event.trigger(map, 'resize');
				  map.setCenter(latLong);
				  
				  //Remove right margin on InfoWindow
				  google.maps.event.addListener(infowindow, 'domready', function() {

					   // Reference to the DIV which receives the contents of the infowindow using jQuery
					   var iwOuter = $('.gm-style-iw');
					
					   /* The DIV we want to change is above the .gm-style-iw DIV.
						* So, we use jQuery and create a iwBackground variable,
						* and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
						*/
					   var iwBackground = iwOuter.prev();
					
					   // Remove the background shadow DIV
					   iwBackground.children(':nth-child(2)').css({'display' : 'none'});
					
					   // Remove the white background DIV
					   iwBackground.children(':nth-child(4)').css({'display' : 'none'});
					   
					   // Moves the infowindow 115px to the right.
					   iwOuter.parent().parent().css({left: '0'});
						
					   // Moves the shadow of the arrow 76px to the left margin 
					   //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 0px !important;'});
						
					   // Moves the arrow 76px to the left margin 
					   //iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 0px !important;'});
					   
					    // Changes the desired color for the tail outline.
						// The outline of the tail is composed of two descendants of div which contains the tail.
						// The .find('div').children() method refers to all the div which are direct descendants of the previous div. 
						iwBackground.children(':nth-child(3)').find('div').children().css({
							'box-shadow': 'rgba(72, 181, 233, 0.6)',
							'z-index' : 2
						});
						
						// Taking advantage of the already established reference to
						// div .gm-style-iw with iwOuter variable.
						// You must set a new variable iwCloseBtn.
						// Using the .next() method of JQuery you reference the following div to .gm-style-iw.
						// Is this div that groups the close button elements.
						var iwCloseBtn = iwOuter.next();
						
						// Apply the desired effect to the close button
						iwCloseBtn.css({
						  opacity: '1', // by default the close button has an opacity of 0.7
						  border: '2px solid #ccc', // increasing button border and new color
						  'border-radius': '25px', // circular effect
						  'padding' : '10px',
						  'top' : '0px',
						  'right' : '8px',
						  'background-color' : 'white',
						  'text-align' : 'center'
						  });
						  
						  iwCloseBtn.find('img').css({
							'top' : '-333px',
							'left' : '2px'  
						  });
						
						// The API automatically applies 0.7 opacity to the button after the mouseout event.
						// This function reverses this event to the desired value.
						iwCloseBtn.mouseout(function(){
						  $(this).css({opacity: '1'});
						});
					
				  });
				
			},
			
			activateCloseMenuBtn : function(e) {
				
				var xOffset = -17,
				yOffset = 25,
				contentWidth = $('body').width(),
				mouseX = 0, 
				mouseY = 0;
				
				// cache the selector
				var follower = $("#pm-mobile-menu-hover-close-btn");
				var xp = 0, 
				yp = 0,
				speed = 4;
				
				$("#pm-mobile-menu-overlay").css("cursor", "none");
				
				$('#pm-mobile-menu-hover-close-btn').animate({
					'opacity' : 1	
				});
				
				$("#pm-mobile-menu-overlay").on('mousemove mouseleave', function(e) {
					
					if( e.type === 'mousemove' ){
						
						if( menuHover === true ) {
							
							menuHover = false;
							follower.css({
								"opacity" : 1	
							});
							
						}
						
						mouseX = e.pageX;
   						mouseY = e.pageY;
						
						follower.css({"left" : mouseX + xOffset, "top" : mouseY + yOffset}); 	
						
					} else if( e.type === 'mouseleave' ){
						
						menuHover = true;
						follower.css({
							"opacity" : 0	
						});
						
						follower.css({"left" : 0, "top" : 0});
						
					} else {
						//	
					}
									
				});
				
				/*menuLoop = setInterval(function () {
				
					// change 12 to alter damping higher is slower
					xp += ((mouseX - xp) / speed) + xOffset;
					yp += ((mouseY - yp) / speed) + yOffset;
					follower.css({left:xp, top:yp});
					
				}, 30);*/
				
			},
			
			hideCloseMenuBtn : function(e) {
				
				$('#pm-mobile-menu-hover-close-btn').animate({
					'opacity' : 0	
				}, 'fast');
				
				clearInterval(menuLoop);				
				
			},
			
			dropDownMenu : function(e){  
					
				var body = $(this).find('> :last-child');
				var head = $(this).find('> :first-child');
				
				if (e.type == 'mouseover'){
					body.fadeIn(options.dropDownSpeed);
				} else {
					body.fadeOut(options.dropDownSpeed);
				}
				
			},
					
			windowResize : function() {
				//resize calls
				
				var windowWidth = $(window).width() / 2,
				floatMenuWidth = $('#pm-float-menu-container').outerWidth() / 2;
						
				$('#pm-float-menu-container').css({
					'left' : windowWidth - floatMenuWidth
				});
				
			},
			
		};
		
	
	
})(jQuery);

