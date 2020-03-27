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
    
        default:
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
            
			let html = sizeForm[i] != undefined ? sizeForm[i].innerText : sizeWanted
            console.log('ret ' + html+ ' ret ' + sizeWanted)
            if (html == sizeWanted) {

				if(sizeForm[i])
					sizeForm.value = sizeForm[i].value;

				console.log('je buy');
				break
			 	
			}
			else if (i == sizeForm.length - 1) {
				console.log('pb');
				break
            }
            i++;
        }
}