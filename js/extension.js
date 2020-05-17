function copItem(idTask, allTask, idTaskItem, copInfo) {
  let copInf = JSON.parse(copInfo);
  AllTasksParse = JSON.parse(allTask);
  task = AllTasksParse[idTask];
  taskExecParse = JSON.parse(task.execTask);
  if (taskExecParse[idTaskItem].color != undefined && taskExecParse[idTaskItem].color != "") {
    let i = 0;
    if (document.querySelector("#details > ul") != null) {
      while (i < document.querySelector("#details > ul").childNodes.length) {
        let name = document.querySelector("#details > ul").childNodes[i].firstChild.dataset.styleName.toLowerCase().trim();
        if (name.includes(taskExecParse[idTaskItem].color) || taskExecParse[idTaskItem].color.trim() == "any") {
          if (findStore() == "us") {
            let usLink = document.location.origin + document.querySelector("#details > ul").childNodes[i].firstChild.dataset.url;
            chrome.runtime.sendMessage({ msg: "findingLink", idtask: idTask, idtaskitem: idTaskItem, link: usLink });
          } else {
            chrome.runtime.sendMessage({ msg: "findingLink", idtask: idTask, idtaskitem: idTaskItem, link: document.querySelector("#details > ul").childNodes[i].firstChild.href });
          }
          return false;
        }
        i++;
      }
    } else if (taskExecParse[idTaskItem].color.trim() == "any" || taskExecParse[idTaskItem].color.trim() == document.querySelector("#details > p.style.protect").innerText.trim().toLowerCase()) {
      chrome.runtime.sendMessage({ msg: "findingLink", idtask: idTask, idtaskitem: idTaskItem, link: document.location.href });
      return false;
    }
    chrome.runtime.sendMessage({ msg: "error", idtask: idTask, id: "102" });
    return false;
  }

  let catName = findCat();
  let soldOut = document.getElementById("add-remove-buttons").innerText.includes("sold out");

  if (soldOut) {
    chrome.runtime.sendMessage({ msg: "soldOut", idtask: idTask, idtaskitem: idTaskItem }, function (callback) {
      if (callback == "next") {
        addToBasket(idTask, idTaskItem);
      } else {
        setTimeout(`soldOutRefresh(${idTask},${idTaskItem})`, copInf.timerRestock);
      }
    });
    return false;
  }

  switch (catName) {
    case "shoes":
      selectSize(task.shoeSize, idTask, idTaskItem, copInf);
      break;

    case "pants":
      let sizeTxt = document.getElementById("size")[0] != undefined ? document.getElementById("size")[0].innerText : "molo";
      if (isNaN(sizeTxt)) {
        selectSize(task.size, idTask, idTaskItem, copInf);
      } else {
        selectSize(task.pantSize, idTask, idTaskItem, copInf);
      }

      break;

    default:
      selectSize(task.size, idTask, idTaskItem, copInf);
      break;
  }
}

function findStore() {
  if (document.body.classList[2].includes("us")) {
    return "us";
  }
  return "eu";
}

function soldOutRefresh(idTask, idTaskItem) {
  chrome.runtime.sendMessage({ msg: "refreshCop", idtask: idTask, idtaskitem: idTaskItem });
}

function findCat() {
  return window.location.pathname.split("/")[2];
}

function selectSize(sizeWanted, idTask, idTaskItem, copInf) {
  let sizeForm = document.getElementById("size") || document.getElementById("s");
  let i = 0;
  if (sizeForm[0] == undefined && document.getElementsByClassName("button in-cart")[0] != undefined) {
    addToBasket(idTask, idTaskItem);
    return false;
  } else if ((sizeForm[0] == undefined && document.getElementsByClassName("button in-cart")[0] == undefined) || sizeWanted == "any") {
    document.getElementsByName("commit")[0].click();
    setTimeout(`addToBasket(${idTask},${idTaskItem})`, setTimerChanges(copInf));
  }
  while (i < sizeForm.length) {
    let html = sizeForm[i] != undefined ? sizeForm[i].innerText.trim() : sizeWanted;
    if (html == sizeWanted || sizeWanted == "any" || html.toLowerCase().includes(sizeWanted)) {
      if (sizeForm[i]) sizeForm.value = sizeForm[i].value;

      document.getElementsByName("commit")[0].click();
      setTimeout(`addToBasket(${idTask},${idTaskItem})`, setTimerChanges(copInf));

      break;
    } else if (i == sizeForm.length - 1) {
      setTimeout(`soldOutRefresh(${idTask},${idTaskItem})`, copInf.timerRestock);
      break;
    }
    i++;
  }
}

function setTimerChanges(copInf) {
  if (copInf.timerChanges == undefined || copInf.timerChanges == null || copInf.timerChanges == "") {
    return 1000;
  }
  return copInf.timerChanges;
}

function addToBasket(idTask, idTaskItem) {
  chrome.runtime.sendMessage({ msg: "addItemToBasket", idtask: idTask, idtaskitem: idTaskItem });
}

function checkout(idTask, persoInfos, cardInfos, allTasks) {
  cardInfosParse = JSON.parse(cardInfos);
  persoInfosParse = JSON.parse(persoInfos);
  allTasksParse = JSON.parse(allTasks);

  let cardYear = cardInfosParse.expiry.split("/")[1].trim();
  let cardMonth = cardInfosParse.expiry.split("/")[0].trim();
  if (cardInfosParse.expiry.split("/")[1].trim().length == 2) {
    cardYear = "20" + cardInfosParse.expiry.split("/")[1].trim();
  }

  document.getElementById("order_billing_name").value = persoInfosParse.name;
  document.getElementById("order_email").value = persoInfosParse.mail;
  document.getElementById("order_tel").value = persoInfosParse.tel;
  document.getElementById("bo").value = persoInfosParse.address;
  document.getElementById("order_billing_city").value = persoInfosParse.city;
  document.getElementById("order_billing_zip").value = persoInfosParse.postcode;
  document.getElementById("order_billing_country").value = persoInfosParse.country;
  document.getElementById("order_billing_country").dispatchEvent(new Event("change"));

  let delay = allTasksParse[idTask].checkoutDelay;
  calTime(delay, "nbcBefore");
  if (findStore() == "us") {
    document.getElementById("order_billing_state").value = persoInfosParse.state;
    document.getElementById("order_billing_state").dispatchEvent(new Event("change"));

    setTimeout(function () {
      writeNumberCard(cardInfosParse.number, "rnsnckrn", 1, delay, function () {
        setTimeout(function () {
          writeNumberCard(cardInfosParse.cvc, "orcer", 1, delay);
        }, calTime(delay, "nbcBefore"));
      });
    }, calTime(delay, "nbcBefore"));
  } else {
    document.getElementById("credit_card_type").value = cardInfosParse.type;

    setTimeout(function () {
      writeNumberCard(cardInfosParse.number, "cnb", 1, delay, function () {
        setTimeout(function () {
          writeNumberCard(cardInfosParse.cvc, "vval", 1, delay);
        }, calTime(delay, "nbcBefore"));
      });
    }, calTime(delay, "nbcBefore"));
  }

  setTimeout(function () {
    writeExpiry("credit_card_month", "credit_card_year", cardMonth, cardYear, 1, delay);
  }, calTime(delay, "expiry"));

  chrome.runtime.sendMessage({ msg: "fillCheckout", idtask: idTask }, (rep) => {
    if (rep.callback != 0) {
      setTimeout(`checkoutClick(${idTask})`, rep.timer);
    }
  });
  chrome.runtime.sendMessage({ msg: "endTimer", idtask: "0" });
}

function writeExpiry(idM, idY, cardM, cardY, type, delay) {
  let elemM = document.getElementById(idM);
  let elemY = document.getElementById(idY);

  if (type == 1) {
    evtClickSouris(document.getElementById(idM));
    elemM.dispatchEvent(new Event("focus"));
    elemM.value = cardM;
    elemM.dispatchEvent(new Event("change"));
    elemM.dispatchEvent(new Event("blur"));
    setTimeout(function () {
      writeExpiry(idM, idY, cardM, cardY, 0, delay);
    }, calTime(delay, "expiry"));
  } else {
    evtClickSouris(document.getElementById(idY));
    elemY.dispatchEvent(new Event("focus"));
    elemY.value = cardY;
    elemY.dispatchEvent(new Event("change"));
    elemY.dispatchEvent(new Event("blur"));
  }

  return false;
}

function writeNumberCard(number, id, i = 0, delay, callback) {
  let elem = document.getElementById(id);

  if (i == 1) {
    evtClickSouris(document.getElementById(id));
    elem.dispatchEvent(new Event("focus"));
  }
  let nbr = number.substring(0, i);
  evtEnterKey(nbr.substr(nbr.length - 1), elem);
  if (i >= number.length && (id == "cnb" || id == "rnsnckrn")) {
    elem.value = number;

    evtInput(nbr.substr(nbr.length - 1), elem);
    elem.dispatchEvent(new Event("change"));
    elem.dispatchEvent(new Event("blur"));

    callback();
    return;
  } else if (i >= number.length) {
    elem.value = number;

    evtInput(nbr.substr(nbr.length - 1), elem);
    elem.dispatchEvent(new Event("change"));
    elem.dispatchEvent(new Event("blur"));
    evtClickSouris(document.getElementsByClassName("icheckbox_minimal")[1]);
    return;
  }

  elem.value = number.substring(0, i);

  evtInput(nbr.substr(nbr.length - 1), elem);

  setTimeout(function () {
    writeNumberCard(number, id, i + 1, delay, callback);
  }, calTime(delay, "letter"));
}

function calTime(time, type) {
  let res;
  switch (type) {
    case "nbcBefore":
      res = (time / 100) * 15;
      break;
    case "letter":
      res = (time / 100) * 60;
      res /= 20;
      let min = (res / 100) * 70;
      res = randomNumber(min, res);
      break;
    case "expiry":
      res = (time / 100) * 5;
      break;
  }
  return res;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function evtInput(number, elem) {
  let codeNumber = number.toString();
  codeNumber = codeNumber.charCodeAt();

  elem.dispatchEvent(
    new InputEvent("textInput", {
      data: number,
      bubbles: true,
    })
  );

  elem.dispatchEvent(
    new InputEvent("input", {
      data: number,
      bubbles: true,
      inputType: "insertText",
    })
  );

  elem.dispatchEvent(
    new KeyboardEvent("keyup", {
      key: number,
      keyCode: codeNumber,
      shiftKey: true,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      wish: codeNumber,
    })
  );
  return false;
}

function evtEnterKey(number, elem) {
  let codeNumber = number.toString();
  codeNumber = codeNumber.charCodeAt();

  let evt = new KeyboardEvent("keydown", {
    key: number,
    keyCode: codeNumber,
    shiftKey: true,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    wish: codeNumber,
  });
  let evt2 = new KeyboardEvent("keypress", {
    key: number,
    keyCode: codeNumber,
    shiftKey: true,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    wish: codeNumber,
  });

  elem.dispatchEvent(evt);
  elem.dispatchEvent(evt2);

  return false;
}

function evtClickSouris(id) {
  let evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 20,
  });
  id.dispatchEvent(evt);
  return false;
}

function checkoutClick(idTask) {
  evtClickSouris(document.getElementsByName("commit")[0]);
  setTimeout(`checkError(${idTask})`, 15000);
}

function checkError(idTask) {
  if (document.querySelector("#cart-cc > fieldset > div.errors") != undefined) {
    chrome.runtime.sendMessage({ msg: "error", idtask: idTask, id: "301" });
  }
}

checkConfirmation();

function checkConfirmation() {
  if (window.location.href == "https://www.supremenewyork.com/checkout") {
    if (document.querySelector("#tabs > div.tab.tab-confirmation").className.includes("selected")) {
      chrome.runtime.sendMessage({ msg: "successCop" });
      return false;
    }
  }
  setTimeout(checkConfirmation, 3000);
  return false;
}
