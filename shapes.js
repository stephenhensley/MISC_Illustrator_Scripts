var doc = app.activeDocument;
//var doc = app.documents.add();
var artLayer = doc.layers[0];

//var rect = artLayer.pathItems.rectangle(7.5, 87.5, 55.0, 75.0);
//var rndRect = artLayer.pathItems.roundedRectangle(47.5, 87.5, 55.0, 75.0, 20.0, 10.0);
//var ellipse = artLayer.pathItems.ellipse(90.5, 87.5, 55.0, 75.0, false, true);

var circlePath = artLayer.pathItems.ellipse(100.0, 100.0, 30.0, 30.0, false, true);
var clones = 30;
var angle = 360/clones;
var clonedPath = circlePath.duplicate(doc,ElementPlacement.PLACEATEND );
for (var i = 0; i < clones; i++) {
    var clonedPath = circlePath.duplicate(doc,ElementPlacement.PLACEATEND );
    clonedPath.rotate(angle * i);
    clonedPath.translate(25.0, 25.0, true, true, true, true, Transformation.TOPLEFT);
};

for (i = 0; i < artLayer.pathItems.length; i++) {
    styleIndex = Math.round(Math.random() * (doc.graphicStyles.length - 1));
    doc.graphicStyles[styleIndex].applyTo(artLayer.pathItems[i]);
};
redraw();
