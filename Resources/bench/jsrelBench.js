exports.sqliteBenchCal = function (params) {

    var number = params.number;
    var writeStart;
    var writeEnd;
    var sortStart;
    var sortEnd;

    var filename = 'testdb.dat';

    // DB 初期化処理
    var jsrel = require('jsrel');
/*
    var fileDelete = Titanium.Filesystem.getFile(
        Filesystem.resourcesDirectory + filename
    );
    if( fileDelete.exists() ) {
        fileDelete.deleteFile();
    }
*/
    // DB書き込み計測
    writeStart = Date.now();
    var db = jsrel.use('testDB', {
        schema : {
            bench : {
                idNum : 0,
                value : 0
            }
        }
    });

    for (var i = 0 ; i < number ; i ++){
        db.ins('bench', {
            idNum : i ,
            value : require('/lib/intRandom').createIntRandom(number)
        })
    }

    var str = db.$export();
    var file  = Ti.Filesystem.getFile(
        Titanium.Filesystem.applicationDataDirectory, filename
    );
    file.write(str);
    writeEnd = Date.now();


    // DBソート計測
    sortStart = Date.now();
    var newFile  = Ti.Filesystem.getFile(
        Titanium.Filesystem.applicationDataDirectory, filename
    );
    var str = newFile.read();
    var newDB = jsrel.$import("newTestDB", str);

    var rows = db.find('bench', null, {order : "value"});
    /*
    var length = rows.length;
    for (var i = 0 ; i < length ; i ++ ) {
        console.log('ID ' + rows[i].idNum + ' : ' + rows[i].value);
    }
    */
    sortEnd = Date.now();

    // 事後処理
    // require はキャッシュするので tableの中身を全削除


    return {
        write: writeEnd - writeStart,
        sort : sortEnd - sortStart
    }
};