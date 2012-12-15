
function multM(a,b) {
	var m = [[0,0,0],[0,0,0],[0,0,0]];
	for (i=0;i<3;i++)
		for (j=0;j<3;j++)
			for (k=0;k<3;k++)
				m[i][j] += a[i][k]*b[k][j];

	return m;
}




// Adding transformations
// 1 - Translate 	(x,y)
// 2 - Scale 		(scale)
// 3 - Rotate 		(deg)
// 4 - Skew 		(degx,degy)
function addToPage(transformation) {


}

function alertM(m) {
	s="";
	for (i=0;i<3;i++) for (j=0;j<3;j++) s+= " " + m[i][j];
    alert(s);
}



$(document).ready(function() {

	var I = [[1,0,0],[0,1,0],[0,0,1]];

	

	$("#wrapper #toolslist .transformation").click(function() {
		switch ($(this).attr("id")) {
			case "translate":

			break;
			case "scale":

			break;
			case "rotate":

			break;
			case "skew":

			break;
		}
	});	
})