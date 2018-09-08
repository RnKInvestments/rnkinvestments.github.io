/*===============
Functions when the
DOM loads
  ===============*/
$(function() {
	setWallpaperPic();
});

function setWallpaperPic() {
	$(".banner").css("background-image", $(".banner").attr("id"));
	console.log($(".banner").attr("id"));
}
