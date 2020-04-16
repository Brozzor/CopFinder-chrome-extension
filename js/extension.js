function copItem(idTask, allTask, idTaskItem, copInfo){
    let copInf = JSON.parse(copInfo);
    AllTasksParse = JSON.parse(allTask);
    task = AllTasksParse[idTask];
    taskExecParse = JSON.parse(task.execTask);
    if (taskExecParse[idTaskItem].color != undefined && taskExecParse[idTaskItem].color != ""){
        let i = 0;
        while (i < document.querySelector("#details > ul").childNodes.length){
            let name = document.querySelector("#details > ul").childNodes[i].firstChild.dataset.styleName.toLowerCase().trim();
            if (name.includes(taskExecParse[idTaskItem].color))
            {
                chrome.runtime.sendMessage({msg: "findingLink", idtask: idTask,idtaskitem: idTaskItem,link: document.querySelector("#details > ul").childNodes[i].firstChild.href});
                return false;
            }
            i++;
        }
        chrome.runtime.sendMessage({msg: "error", idtask: idTask,id: '102'});
        return false;
    }

    let catName = findCat();
    let soldOut = document.getElementById('add-remove-buttons').innerText.includes('sold out');

    if (soldOut) {
        chrome.runtime.sendMessage({msg: "soldOut", idtask: idTask,idtaskitem: idTaskItem}, function (callback) {
            if (callback == "next"){
                addToBasket(idTask,idTaskItem);
            }else{
                setTimeout(`soldOutRefresh(${idTask},${idTaskItem})`, copInf.timerRestock)
                
            }
        });
        return false;
    }

    switch (catName) {
        case "shoes":
            selectSize(task.shoeSize,idTask,idTaskItem,copInf);
            break;
        
        case "pants":
            if (isNaN(document.getElementById("size")[0].innerText))
            {
                selectSize(task.size,idTask,idTaskItem,copInf);
            }else{
                selectSize(task.pantSize,idTask,idTaskItem,copInf);
            }
            
            break;
    
        default:
            selectSize(task.size,idTask,idTaskItem,copInf);
            break;
    }

}

function soldOutRefresh(idTask,idTaskItem){
    chrome.runtime.sendMessage({msg: "refreshCop", idtask: idTask,idtaskitem: idTaskItem});
}

function findCat(){
    return window.location.pathname.split("/")[2];
}

function selectSize(sizeWanted,idTask,idTaskItem, copInf){
    let sizeForm = document.getElementById("size") || document.getElementById("s")
        let i = 0;
        if (sizeForm[0] == undefined && document.getElementsByClassName('button in-cart')[0] != undefined)
        {
            addToBasket(idTask,idTaskItem);
            return false;
        } 
        else if ((sizeForm[0] == undefined && document.getElementsByClassName('button in-cart')[0] == undefined) || (sizeWanted == "any"))
        {
            document.getElementsByName('commit')[0].click();
            setTimeout(`addToBasket(${idTask},${idTaskItem})`, 500);
        }
		while (i < sizeForm.length) {
            
            let html = sizeForm[i] != undefined ? sizeForm[i].innerText.trim() : sizeWanted
            if (html == sizeWanted || sizeWanted == "any" || html.toLowerCase().includes(sizeWanted)) {

				if(sizeForm[i])
					sizeForm.value = sizeForm[i].value;
                
                document.getElementsByName('commit')[0].click();
                setTimeout(`addToBasket(${idTask},${idTaskItem})`, 500);
                    
				break
			 	
			}
			else if (i == sizeForm.length - 1) {
				setTimeout(`soldOutRefresh(${idTask},${idTaskItem})`, copInf.timerRestock)
				break
            }
            i++;
        }
}

function addToBasket(idTask,idTaskItem){
    chrome.runtime.sendMessage({msg: "addItemToBasket", idtask: idTask,idtaskitem: idTaskItem});
}

function checkout(idTask, persoInfos, cardInfos){
    cardInfosParse = JSON.parse(cardInfos);
    persoInfosParse = JSON.parse(persoInfos);

    let cardYear = cardInfosParse.expiry.split("/")[1].trim();
    if (cardInfosParse.expiry.split("/")[1].trim().length == 2){
        cardYear = "20" + cardInfosParse.expiry.split("/")[1].trim();
    }

    document.getElementById('order_billing_name').value = persoInfosParse.name
    document.getElementById('order_email').value = persoInfosParse.mail
    document.getElementById('order_tel').value = persoInfosParse.tel
    document.getElementById('bo').value = persoInfosParse.address
    document.getElementById('order_billing_city').value = persoInfosParse.city
    document.getElementById('order_billing_zip').value = persoInfosParse.postcode
    document.getElementById('order_billing_country').value = persoInfosParse.country

    document.getElementById('credit_card_type').value = cardInfosParse.type
    document.getElementById('cnb').value = cardInfosParse.number
    document.getElementById('credit_card_month').value = cardInfosParse.expiry.split("/")[0].trim()
    document.getElementById('credit_card_year').value = cardYear
    document.getElementById('vval').value = cardInfosParse.cvc
    
    document.getElementsByClassName('icheckbox_minimal')[1].click();
    chrome.runtime.sendMessage({msg: "fillCheckout", idtask: idTask}, rep => {
        if (rep.callback != 0)
        {
            setTimeout(`checkoutClick(${idTask})`, rep.timer);
        }
    });
    chrome.runtime.sendMessage({msg: "endTimer", idtask: '0'});
}

function checkoutClick(idTask){
    document.getElementsByName('commit')[0].click();
    setTimeout(`checkError(${idTask})`, 15000);
}

function checkError(idTask){
    if (document.querySelector("#cart-cc > fieldset > div.errors") != undefined){
        chrome.runtime.sendMessage({msg: "error", idtask: idTask, id: '301'})
    }
}