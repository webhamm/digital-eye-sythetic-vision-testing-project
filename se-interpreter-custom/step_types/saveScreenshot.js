//npm install --save png-to-jpeg
var pngToJpeg = require('png-to-jpeg');
var fs = require('fs');
exports.cmp = 'value';

exports.run = function(tr, cb) {
  tr.do('takeScreenshot', [], cb, function(err, base64Image) {    
      var decodedImage = new Buffer(base64Image, 'base64');
      var image_name = tr.p('name') + '-' + Date.now() + '.jpg'
      var full_img_path = tr.p('path') + image_name;

      pngToJpeg({quality: 90})(decodedImage)
        .then(
          output => fs.writeFileSync(full_img_path, output))
          .catch( reason => {
            console.error( 'onRejected function called: ', reason );
            cb({'success': !err, 'error': err});
        });

        cb({'success': !err, 'error': err})

    /*
    fs.writeFile(image_file + '.png', decodedImage, function(err) {
      cb({'success': !err, 'error': err});
    });
    */

  });
};