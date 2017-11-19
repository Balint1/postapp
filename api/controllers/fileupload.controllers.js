var formidable = require('formidable');
var fs = require('fs');
module.exports.uploadFile = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:\\Users\\barth\\alma\\' + files.filetoupload.name;
        console.log(files.filetoupload);
        if(files.filetoupload.type != 'application/octet-stream'){
            res.status(400).json("Wrong type");
            return;
        }
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
    });
}

module.exports.uploadFileHTML = function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
}