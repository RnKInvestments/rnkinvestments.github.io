/*===============
Functions when the
DOM loads
  ===============*/
$(function() {
	setWallpaperPic();
});

function setWallpaperPic() {
	$(".banner").css({"background-image" : "url(" + $(".banner").attr("id") + ")"});
}
