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
      if (res.status == "1" || res[0].status == "1") {
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
  createSupremeTab().then(tabid => {
    tabId = tabid;
    let AllTasksParse = JSON.parse(localStorage.AllTasks);
    //cop(AllTasksParse[nb].cat[0], AllTasksParse[nb].keywordFinder, nb, "0");
    copTest(AllTasksParse[nb].cat, AllTasksParse[nb].keywordFinder, nb);
  });
}

createSupremeTab = () => {
  return new Promise(function(accept, reject) {
    chrome.tabs.create(
      {
        url: "https://www.supremenewyork.com/shop/all/"
      },
      tab => {
        accept(tab.id);
      }
    );
  });
};

cop = (catName, keywords, idTask, idCat) => {
  if (catName == undefined) {
    finishFindItems();
    return false;
  }
  var url = "https://www.supremenewyork.com/shop/all/" + catName;
  updateTab(tabId, url, () => {
    chrome.tabs.executeScript(
      tabId,
      {
        file: "/js/inject.js"
      },
      function() {
        chrome.tabs.executeScript(tabId, {
          code: `findingArticleByKeyword('${keywords}', '${catName}', '${idTask}', '${idCat}' )`
        });
      }
    );
  });
};

function copTest(cats, keywords, taskNb) {
  requestApi("item-all", "", function(res) {
    let i = 0;
    let words = keywords;

    while (i < words.length) {
      let finalInsert;
      
      let mdlFind = words[i]
        .split("/")[0]
        .toLowerCase()
        .trim();
      let colorFind = words[i]
        .split("/")[1]
        .toLowerCase()
        .trim();
      let j = 1;
      while (j < res.length) {
        let mdl = res[j].title.toLowerCase().trim();
        let color = res[j].model.toLowerCase().trim();

        if (colorFind == "") {
          color = true;
        }
        if (color.includes(colorFind) && mdl.includes(mdlFind)) {
          finalInsert = {
            link: res[j].link,
            taskNb: taskNb
          };
        }

        j++;
      }
      if (finalInsert != null || finalInsert != undefined) {
        let AllTasksParse = JSON.parse(localStorage.AllTasks);

        if (AllTasksParse[finalInsert.taskNb].execTask == undefined || AllTasksParse[finalInsert.taskNb].execTask == "") {
          AllTasksParse[finalInsert.taskNb].execTask = "[" + JSON.stringify(finalInsert) + "]";
        } else {
          let lastList = AllTasksParse[finalInsert.taskNb].execTask.substr(0, AllTasksParse[finalInsert.taskNb].execTask.length - 1);
          AllTasksParse[finalInsert.taskNb].execTask = lastList + "," + JSON.stringify(finalInsert) + "]";
        }
        console.log(finalInsert);
        changeStorageValue(AllTasksParse);
      }

      i++;
    }
  });
}

updateTab = (tabId, url, callback) => {
  //update url of current tab

  chrome.tabs.update(
    tabId,
    {
      url: url
    },
    () => {
      chrome.tabs.onUpdated.addListener(function listenTab(tabnumber, info, tab) {
        if (tab.url == url && info.status == "complete") {
          chrome.tabs.onUpdated.removeListener(listenTab);
          callback();
        }
      });
    }
  );
};

function copNext(newValue) {
  console.log(newValue);
  let AllTasksParse = JSON.parse(localStorage.AllTasks);
  if (newValue.link != undefined) {
    if (AllTasksParse[newValue.taskNb].execTask == undefined || AllTasksParse[newValue.taskNb].execTask == "") {
      AllTasksParse[newValue.taskNb].execTask = "[" + JSON.stringify(newValue) + "]";
    } else {
      let lastList = AllTasksParse[newValue.taskNb].execTask.substr(0, AllTasksParse[newValue.taskNb].execTask.length - 1);
      AllTasksParse[newValue.taskNb].execTask = lastList + "," + JSON.stringify(newValue) + "]";
    }
    changeStorageValue(AllTasksParse);
  }
  //console.log('---')
  //console.log(AllTasksParse[newValue.taskNb].keywordFinder[newValue.idword])
  //console.log(newValue.wordname)
  //console.log(newValue);
  //console.log('---')
  if (AllTasksParse[newValue.taskNb].keywordFinder[newValue.idword + 1] == undefined) {
    let idCat = newValue.idcat + 1;
    let keywords = AllTasksParse[newValue.taskNb].keywordFinder;
    cop(AllTasksParse[newValue.taskNb].cat[idCat], keywords, newValue.taskNb, idCat);
  }
}

function finishFindItems() {
  console.log("ouiiiiiiiii");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.msg) {
    case "startCop":
      break;

    case "keywordFindItem":
      copNext(request.value);

      break;
  }
});
