#target illustrator

var doc = app.activeDocument;
var sel = doc.selection;
var file = File.saveDialog('save centers', 'center:*.txt');
var coordSys = app.coordinateSystem;
file.open('w')

var active_artboard = doc.artboards[0];
var frame = active_artboard.artboardRect;
var x_offset = frame[0];
var y_offset = frame[1];
var board_height = y_offset;
file.write("name,x,y,width,height\n");
for (var i = 0; i < sel.length; i++) {
	var obj = sel[i];
	var center = obj.position;
	center[0] += obj.width/2.0; 
	center[1] -= obj.height/2.0; 
	var width_mm = pts_to_mm(obj.width);
	var height_mm = pts_to_mm(obj.height);
	var center_x_mm = pts_to_mm(center[0] - x_offset);
	var center_y_mm = pts_to_mm(board_height - (y_offset - center[1]));
	var origin_x_mm = pts_to_mm(obj.position[0]);
	var origin_y_mm = pts_to_mm(obj.position[1]);
    if (obj.name.indexOf("pcb") != -1) {
        // Non circular component. Don't use center of dimension.
	    file.write(obj.name+','+round_dec(origin_x_mm, 4)+','+round_dec(origin_y_mm, 4)+','+round_dec(width_mm, 4) + ',' + round_dec(height_mm, 4) + "\n");
    } else {
        // Circular positions.
	    file.write(obj.name+','+round_dec(center_x_mm, 4)+','+round_dec(center_y_mm, 4)+','+round_dec(width_mm, 4) + ',' + round_dec(height_mm, 4) + "\n");
	}
}

file.close();

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
