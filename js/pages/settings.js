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