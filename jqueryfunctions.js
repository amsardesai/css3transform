
$(document).ready(function() {
	trans = new Array();
	
	$("#wrapper #toolslist .transformation").click(function() {
		switch ($(this).attr("id")) {
			case "translate":
				var x = 10;
				var y = 10;
				addTransformation(0,x,y);
				alert(x+" "+y);
			break;
			case "scale":
				var x = 2;
				var y = 2;
				addTransformation(1,x,y);
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

