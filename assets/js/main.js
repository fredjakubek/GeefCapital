const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

$(function(){
	initSmoothWheel();
	if($('body').hasClass('landing-page')){
		
		$('.carousel--managment').slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 250,
			fade: true,
			infinite: false,
			cssEase: 'linear'
		})
		$('.management__single').click(function(){
			var modal_id= $(this).data('modal_id');
			openModal('#'+modal_id);
			$('.carousel--managment').slick('slickGoTo', $(this).data('slide')).slick("setPosition", 0);

		})

		$('.funds__single').click(function(){
			$(this).children('button').trigger('click');
		})
		$('.fund__btn').click(function(e){

			e.stopPropagation();
		})
		$('.popup__btn').click(function(e){
			e.stopPropagation();
		})
		$('.popup--fund__btn').click(function(e){
			e.stopPropagation();
		})
		$('.popup').click(function(e){
			e.preventDefault();
		});
	}
	
})

function switchText(){
	$('.about__text').toggleClass('about__text--hide');
	$('.about__btn').remove();
	initSmoothWheel({'remove': true});
	setTimeout(function() {
		initSmoothWheel();
	}, 1000);
}
function openModal(popup_id){
	// $('body').addClass('locked');
	// if(iOS){
	// 	$('body').addClass('locked-fixed');
	// }
	// if($('.popup-show').length > 0){
	// 	closeModal();
	// }
	
	$(popup_id).addClass('popup-show');
	if($('.popup-show').length == 1){
		bodyScrollLock.disableBodyScroll(document.querySelector(popup_id));
		initSmoothWheel({'remove': true});
	}
	$(popup_id).show();
	
	
}
function closeModal(popup_id){
	$(popup_id).hide();
	$(popup_id).removeClass('popup-show');
	
	if($('.popup-show').length == 0){
		
		bodyScrollLock.enableBodyScroll(document.querySelector(popup_id));
		initSmoothWheel();
		
		// $('.popup-show').removeClass('popup-show');
		
	}
	
	
}
function toggleMobileMenu(element){
	$('.header__mobile-menu').toggleClass('active');
	$(element).children('.icon').toggleClass('icon--hamburger').toggleClass('icon--close');
	if($('.header__mobile-menu').hasClass('active')){
		bodyScrollLock.disableBodyScroll(document.querySelector('.header__mobile-menu'));
	}else{
		bodyScrollLock.enableBodyScroll(document.querySelector('.header__mobile-menu'));
	}

}
function isIEorEDGE(){
    if (navigator.appName == 'Microsoft Internet Explorer'){
        return true; // IE
    }
    else if(navigator.appName == "Netscape"){
        return navigator.appVersion.indexOf('Edge') > -1; // EDGE
    }

    return false;
}

function initSmoothWheel(options){
	if( $(window).width() > 1024 ) {

        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

        } else {
            if( !isIEorEDGE() ) {
                $('html').smoothWheel(options);
            }
        }

    }
}