

// -----------------------------------
// Variable Declarations

var trans = new Array(); // Global transformation array
var I = [[1,0,0],[0,1,0],[0,0,1]]; // Identity matrix
var curTrans = [[1,0,0],[0,1,0],[0,0,1]]; // Current transformation

// -----------------------------------
// Matrix Modification

function multM(a,b) {
	var m = [[0,0,0],[0,0,0],[0,0,0]];
	var i,j,k;
	for (i=0;i<3;i++) {
		for (j=0;j<3;j++) {
			for (k=0;k<3;k++) {
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
	cosr = Math.cos(r);
	sinr = Math.sin(r);
	m = [[cosr,-sinr,0],[sinr,cosr,0],[0,0,1]];
	return multM(n,m);
}

function skew(n,x,y) {
	//x = x==90?89:x;
	//y = y==90?89:y;
	rx = x*(Math.PI/180);
	ry = y*(Math.PI/180);
	tanrx = Math.tan(rx);
	tanry = Math.tan(ry);
	m = [[1,tanrx,0],[tanry,1,0],[0,0,1]];
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
	displayTransformation();
}

function addTransformation(t,arg1,arg2) {
	m = {
		t: t,
		arg1: arg1,
		arg2: arg2
	};
	trans.push(m);
	calculateTransformation();
	refreshList();
}

function removeTransformation(n) {
	trans.splice(n,1);
	calculateTransformation();
	refreshList();
}

function modifyTransformation(n,t,arg1,arg2) {
	trans[n].t = t;
	trans[n].arg1 = arg1;
	trans[n].arg2 = arg2;
}

// -----------------------------------
// Porting to View

function refreshList() {
/*
		<div class="transformation tTranslate">
			<a class="button" href="#"></a>
			<span>Translate</span>
			<div class="input">
				x-axis: <input type='text' name='xcoords'> pixels<br />y-axis: <input type='text' name='ycoords'> pixels
			</div>
		</div>
		<div class="transformation tScale">
			<a class="button" href="#"></a>
			<span>Scale</span>
			<div class='input'>
				factor: <input type='text' name='factor'> times
			</div>
		</div>
		<div class="transformation tRotate">
			<a class="button" href="#"></a>
			<span>Rotate</span>
			<div class="input">
				angle: <input type='text' name='angle'> degrees
			</div>
		</div>
		<div class="transformation tSkew">
			<a class="button" href="#"></a>
			<span>Skew</span>
			<div class="input">
				x-axis: <input type='text' name='xcoords'> degrees<br />y-axis: <input type='text' name='ycoords'> degrees
			</div>
		</div>
	*/

	var container = $("#tools #toolsused");
	container.html(" ");
	var i;
	for (i=0;i<trans.length;i++) {
		var curObj = $("<div>").addClass("transformation").attr("name",i)
			.append($("<a>").addClass("button").attr("href","#"))
			.append($("<span>"))
			.append($("<div>").addClass("input"));
		if (trans[i].t==0)
			curObj.addClass("tTranslate")
				.find("span").html("Translate").end()
				.find(".input").html("x-axis: <input type='text' name='transx'> pixels<br />y-axis: <input type='text' name='transy'> pixels");
		else if (trans[i].t==1)
			curObj.addClass("tScale")
				.find("span").html("Scale").end()
				.find(".input").html("factor: <input type='text' name='scalefactor'> times");
		else if (trans[i].t==2)
			curObj.addClass("tRotate")
				.find("span").html("Rotate").end()
				.find(".input").html("angle: <input type='text' name='rotateangle'> degrees");
		else if (trans[i].t==3)
			curObj.addClass("tSkew")
				.find("span").html("Skew").end()
				.find(".input").html("x-axis: <input type='text' name='skewx'> degrees<br />y-axis: <input type='text' name='skewy'> degrees");

		container.append(curObj);
	}

	if (trans.length==0) {
		container.append($("<div>").addClass("notransformation").html("Click a transformation above to add to the list."));
	}

	$("#tools .transformation input").attr("maxlength",6);

	// Controller for removing 
	$("#tools #toolsused .transformation .button").click(function() {
		var id = $(this).parent().attr("name");
		removeTransformation(id);
	});
}

function displayTransformation() {
	var obj = $("#workpanel #object");
	var e = copyM(curTrans);

	var i,j;
	for (i=0;i<3;i++) 
		for (j=0;j<3;j++) 
			e[i][j] = Math.abs(e[i][j])<1E-4?0:e[i][j];

	var mat = "matrix("+e[0][0]+","+e[1][0]+","+e[0][1]+","+e[1][1]+","+e[0][2]+","+e[1][2]+")";
	obj.css("transform",mat);
	obj.css("top",($("#workpanel").height()-120)/2-(obj.height())/2);
	obj.css("left",($("#workpanel").width()-350)/2-(obj.width())/2);
}

function alertM(m) {
	s="";
	var i,j;
	for (i=0;i<3;i++) 
		for (j=0;j<3;j++) 
			s+= " " + m[i][j];
    alert(s);
}

// -----------------------------------
// jQuery Document Ready

$(document).ready(function() {
	$("#tools #toolslist .transformation").attr('unselectable','on').css('user-select','none').on('selectstart',false);
	displayTransformation();
	refreshList();

	// Controller for adding
	$("#tools #toolslist .transformation .button").click(function() {
		switch ($(this).parent().attr("id")) {
			case "translate":
				var tx = 0;
				var ty = 0;
				addTransformation(0,tx,ty);
			break;
			case "scale":
				var f = 1.0;
				addTransformation(1,f,f);
			break;
			case "rotate":
				var d = 0;
				addTransformation(2,d,0);
			break;
			case "skew":
				var dx = 0;
				var dy = 0;
				addTransformation(3,dx,dy);
			break;
		}
	});

	$(window).resize(displayTransformation);

});


