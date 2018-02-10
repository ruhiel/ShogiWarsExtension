window.onload = ()=>{
    var player = document.title.match(/将棋ウォーズ棋譜\((.+)対(.+)\)/);
    var dateTime = document.URL.match(/([0-9]{4})([0-9]{2})([0-9]{2})_([0-9]{2})([0-9]{2})([0-9]{2})/);

    var kif = "V2.2\n";
    kif += "$START_TIME:"+ dateTime[1] + "/" + dateTime[2] + "/" + dateTime[3] + " " + dateTime[4] + ":" + dateTime[5] + ":" + dateTime[6] + "\n";
    kif += "N+" + player[1] + "\nN-" + player[2] + "\nPI\n";

    var x = document.getElementsByTagName("script");
    for(var i = 0; i < x.length; ++i){
        if ( x[i].innerHTML.match(/receiveMove/)) {
            var str = x[i].innerHTML.slice(x[i].innerHTML.indexOf("receiveMove"));
            str = str.substring(0,str.indexOf("\");"));
            str = str.slice(str.indexOf("\"") + 1);
            str = str.replace(/(GOTE|SENTE)_WIN_TORYO/g,"%TORYO");
            str = str.replace(/(GOTE|SENTE)_WIN_CHECKMATE/g,"%TSUMI");
            str = str.replace(/\t/g, "\n");
            kif += str;
            break;
        };
    }

    chrome.runtime.sendMessage({
        text: kif
    });
};