// -----------------------------------
// jQuery Document Ready

$(document).ready(function() {
	trans = new Array();

	$("#wrapper #toolslist .transformation").click(function() {
		switch ($(this).attr("id")) {
			case "translate":
				var tx = 10;
				var ty = 10;
				addTransformation(0,tx,ty);
			break;
			case "scale":
				var fx = 2;
				var fy = 2;
				addTransformation(1,fx,fy);
			break;
			case "rotate":
				var d = 45;
				addTransformation(2,d,0);
			break;
			case "skew":
				var dx = 30;
				var dy = 25;
				addTransformation(3,dx,dy);
			break;
		}
	});	
});