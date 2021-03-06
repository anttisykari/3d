var util = require('./util');
var config = require('./config');
var log = util.log;

function getHeightData(img) {
	var s = 256;
    var canvas = document.createElement( 'canvas' );
    canvas.width = s;
    canvas.height = s;
    var context = canvas.getContext( '2d' );

    var size = s * s, data = new Float32Array( size );

    context.drawImage(img,0,0);

    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }

    var imgd = context.getImageData(0, 0, s, s);
    var pix = imgd.data;

    var j=0;
    for (var i = 0, n = pix.length; i < n; i += (4)) {
        var all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/3;
    }

    return data;
}

var heightmapImg = document.querySelector('img.heightmap');
var heightData = getHeightData(heightmapImg);
log(heightData.length);

// x, y are heightmap coordinates
function getHeight(x, y) {
	if (x < 0)
		x += config.terrainN;
	if (y < 0)
		y += config.terrainN;

	x = Math.floor(x);
	x %= config.terrainN;
	y = Math.floor(y);
	y %= config.terrainN;
	return heightData[x + y * config.heightmapSize];
}

// convert [0.255] to something suitable for playing
function convertHeight(orig) {
	return -20 + .08 * orig;
}

module.exports.getHeightData = getHeightData;
module.exports.heightData = heightData;
module.exports.getHeight = getHeight;
module.exports.convertHeight = convertHeight;

