// -----------------------------------
// Variable Declarations

var trans; // Global transformation array
var I = [[1,0,0],[0,1,0],[0,0,1]]; // Identity matrix
var curTrans = [[0,0,0],[0,0,0],[0,0,0]]; // Current transformation

// -----------------------------------
// Matrix Modification

function multM(a,b) {
	var m = [[0,0,0],[0,0,0],[0,0,0]];
	var i,j,k;
	for (i=0;i<3;i++) {
		for (j=0;j<3;j++) {
			for (k=0;k<3;k++) {
				if (a[i][k]==NaN) alert("a is not a number :(");
				if (b[i][k]==NaN) alert("b is not a number :(");
				m[i][j] += a[i][k]*b[k][j];
			}
		}
	}
	return m;
}

function copyM(a) {
	var m = [[0,0,0],[0,0,0],[0,0,0]];
	var i,j;
	for (i=0;i<3;i++) {
		for (j=0;j<3;j++) {
			m[i][j] = a[i][j];
		}
	}
	return m;
}

function translate(n,x,y) {
	var m = copyM(n);
	m[0][2] += x;
	m[1][2] += y;
	return m;
}

function scale(n,x,y) {
	m = [[x,0,0],[0,y,0],[0,0,1]];
	return multM(n,m);
}

function rotate(n,d) {
	r = d*(Math.PI/180);
	m = [[Math.cos(r),-Math.sin(r),0],[Math.sin(r),Math.cos(r),0],[0,0,1]];
	return multM(n,m);
}

function skew(n,x,y) {
	//x = x==90?89:x;
	//y = y==90?89:y;
	rx = x*(Math.PI/180);
	ry = y*(Math.PI/180);
	m = [[1,Math.tan(rx),0],[Math.tan(ry),1,0],[0,0,1]];
	return multM(n,m);
}

// -----------------------------------
// Functionality and Calculation
// Transformation type:
// 0 - Translate 	(x,y)
// 1 - Scale 		(scalex,scaley)
// 2 - Rotate 		(deg)
// 3 - Skew 		(degx,degy)

function calculateTransformation() {
	curTrans = copyM(I);
	var i;
	for (i=0;i<trans.length;i++) {
		var cur = trans[i];
		if (cur.t==0) curTrans = translate(curTrans,cur.arg1,cur.arg2);
		else if (cur.t==1) curTrans = scale(curTrans,cur.arg1,cur.arg2);
		else if (cur.t==2) curTrans = rotate(curTrans,cur.arg1);
		else if (cur.t==3) curTrans = skew(curTrans,cur.arg1,cur.arg2);
	}
}

function addTransformation(transformation,argument1,argument2) {
	m = {
		t: transformation,
		arg1: argument1,
		arg2: argument2
	};
	trans.push(m);
	calculateTransformation();
}

function removeTransformation(n) {
	trans.splice(n,1);
	calculateTransformation();
}

// -----------------------------------
// Porting to View
/*
function addToPage(transformation) {


}

function displayTransformation() {
	//obj = $("#wrapper #workpanel #object");
}
*/
function alertM(m) {
	s="";
	var i,j;
	for (i=0;i<3;i++) 
		for (j=0;j<3;j++) 
			s+= " " + m[i][j];
    alert(s);
}