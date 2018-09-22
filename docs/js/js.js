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

	windowResize();
	$window.resize(function resize(){windowResize();});

	//Set the countdowns
	if ($(".countdown").length > 0) setCountdowns();

	//Load in stuff
	getPersonCard();
	$("#footer").load("/pages/footer.html");
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
  Create Person Card
  ===================================*/
//This function sends the request for the data and puts it into the return function
function getPersonCard() {
	for (var i = 0; i < $(".person-card").length; i++) {
		var id = $($(".person-card")[i]).attr("id");
		var url = "/pages/persons/" + id + ".txt";
		$.ajax({url: url, type: "get", success: createPersonCard(id)});
	}
}

//This function processes the data
function createPersonCard(id) {
	return function(data) {
		var info = data.split("\n");
		$("#" + id).append(
			"<div class='person-card-profile'>\
				<img src=" + info[0] + ">\
				<h1>" + info[1] + "</h1>\
				<hr>\
				<p>" + info[2] + "</p>\
			</div>\
			<div class='person-card-bio'>\
				<h1>Qualifications/Achievements</h1>\
				<ul></ul>\
			</div>"
		);
		for (var j = 3; j < info.length; j++) {
			$("#" + id + " ul").append("<li><span class='item'>" + info[j] + "</span></li>");
		}
	}
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

$("#contact").submit(function(e){
	e.preventDefault();
	$.ajax({
		url: "/docs/php/email.php",
		type: "post",
		data: $("#contact").serialize
	});
});
