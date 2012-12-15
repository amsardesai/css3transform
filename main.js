
function multM(a,b) {
	var m = [[0,0,0],[0,0,0],[0,0,0]];
	for (i=0;i<3;i++)
		for (j=0;j<3;j++)
			for (k=0;k<3;k++)
				m[i][j] += a[i][k]*b[k][j];
	return m;
}

function translate(n,x,y) {
	var m = [[0,0,0],[0,0,0],[0,0,0]];
	for (i=0;i<3;i++) 
		for (j=0;j<3;j++)
			m[i][j] = n[i][j];
	m[0][2] += x;
	m[1][2] += y;
	return m;
}

function scale(n,f) {
	m = [[f,0,0],[0,f,0],[0,0,1]];
	return multM(n,m);
}

function rotate(n,d) {
	r = d*(Math.PI/180);
	m = [[Math.cos(r),-Math.sin(r),0],[Math.sin(r),Math.cos(r),0],[0,0,1]];
	return multM(n,m);
}

function skew() {
	
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