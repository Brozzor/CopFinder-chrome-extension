let tabId;

checkKey();
checkTask("1");

setInterval(checkKey, 3600000);
setInterval(checkTask, 2000);

function checkKey() {
  if (localStorage["keyG"] != null && localStorage["keyG"] != "") {
    requestApi("checkK", "", null);
  }
}

function requestApi(use, argv, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use + argv);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res.status == "1") {
        console.log("ddd");
        if (callback != null) {
          callback(res);
        }
      } else {
        localStorage.keyG = null;
      }
    }
  };
}

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
    if (AllTasksParse[i].status == "On Play") {
      if (reset == "1") {
        AllTasksParse[i].status = "On Pause";
        AllTasksParse[i].state = "0";
      } else if (AllTasksParse[i].state == "0") {
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
  createSupremeTab()
    .then(tabid => {
      tabId = tabid
      let AllTasksParse = JSON.parse(localStorage.AllTasks);
      keywords = AllTasksParse[nb].keywordFinder;
      cop(AllTasksParse[nb].cat[0], keywords,nb,'0');
    })
}

createSupremeTab = () => {
    return new Promise(function(accept, reject) {
        chrome.tabs.create({url:"https://www.supremenewyork.com/shop/all/"}, tab => {
            accept(tab.id);
        })
    })
}

cop = (catName,keywords,idTask,idCat) => {

    var url = "https://www.supremenewyork.com/shop/all/" + catName
    updateTab(tabId, url, () => {
 
      chrome.tabs.executeScript(tabId, { file: '/js/inject.js' }, function(){
        chrome.tabs.executeScript(tabId, {
            code: `findingArticleByKeyword('${keywords}', '${catName}', '${idTask}', '${idCat}' )`
        })
      })
    })
  
};

updateTab = (tabId, url, callback) => {
  //update url of current tab

    chrome.tabs.update(tabId, { url: url }, () => {
    chrome.tabs.onUpdated.addListener(function listenTab(tabnumber, info, tab) {
      if (tab.url == url && info.status == "complete") {
        chrome.tabs.onUpdated.removeListener(listenTab)
        callback()
      }
    })
  })
};

function copNext(newValue){
  let AllTasksParse = JSON.parse(localStorage.AllTasks);
  console.log(newValue);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch(request.msg) {

		case 'startCop':

            break;

    case 'keywordFindItem':
			copNext(request.value)
                
			break;
		
		
	}
})
