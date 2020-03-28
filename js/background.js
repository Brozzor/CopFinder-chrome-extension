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
    AllTasksParse[nb].execTask = "";
    changeStorageValue(AllTasksParse);
    findLink(AllTasksParse[nb].cat, AllTasksParse[nb].keywordFinder, nb);
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

cop = (idTask,idTaskItem,AllTasks) => {
  let task = JSON.parse(localStorage.AllTasks);
  task = task[idTask];
  let AllTasksExecParse = JSON.parse(task.execTask);
  
  updateTab(tabId, AllTasksExecParse[idTaskItem].link, () => {
    chrome.tabs.executeScript(tabId, {
      code: 'copItem(' + idTask + ','+ JSON.stringify(AllTasks) + ',' + idTaskItem + ')'
    });

  });
};

checkout = (idTask,persoInfo,cardInfo) => {
  
  updateTab(tabId, 'https://www.supremenewyork.com/checkout', () => {
    chrome.tabs.executeScript(tabId, {
      code: 'checkout(' + idTask + ','+ JSON.stringify(persoInfo)+','+ JSON.stringify(cardInfo)+')'
    });

  });
};

function findLink(cats, keywords, taskNb) {
  requestApi("item-all", "", function(res) {
    let i = 0;
    let words = keywords;
    let AllTasksParse = JSON.parse(localStorage.AllTasks);
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
        
        if (AllTasksParse[finalInsert.taskNb].execTask == undefined || AllTasksParse[finalInsert.taskNb].execTask == "") {
          AllTasksParse[finalInsert.taskNb].execTask = "[" + JSON.stringify(finalInsert) + "]";
        } else {
          let lastList = AllTasksParse[finalInsert.taskNb].execTask.substr(0, AllTasksParse[finalInsert.taskNb].execTask.length - 1);
          AllTasksParse[finalInsert.taskNb].execTask = lastList + "," + JSON.stringify(finalInsert) + "]";
        }
        //console.log(finalInsert);
        changeStorageValue(AllTasksParse);

      }

      i++;
    }

    cop(taskNb, 0, localStorage.AllTasks);
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let AllTasksParse = JSON.parse(localStorage.AllTasks);
  let task = JSON.parse(AllTasksParse[request.idtask].execTask);
  switch (request.msg) {
    case "addItemToBasket":
      
      if (task.length - 1 == request.idtaskitem){
        sendResponse('checkout');
        checkout(request.idtask,localStorage.persoInfo,localStorage.cardInfo);
      }else{
        let newID = parseInt(request.idtaskitem) + 1
        cop(request.idtask, newID, localStorage.AllTasks);
      }
      break;

    case "fillCheckout":

      if (AllTasksParse[request.idtask].checkout == "true" && AllTasksParse[request.idtask].stateCheckoutBtn == "true"){
        sendResponse({callback: 'checkout', timer: AllTasksParse[request.idtask].checkoutDelay});
      } else if (AllTasksParse[request.idtask].checkout == "true" && AllTasksParse[request.idtask].stateCheckoutBtn == "false"){
        sendResponse({callback: 'checkout', timer: '0'});
      } else {
        sendResponse(0);
        AllTasksParse[request.idtask].status = "Successfully";
        changeStorageValue(AllTasksParse);
      }

      break;
    case "soldOut":

      break;

    case "checkoutError":

      break;
  }
});
