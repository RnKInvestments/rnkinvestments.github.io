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
	windowResize();
	$window.resize(function resize(){windowResize();});
});


/*===================================
  Wallpaper Functions
  ===================================*/
//Set the wallpaper of a banner div
function setBannerPic() {
	$(".banner").css({"background-image" : "url(" + $(".banner").attr("id") + ")"});
}

function setBannerSize() {
	$(".banner").css({
		"height" : String(BANNER_HEIGHT) + "px",
		"background-size" : "100% " + String(BANNER_HEIGHT) + "px"
	});
	console.log("Width: " + $(".banner").width() + "Height: " + $(".banner").height());
}

/*===================================
  Misc. Functions
  ===================================*/
function windowResize() {
	//Do the Banner stuff
	BANNER_HEIGHT = $window.width() * 0.25;
	setBannerSize();
}
