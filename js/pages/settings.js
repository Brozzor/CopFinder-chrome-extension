window.addEventListener("load", function load(event) {
  readCardInfo();
  readPersoInfo();
    let createButton = document.getElementById("addInformation");
    createButton.addEventListener("click", function() {
      addInformation();
    });

    let createButton1 = document.getElementById("addCard");
    createButton1.addEventListener("click", function() {
      addCard();
    });

  });

function addInformation(){

  let persoInfo = { 
    "name": document.getElementById("inputName").value,
    "mail": document.getElementById("inputMail").value,
    "tel": document.getElementById("inputTel").value,
    "city": document.getElementById("inputCity").value,
    "postcode": document.getElementById("inputPostcode").value,
    "country": document.getElementById("inputCountry").value,
    "address": document.getElementById("inputAddress").value
 };
 localStorage['persoInfo'] = JSON.stringify(persoInfo);
 addInfoPersoInBdd(persoInfo);
}

function addInfoPersoInBdd(inf) {
  let xhr = new XMLHttpRequest();
  let use = "perso-insert";
  xhr.open("POST", "http://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "key=" +
      localStorage["keyG"] +
      "&use=" +
      use +
      "&name=" +
      inf.name +
      "&mail=" +
      inf.mail +
      "&tel=" +
      inf.tel +
      "&city=" +
      inf.city +
      "&postcode=" +
      inf.postcode +
      "&country=" +
      inf.country +
      "&address=" +
      inf.address 
  );
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res.status == "1") {
      } else {
        localStorage["keyG"] = null;
        window.location.href = "/popup.html";
      }
    }
  };
}

function addCard(){

  let cardInfo = { 
    "number": document.getElementById("inputNumber").value,
    "expiry": document.getElementById("inputExpiry").value,
    "cvc": document.getElementById("inputCvc").value,
    "type": document.getElementById("inputCardType").value
 };
 localStorage['cardInfo'] = JSON.stringify(cardInfo);
}

function readCardInfo(){
  if (localStorage['cardInfo'] != null || localStorage['cardInfo'] != undefined)
  {
    let infoCard = JSON.parse(localStorage['cardInfo'])
    document.getElementById("inputNumber").value = infoCard.number;
    document.getElementById("inputExpiry").value = infoCard.expiry;
    document.getElementById("inputCvc").value = infoCard.cvc;
    document.getElementById("inputCardType").value = infoCard.type;
    }

}

function readPersoInfo(){
  if (localStorage['persoInfo'] != null || localStorage['persoInfo'] != undefined)
  {
    let infoPerso = JSON.parse(localStorage['persoInfo']);
    document.getElementById("inputName").value = infoPerso.name;
    document.getElementById("inputMail").value = infoPerso.mail;
    document.getElementById("inputTel").value = infoPerso.tel;
    document.getElementById("inputCity").value = infoPerso.city;
    document.getElementById("inputPostcode").value = infoPerso.postcode;
    document.getElementById("inputCountry").value = infoPerso.country;
    document.getElementById("inputAddress").value = infoPerso.address;
  }
  
}