exports.sqliteBenchCal = function (params) {

    var number = params.number;
    var writeStart;
    var writeEnd;
    var sortStart;
    var sortEnd;

    // DB 初期化処理
    var db = Titanium.Database.open('test_db');
    db.execute('DROP TABLE IF EXISTS DATABASETEST');
    db.execute('CREATE TABLE IF NOT EXISTS DATABASETEST (ID INTEGER, VALUE INTEGER)');
    db.close();

    // DB書き込み計測
    writeStart = Date.now();
    db = Titanium.Database.open('test_db');
    db.execute('BEGIN');
    for (var i = 0 ; i < number ; i ++){
        db.execute('INSERT INTO DATABASETEST (ID, VALUE) VALUES(?,?)',
            i,
            require('/lib/intRandom').createIntRandom(number)
        );
    }
    db.execute('COMMIT');
    db.close();
    writeEnd = Date.now();


    // DBソート計測
    sortStart = Date.now();
    db = Titanium.Database.open('test_db');
    rows = db.execute('SELECT * FROM DATABASETEST ORDER BY value');
    //while(rows.isValidRow()){
    //    Titanium.API.info('ID: ' + rows.fieldByName('ID') + ' : ' + rows.fieldByName('VALUE'));
    //    rows.next();
    //}
    db.close();
    sortEnd = Date.now();

    return {
        write: writeEnd - writeStart,
        sort : sortEnd - sortStart,
    }
};