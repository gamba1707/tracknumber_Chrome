chrome.runtime.onInstalled.addListener(function(details) {
    /* コンテキストメニューを作成 */
    const parent = chrome.contextMenus.create({
        id: "track",
        title: "追跡",
        contexts: ["selection"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "JP",
        title: "日本郵便",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "yamato",
        title: "ヤマト運輸",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "sagawa",
        title: "佐川急便",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "seino",
        title: "西濃運輸",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "fukutsu",
        title: "福山通輸",
        contexts: ["all"],
    });
});

/* コンテキストメニューがクリックされた時の処理 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    //文字列を取得
    var select_text = info.selectionText;
    //一応デバックに何を押したか表示
    console.log("クリック (info.menuItemId)");

    switch (info.menuItemId) {
        case "JP":
            serch_JP(select_text);
            break;
        case "yamato":
            serch_yamato(select_text);
            break;
        case "sagawa":
            serch_sagawa(select_text);
            break;
        case "seino":
            serch_seino(select_text);
            break;
        case "fukutsu":
            serch_fukutsu(select_text);
            break;
    }
});

//日本郵便
function serch_JP(str) {
    console.log(
        "https://trackings.post.japanpost.jp/services/srv/search/?requestNo1=" +
        str +
        "&search=追跡スタート");
    chrome.tabs.create({
        url: "https://trackings.post.japanpost.jp/services/srv/search/?requestNo1=" +
            str + "&search=追跡スタート"
    });
}

//ヤマト運輸
function serch_yamato(str) {
    console.log(
        "http://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=" +
        str);
    chrome.tabs.create({
        url: "http://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=" +
            str
    });
}

//佐川急便
function serch_sagawa(str) {
    console.log("http://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=" +
        str);
    chrome.tabs.create({
        url: "http://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=" +
            str
    });
}

//西濃運輸
function serch_seino(str) {
    console.log("https://track.seino.co.jp/cgi-bin/gnpquery.pgm?GNPNO1=" + str);
    chrome.tabs.create({
        url: "https://track.seino.co.jp/cgi-bin/gnpquery.pgm?GNPNO1=" +
            str
    });
}

//福山通運
function serch_fukutsu(str) {
    console.log("https://corp.fukutsu.co.jp/situation/tracking_no_hunt/" + str);
    chrome.tabs.create({
        url: "https://corp.fukutsu.co.jp/situation/tracking_no_hunt/" +
            str
    });
}
