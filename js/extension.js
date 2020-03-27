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
            selectSize(task.shoeSize);
            break;
        
        case "pants":
            selectSize(task.pantSize);
            break;
    
        default:
            selectSize(task.size);
            break;
    }

}

function findCat(){
    return window.location.pathname.split("/")[2];
}

function selectSize(sizeWanted){
    let sizeForm = document.getElementById("size") || document.getElementById("s")
		let i = 0;
		while (i < sizeForm.length) {
            
			let html = sizeForm[i] != undefined ? sizeForm[i].innerText.trim() : sizeWanted
            if (html == sizeWanted || sizeWanted == "any") {

				if(sizeForm[i])
					sizeForm.value = sizeForm[i].value;

                    addToBasket()
				break
			 	
			}
			else if (i == sizeForm.length - 1) {
				chrome.runtime.sendMessage({msg: "NoSize", idtask: idTask,idtaskitem: idTaskItem});
				break
            }
            i++;
        }
}

function addToBasket(){
    document.getElementsByName('commit')[0].click();
}