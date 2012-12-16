// -----------------------------------
// Variable Declarations

var trans[]; // Global transformation array
var I = [[1,0,0],[0,1,0],[0,0,1]]; // Identity matrix
var curTrans = [[0,0,0],[0,0,0],[0,0,0]]; // Current transformation

// -----------------------------------
// Matrix Modification

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

function Transformation(t,arg1,arg2) {
	this.trans = t;
	this.arg1 = arg1;
	this.arg2 = arg2;
}

function calculateTransformation() {
	curTrans = [[0,0,0],[0,0,0],[0,0,0]];
	for (i=0;i<3;i++) 
		for (j=0;j<3;j++)
			curTrans[i][j] = I[i][j];

	for (i=0;i<trans.length;i++) {
		switch(trans[i].trans) {
			case 0: // Translate
				curTrans = translate(curTrans,trans[i].arg1,trans[i].arg2);
			break;
			case 1: // Scale
				curTrans = scale(curTrans,trans[i].arg1,trans[i].arg2);
			break;
			case 2: // Rotate
				curTrans = rotate(curTrans,trans[i].arg1);
			break;
			case 3: // Skew
				curTrans = skew(curTrans,trans[i].arg1,trans[i].arg2);
			break;
		}
	}
}

function addTransformation(t,arg1,arg2) {
	m = new Transformation(t,arg1,arg2);
	trans.push(m);
	calculateTransformation();
}

function removeTransformation(n) {
	trans.splice(n,1);
	calculateTransformation();
}

// -----------------------------------
// Porting to View

function addToPage(transformation) {


}

function displayTransformation() {
	obj = $("#wrapper #workpanel #object");
}

function alertM(m) {
	s="";
	for (i=0;i<3;i++) for (j=0;j<3;j++) s+= " " + m[i][j];
    alert(s);
}

// -----------------------------------
// jQuery Document Ready
