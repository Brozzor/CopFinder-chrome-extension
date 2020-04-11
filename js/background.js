let start;
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
  xhr.open("POST", "https://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use + argv);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res.status == "1" || res[0].status == "1") {
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
  if (localStorage.AllTasks == undefined){
    return false;
  }
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
        if (AllTasksParse[i].stateTimerBtn == "true") {
          execTaskTimer(i, AllTasksParse[i].timer);
        } else {
          execTask(i);
        }
      }
      changeStorageValue(AllTasksParse);
    }
    i++;
  }

  return false;
}

function execTaskTimer(idTask, timeToCop) {
  var newURL = window.location.protocol + "//" + window.location.host + "/pages/timer.html?idt=" + idTask + "&ttc=" + timeToCop;
  createSupremeTab(newURL);
}

function execTask(nb) {
  start = Math.round(new Date().getTime());
  createSupremeTab("https://www.supremenewyork.com/shop/all/").then(tabid => {
    let AllTasksParse = JSON.parse(localStorage.AllTasks);
    AllTasksParse[nb].execTask = "";
    AllTasksParse[nb].tabId = tabid;
    changeStorageValue(AllTasksParse);
    fetch("https://www.supremenewyork.com/mobile_stock.json")
      .then(result => result.json())
      .then(data => {
        let allItems = [];
        for (let i in data.products_and_categories) {
          let j = 0;
          while (j < data.products_and_categories[i].length) {
            allItems.push(data.products_and_categories[i][j]);
            j++;
          }
        }
        findLink(AllTasksParse[nb].cat, AllTasksParse[nb].keywordFinder, nb, allItems);
      });
  });
}

createSupremeTab = URL => {
  return new Promise(function(accept, reject) {
    chrome.tabs.create(
      {
        url: URL
      },
      tab => {
        accept(tab.id);
      }
    );
  });
};

cop = (idTask, idTaskItem, AllTasks, copInfo) => {
  let task = JSON.parse(localStorage.AllTasks);
  task = task[idTask];
  let AllTasksExecParse = JSON.parse(task.execTask);

  updateTab(task.tabId, AllTasksExecParse[idTaskItem].link, () => {
    chrome.tabs.executeScript(task.tabId, {
      code: "copItem(" + idTask + "," + JSON.stringify(AllTasks) + "," + idTaskItem + "," + JSON.stringify(copInfo) + ")"
    });
  });
};

checkout = (idTask, persoInfo, cardInfo) => {
  let task = JSON.parse(localStorage.AllTasks);
  task = task[idTask];
  updateTab(task.tabId, "https://www.supremenewyork.com/checkout", () => {
    chrome.tabs.executeScript(task.tabId, {
      code: "checkout(" + idTask + "," + JSON.stringify(persoInfo) + "," + JSON.stringify(cardInfo) + ")"
    });
  });
};

function findLink(cats, keywords, taskNb, data, nbRefresh = 0) {
  let AllTasksParse = JSON.parse(localStorage.AllTasks);
  let words = keywords;
  let i = 0;
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
  let k = 0;
  while (k < data.length) {
    let mdl = data[k].name.toLowerCase();
    if (mdl.includes(mdlFind)) {
      finalInsert = {
        link: "https://www.supremenewyork.com/shop/" + data[k].id,
        taskNb: taskNb,
        color: colorFind
      };
      break;
    }
    k++;
  }


  if (finalInsert != null || finalInsert != undefined) {
    if (AllTasksParse[finalInsert.taskNb].execTask == undefined || AllTasksParse[finalInsert.taskNb].execTask == "") {
      AllTasksParse[finalInsert.taskNb].execTask = "[" + JSON.stringify(finalInsert) + "]";
    } else {
      let lastList = AllTasksParse[finalInsert.taskNb].execTask.substr(0, AllTasksParse[finalInsert.taskNb].execTask.length - 1);
      AllTasksParse[finalInsert.taskNb].execTask = lastList + "," + JSON.stringify(finalInsert) + "]";
    }
    changeStorageValue(AllTasksParse);
  }else{
    if (AllTasksParse[taskNb].stateTimerBtn == "true" && AllTasksParse[taskNb].timer != null && AllTasksParse[taskNb].state == 1 && nbRefresh <= 40){
      nbRefresh++;
      setTimeout(function() { findLink(cats, keywords, taskNb, data,nbRefresh); }, 500);
    }else{
      errorManager(taskNb, '101');
    }
    return false;
  }

  i++;
  }
  cop(taskNb, 0, localStorage.AllTasks, localStorage.copInfo);
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

function errorManager(taskID, id){
  let AllTasksParse = JSON.parse(localStorage.AllTasks);
  let copInfo = JSON.parse(localStorage.copInfo);
  console.log(id)
  if (copInfo.checkError == 'send'){
    notificationsSend('errorNotif', `Error detected on task n°${taskID}`, `Error code : ${id}`)
  }
  AllTasksParse[taskID].status = id;
  AllTasksParse[taskID].state = "0";
  changeStorageValue(AllTasksParse);
  chrome.tabs.remove(AllTasksParse[taskID].tabId); 
}

function notificationsSend(name, title, message){
   chrome.notifications.create(name, {type:'basic', iconUrl: '/img/icon.png', title: title,message: message});
   clearNotif(name);
}
function clearNotif(name){
  chrome.notifications.clear(name);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let AllTasksParse = JSON.parse(localStorage.AllTasks);

  let task;
  if (request.msg != "startCopTimer") {
    task = JSON.parse(AllTasksParse[request.idtask].execTask);
  }

  switch (request.msg) {
    case "addItemToBasket":
      if (task.length - 1 == request.idtaskitem) {
        sendResponse("checkout");
        checkout(request.idtask, localStorage.persoInfo, localStorage.cardInfo);
      } else {
        let newID = parseInt(request.idtaskitem) + 1;
        cop(request.idtask, newID, localStorage.AllTasks, localStorage.copInfo);
      }
      break;

    case "fillCheckout":
      if (AllTasksParse[request.idtask].checkout == "true" && AllTasksParse[request.idtask].stateCheckoutBtn == "true") {
        sendResponse({
          callback: "checkout",
          timer: AllTasksParse[request.idtask].checkoutDelay
        });
      } else if (AllTasksParse[request.idtask].checkout == "true" && AllTasksParse[request.idtask].stateCheckoutBtn == "false") {
        sendResponse({
          callback: "checkout",
          timer: "0"
        });
      } else {
        sendResponse(0);
        AllTasksParse[request.idtask].status = "Successfully";
        changeStorageValue(AllTasksParse);
      }

      break;
    case "soldOut":
      let copInfo = localStorage.copInfo;
      if (copInfo.solOut == "next") {
        sendResponse("next");
        let newID = parseInt(request.idtaskitem) + 1;
        cop(request.idtask, newID, localStorage.AllTasks, localStorage.copInfo);
      } else {
        sendResponse("wait");
        //setTimeout(`cop(${request.idtask}, ${request.idtaskitem}, ${JSON.stringify(localStorage.AllTasks)})`, 5000)
      }
      break;
    case "refreshCop":
      cop(request.idtask, request.idtaskitem, localStorage.AllTasks, localStorage.copInfo);
      break;

    case "stopBot":
      chrome.tabs.remove(AllTasksParse[request.idtask].tabId);

      break;
    case "findingLink":
      task[request.idtaskitem].link = request.link;
      task[request.idtaskitem].color = "";
      AllTasksParse[request.idtask].execTask = JSON.stringify(task);
      changeStorageValue(AllTasksParse);
      if (request.idtaskitem == task.length - 1){
        cop(request.idtask, 0, localStorage.AllTasks, localStorage.copInfo);
      }else{
        let newID = parseInt(request.idtaskitem) + 1;
        cop(request.idtask, newID, localStorage.AllTasks, localStorage.copInfo);
      }
      break;
    case "startCopTimer":
      execTask(request.idtask);
      break;
    case "endTimer":
      console.log(Math.round(new Date().getTime() - start));
      break;
    case "error":
        errorManager(request.idtask,request.id);
      break;
  }
});
