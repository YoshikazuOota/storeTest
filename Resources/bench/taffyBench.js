exports.taffyBenchCal = function (params) {

    var number = params.number;
    var writeStart;
    var writeEnd;
    var sortStart;
    var sortEnd;

    var filename = 'taffyDB';

    // DB 初期化処理
    var Taffy = require('lib/taffy').taffy;
    var db = Taffy();

    // DB書き込み計測
    writeStart = Date.now();
    for (var i = 0 ; i < number ; i ++){
        db.insert({
            id : i,
            value: require('/lib/intRandom').createIntRandom(number)
        });
    }
    db.saveFlatFile(filename);
    writeEnd = Date.now();

    // DBソート計測
    sortStart = Date.now();
    var MyDB = Taffy( Taffy.loadFlatFile(filename));
    rows = MyDB().order("value").each(function (row) {
        //console.log('ID ' + row.id + ' : ' + row.value);
    });
    sortEnd = Date.now();

    return {
        write: writeEnd - writeStart,
        sort : sortEnd - sortStart
    }
};