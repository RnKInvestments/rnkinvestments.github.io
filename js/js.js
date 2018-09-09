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
	//Set the countdowns
	if ($(".countdown").length > 0) setCountdowns();
});


/*===================================
  Wallpaper Functions
  ===================================*/
//Set the wallpaper of a banner div
function setBannerPic() {
	$(".banner").css({"background-image" : "url(" + $(".banner").attr("id") + ")"});
}

function setBannerSize() {
	//Use images strictly 4:1
	$(".banner").css({
		"height" : String(BANNER_HEIGHT) + "px",
		"background-size" : "100% " + String(BANNER_HEIGHT) + "px"
	});
}

/*===================================
  Countdown Function
  ===================================*/
function setCountdowns() {
		//Create a variable for the countdown objects
		var $countdown = $(".countdown");
		//Create an array for all the dates of the countdowns
		var countDownDates = []
		for (var i = 0; i < $countdown.length; i++) {
			countDownDates.push(new Date($($countdown[i]).attr("id")).getTime());
		}
		//Update very second
		var update = setInterval(function(){
			//Get the current date
			var now = new Date().getTime();
			//Find the distances from now and the countdown times
			var distances = [];
			for (var i = 0; i < countDownDates.length; i++) {
				distances[i] = countDownDates[i] - now;
			}
			//Math
			var days = [], hours = [], minutes = [], seconds = [];
			for (var i = 0; i < distances.length; i++) {
				days[i] = Math.floor(distances[i] / (1000 * 60 * 60 * 24));
				hours[i] = Math.floor((distances[i] % (1000 * 60 * 60 * 24)) / (1000 * 60 *60));
				minutes[i] = Math.floor((distances[i] % (1000 * 60 * 60)) / (1000 * 60));
				seconds[i] = Math.floor((distances[i] % (1000 * 60)) / 1000);
			}
			//Display all the countdown times
			for (var i = 0; i < $countdown.length; i++) {
				$($countdown[i]).html(days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds.");
			}
			//Check if the countdowns are over
			var timersOver = true
			for (var i = 0; i < distances.length; i++) {
				if (distances[i] <= 0 ) {
					$($countdown[i]).html("Please wait a couple more seconds");
				} else {
					timersOver = false;
				}
			}
			if (timersOver == true) clearInterval(update);
		}, 1000);
}

/*===================================
  Misc. Functions
  ===================================*/
function windowResize() {
	//Do the Banner stuff
	BANNER_HEIGHT = $window.width() * 0.25;
	setBannerSize();
}
