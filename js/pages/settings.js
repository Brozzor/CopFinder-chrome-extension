window.addEventListener("load", function load(event) {
  readCardInfo();
  readPersoInfo();
  readCopInfo();
  readProxyInfo();
  let createButton = document.getElementById("addInformation");
  createButton.addEventListener("click", function () {
    addInformation();
  });

  let createButton1 = document.getElementById("addCard");
  createButton1.addEventListener("click", function () {
    addCard();
  });

  let createButton2 = document.getElementById("addCop");
  createButton2.addEventListener("click", function () {
    addCop();
  });

  let createButton3 = document.getElementById("addProxy");
  createButton3.addEventListener("click", function () {
    addProxy();
  });
});

function addInformation() {
  let persoInfo = {
    name: document.getElementById("inputName").value,
    mail: document.getElementById("inputMail").value,
    tel: document.getElementById("inputTel").value,
    city: document.getElementById("inputCity").value,
    postcode: document.getElementById("inputPostcode").value,
    country: document.getElementById("inputCountry").value,
    address: document.getElementById("inputAddress").value,
    state: document.getElementById("inputState").value,
  };
  localStorage["persoInfo"] = JSON.stringify(persoInfo);
}

function addCard() {
  let cardInfo = {
    number: document.getElementById("inputNumber").value,
    expiry: document.getElementById("inputExpiry").value,
    cvc: document.getElementById("inputCvc").value,
    type: document.getElementById("inputCardType").value,
  };
  localStorage["cardInfo"] = JSON.stringify(cardInfo);
}

function addCop() {
  let copInfo = {
    soldOut: document.getElementById("soldOut").value,
    timerRestock: document.getElementById("timerRestock").value,
    timerChanges: document.getElementById("timerChanges").value,
    checkError: document.getElementById("checkError").value,
    checkSuccess: document.getElementById("checkSuccess").value,
  };
  localStorage["copInfo"] = JSON.stringify(copInfo);
}

function addProxy() {
  if (document.getElementById("proxyNameInput").value == null || document.getElementById("proxyIpInput").value == null){
    return false;
  }
  let proxyInfo = {
    name: document.getElementById("proxyNameInput").value,
    ip: document.getElementById("proxyIpInput").value
  };

  if (localStorage["proxyInfo"] == undefined || localStorage["proxyInfo"] == "" || localStorage["proxyInfo"] == "[]") {
    localStorage["proxyInfo"] = "[" + JSON.stringify(proxyInfo) + "]";
  } else {
    let lastList = localStorage["proxyInfo"].substr(0, localStorage["proxyInfo"].length - 1);
    localStorage["proxyInfo"] = lastList + "," + JSON.stringify(proxyInfo) + "]";
  }
  window.location.href="/pages/settings.html"
}

function readCopInfo() {
  if (localStorage["copInfo"] != null || localStorage["copInfo"] != undefined) {
    let infoCop = JSON.parse(localStorage["copInfo"]);
    document.getElementById("soldOut").value = infoCop.soldOut;
    document.getElementById("timerRestock").value = infoCop.timerRestock;
    document.getElementById("timerChanges").value = infoCop.timerChanges || 1000;
    document.getElementById("checkError").value = infoCop.checkError;
    document.getElementById("checkSuccess").value = infoCop.checkSuccess;
  }
}

function readCardInfo() {
  if (localStorage["cardInfo"] != null || localStorage["cardInfo"] != undefined) {
    let infoCard = JSON.parse(localStorage["cardInfo"]);
    document.getElementById("inputNumber").value = infoCard.number;
    document.getElementById("inputExpiry").value = infoCard.expiry;
    document.getElementById("inputCvc").value = infoCard.cvc;
    document.getElementById("inputCardType").value = infoCard.type;
  }
}

function readPersoInfo() {
  if (localStorage["persoInfo"] != null || localStorage["persoInfo"] != undefined) {
    let infoPerso = JSON.parse(localStorage["persoInfo"]);
    document.getElementById("inputName").value = infoPerso.name;
    document.getElementById("inputMail").value = infoPerso.mail;
    document.getElementById("inputTel").value = infoPerso.tel;
    document.getElementById("inputCity").value = infoPerso.city;
    document.getElementById("inputPostcode").value = infoPerso.postcode;
    document.getElementById("inputCountry").value = infoPerso.country;
    document.getElementById("inputAddress").value = infoPerso.address;
    document.getElementById("inputState").value = infoPerso.state;
  }
}

function readProxyInfo() {
  if (localStorage.proxyInfo == undefined || localStorage.proxyInfo == "" || localStorage.proxyInfo == "[]") {
    document.getElementById('noProxy').innerHTML = 'You have no proxy server';
    return false;
  }
  let proxyInfo = JSON.parse(localStorage.proxyInfo);
  let i = 0;
  while (i < proxyInfo.length){
  document.getElementById('proxyTable').innerHTML += `
    <tr id="proxyTable${i}">
      <th scope="row">${proxyInfo[i].name}</th>
      <td>${proxyInfo[i].ip}</td>
      <td><button name="proxyDel" data-id="${i}" class="btn btn-sm">❌</button></td>
    </tr>`;
    i++;
  }
  proxyFinderDel();
}

function proxyFinderDel() {
  let proxyInfo = JSON.parse(localStorage.proxyInfo);
  document.getElementsByName("proxyDel").forEach(item => {
    item.addEventListener("click", event => {
      document.getElementById(`proxyTable${item.dataset.id}`).remove();
      proxyInfo.splice(item.dataset.id, 1);
      localStorage.proxyInfo = JSON.stringify(proxyInfo);
    });
  });
}