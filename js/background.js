checkKey();
checkTask('1');

setInterval(checkKey, 3600000);
setInterval(checkTask, 2000);

function checkKey() {
    if (localStorage['keyG'] != null && localStorage['keyG'] != "") {
        requestApi("checkK", "", null)
    }
}

function requestApi(use, argv, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://cop-finder.com/api/api.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("key=" + localStorage["keyG"] + "&use=" + use + argv);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == "1") {
                console.log('ddd')
                if (callback != null) {
                    callback(res);
                }
            } else {
                localStorage.keyG = null;
            }
        }
    };
};


function changeStorageValue(AllTasksParse) {
    AllTasksParse = JSON.stringify(AllTasksParse);
    localStorage.AllTasks = AllTasksParse;
}

function checkTask(reset = 0) {

    let AllTasksParse = JSON.parse(localStorage.AllTasks);

    if (AllTasksParse == "null" || AllTasksParse == undefined || AllTasksParse == "") {
        return false;
    }

    let i = 0;
    while (i < AllTasksParse.length) {
        if (AllTasksParse[i].status == 'On Play') {
            if (reset == '1') {
                AllTasksParse[i].status = "On Pause";
                AllTasksParse[i].state = "0";
            } else if (AllTasksParse[i].state == '0') {
                AllTasksParse[i].state = "1";
                execTask(i);
            }
            changeStorageValue(AllTasksParse);
        }
        i++;
    }

    return false;
}

function execTask(nb) {

    let AllTasksParse = JSON.parse(localStorage.AllTasks);

    console.log(AllTasksParse[nb])
}