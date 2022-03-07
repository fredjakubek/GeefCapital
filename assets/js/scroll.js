$(function() {
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

	$("a").on('click', function(event) {
		if(this.pathname == window.location.pathname &&
	    this.protocol == window.location.protocol &&
	    this.host == window.location.host){
	    	if (this.hash !== "") {
	      		event.preventDefault();
	      		var hash = this.hash;
	      		$('html, body').animate({scrollTop: $(hash).offset().top }
	      			, 800, function(){
				        window.location.hash = hash;
				      });
	      		if($(window).width() < 992 && $(this).parent('li').length > 0){
	      			$('.btn--mobile-menu').trigger('click');
	      		}
	    	}
	    }
  	});	
	var sections = $('section');
	sections.each(function(){
		if(isScrolledIntoView(this)){
			setAttrs(this);
		}
		
	})
	$(window).scroll(function() {
		sections.each(function(){
			if(isScrolledIntoView(this)){
				setAttrs(this);
			}
		})
	});
	// init controller
	var controller = new ScrollMagic.Controller();
	if($('body').hasClass('landing-page')){

		var tween = TweenLite.to(".hero__logo", 1.2, {
			css: {y: 300, opacity: 0, marginTop: 0},
			ease: Linear.easeNone
		});

		// build scene
		var offset_scene = $(window).height()*0.45;
		var duration = $('.hero').height();
		var logo_scene = new ScrollMagic.Scene({
			triggerElement: ".hero",
			duration: duration,
			offset: offset_scene
		}).setTween(tween).addTo(controller)

		var header_scene = new ScrollMagic.Scene({
			offset: $('.hero').height()/2,
		}).addTo(controller).setClassToggle("#header", "header--scrolled");
	}
});

function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    var center_element = elemTop + $(elem).height()/2;

    return ((center_element <= docViewBottom) && (center_element >= docViewTop));
}
function setAttrs(elem){
		$('.header-navigation__list-item').removeClass('active');
		var link = $("a[href='/#"+$(elem).attr('id')+"']");
		if(!link.parent('.header-navigation__list-item').hasClass('active')){
			link.parent('.header-navigation__list-item').addClass('active');
		}
}