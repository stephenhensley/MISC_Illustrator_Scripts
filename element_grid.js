#target illustrator

var doc = app.activeDocument;
var sel = doc.selection;
var layer = doc.layers[0];
var center = sel[0].position;
//var circlePath = new Path.Circle(center, 25);
var circlePath = layer.PathItems.ellipse(100, 100, 30, 30, false, true);
var clones = 30;
var angle = 360/clones;
for (var i = 0; i < clones; i++) {
    var clonedPath = circlePath.clone();
    clonedPath.rotate(angle * i, circlePath.bounds.topLeft);
};


function pts_to_mm(val) {
	return val * 0.3527778611;
}

function mm_to_pts(val) {
	return val * 2.834645;
}

function round_dec(val, sigdig) {
	//return Number(Math.round(value+'e'+sigdig)+'e-'+sigdig);
	return Number((val).toFixed(sigdig));
}
