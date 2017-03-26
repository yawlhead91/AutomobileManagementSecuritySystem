import './landing.html';

Template.LandingPage.onRendered(function(){
	$('input').each(function(){
        if ($(this).val().length !== "") {
            $(this).siblings('label, i').addClass('active');
        }
    });
});