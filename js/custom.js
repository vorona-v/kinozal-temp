(function ($) {  

	/* bootstrap menu hover */
	$(".dropdown").hover(            
		function() {
			$('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
			$(this).toggleClass('open');
			$('b', this).toggleClass("caret caret-up");                
		},
		function() {
			$('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
			$(this).toggleClass('open');
			$('b', this).toggleClass("caret caret-up");                
		});

    
})(jQuery);                                                                 // Avoid conflicts with other libraries