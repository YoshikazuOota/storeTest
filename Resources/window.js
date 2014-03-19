exports.createWindow = function () {
    var window = Ti.UI.createWindow({
        backgroundColor: '#ffffff'
    });

    var uis = {};

    styles = {
        dataLabal : {
            text : 'データ件数 :',
            left : '10dp',
            top: '50dp'
        },
        inputFiled : {
            right: '10dp',
            top: '50dp',
            color: '#000000',
            value: 1000,
            hintText: 'データ件数入力',
            keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
            returnKeyType: Titanium.UI.RETURNKEY_DONE
        },
        sqlLabel : {
            title : 'SQLite 計測',
            left: '10dp',
            top: '80dp'
        },
        jsrelLabel: {
            title : 'jsrel 計測',
            left: '10dp',
            top: '150dp'
        },
        taffyLabel : {
            title : 'taffy 計測',
            left: '10dp',
            top: '220dp'
        }
    };

    // ui生成
    // uiの生成は処理が重いので非同期で行う
    window.addEventListener('open', function () {

        // input フィールド
        window.add(Ti.UI.createLabel(styles.dataLabal));
        uis.dataNumTextFiled = Ti.UI.createTextField(styles.inputFiled);
        window.add(uis.dataNumTextFiled);

        uis.sqliteButton = Ti.UI.createButton(styles.sqlLabel);
        uis.sqliteButton.addEventListener('click', function () {
            var calResult = require('/bench/sqliteBench').sqliteBenchCal({
                number : uis.dataNumTextFiled.value
            });
            alert(calResult);
        });
        window.add(uis.sqliteButton);

        // jsrel計測
        uis.jsrelButton = Ti.UI.createButton(styles.jsrelLabel);
        uis.jsrelButton.addEventListener('click', function () {
            var calResult = require('/bench/jsrelBench').sqliteBenchCal({
                number : uis.dataNumTextFiled.value
            });
            alert(calResult);
            alert('実装上の問題で連続計測できません。\n 一度計測したらアプリ再起動してください');
        });
        window.add(uis.jsrelButton);

        // taffy計測
        uis.taffyButton = Ti.UI.createButton(styles.taffyLabel);
        uis.taffyButton.addEventListener('click', function () {
            var calResult = require('/bench/taffyBench').taffyBenchCal({
                number : uis.dataNumTextFiled.value
            });
            alert(calResult);
        });
        window.add(uis.taffyButton);

    });

    return window;
};