/**
 * Step to check the scene utilizing a digital-eye-API service
 * Implementaion of  JSONWire Proctocol and digital-eye-API service add on:
 *
 * author:  Chris Hamm
 * version: 0.0.1
 *
 * usage:     
 	{
      "type": "SceneCheck",
      "name": "cnet-fd-page"
    },
 */
var fs = require('fs');
var request = require("request");
var pngToJpeg = require('png-to-jpeg');
exports.cmp = 'value';

exports.run = function(tr, cb) {
  tr.do('takeScreenshot', [], cb, function(err, base64Image) {
    //console.log(tr.p('name'), tr.p('path'));    
    var image_name = tr.p('name') + '-' + Date.now() + '.jpg'
    var full_img_path = tr.p('path') + image_name;
    var SERVICE_HOST = 'digital-eye-app:5000';
    if (tr.p('host')){
      SERVICE_HOST = tr.p('host')
    }
    var url = 'http://' + SERVICE_HOST + '/digital-eye-api/v1.0/test?' +  'image_name=' + image_name + '&project=' + tr.p('name')
    console.log(url);

    //-- Process image
    //console.log("image captured", tr.name)
    //console.log("image full_img_path", full_img_path)

    var decodedImage = new Buffer(base64Image, 'base64');
    pngToJpeg({quality: 90})(decodedImage)
    	.then(
    		output => fs.writeFileSync(full_img_path, output))
      	.catch( reason => {
    		console.error( 'onRejected function called: ', reason );
  		})
    	.then(
    	output => request.get(url, (error, response, body) => {
    		console.log(body)
    		cb({'success': !err, 'error': err})
    	}));
	});
}