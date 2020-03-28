function copItem(idTask, allTask, idTaskItem){
    AllTasksParse = JSON.parse(allTask);
    task = AllTasksParse[idTask];
    let catName = findCat();
    let soldOut = document.getElementById('add-remove-buttons').innerText.includes('sold out');

    if (soldOut) {
        chrome.runtime.sendMessage({msg: "soldOut", idtask: idTask,idtaskitem: idTaskItem});
        return false;
    }

    switch (catName) {
        case "shoes":
            selectSize(task.shoeSize,idTask,idTaskItem);
            break;
        
        case "pants":
            selectSize(task.pantSize,idTask,idTaskItem);
            break;
    
        default:
            selectSize(task.size,idTask,idTaskItem);
            break;
    }

}

function findCat(){
    return window.location.pathname.split("/")[2];
}

function selectSize(sizeWanted,idTask,idTaskItem){
    let sizeForm = document.getElementById("size") || document.getElementById("s")
        let i = 0;
        if (sizeForm[0] == undefined && document.getElementsByClassName('button in-cart')[0].innerText.trim() == "in basket")
        {
            addToBasket(idTask,idTaskItem);
            return false;
        }
		while (i < sizeForm.length) {
            
			let html = sizeForm[i] != undefined ? sizeForm[i].innerText.trim() : sizeWanted
            if (html == sizeWanted || sizeWanted == "any") {

				if(sizeForm[i])
					sizeForm.value = sizeForm[i].value;
                
                document.getElementsByName('commit')[0].click();
                setTimeout(`addToBasket(${idTask},${idTaskItem})`, 500);
                    
				break
			 	
			}
			else if (i == sizeForm.length - 1) {
				chrome.runtime.sendMessage({msg: "NoSize", idtask: idTask,idtaskitem: idTaskItem});
				break
            }
            i++;
        }
}

function addToBasket(idTask,idTaskItem){
    chrome.runtime.sendMessage({msg: "addItemToBasket", idtask: idTask,idtaskitem: idTaskItem}, function(callback) {
        if (callback != null){
            checkout();
        }
 
    });
}

function checkout(idTask, persoInfos){
    console.log(persoInfos);
}