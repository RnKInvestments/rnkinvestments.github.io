/*===================================
  Global Variables
  ===================================*/
var $window = $(window);
var BANNER_HEIGHT;

/*===================================
  When DOM loads function
  ===================================*/
$(function() {
	setBannerPic();
	//Resize functions
	$window.resize(function resize(){
		BANNER_HEIGHT = $window.width() * 0.25;
		setBannerSize();
	});
});


/*===================================
  Wallpaper Functions
  ===================================*/
//Set the wallpaper of a banner div
function setBannerPic() {
	$(".banner").css({"background-image" : "url(" + $(".banner").attr("id") + ")"});
}

function setBannerSize() {
	$(".banner").css({"height" : String(BANNER_HEIGHT) + "px"});
}
