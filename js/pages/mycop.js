window.addEventListener("load", function load(event) {
      let createButton = document.getElementById("addTaskBtn");
      createButton.addEventListener("click", function() {
        if (taskPanelif == false){
            taskPanel();
        }else{
            taskPanelif = false;
            document.getElementById('taskAddPanel').innerHTML = null;
            createButton.innerText = 'ADD TASK';
        }
        
      });
  
});
let taskPanelif = false;

function taskPanel(){
    taskPanelif = true;
    document.getElementById("addTaskBtn").innerText = 'CLOSE TASK';
    document.getElementById('taskAddPanel').innerHTML = `
    <div class="card mb-3 center-block mt-3" style="max-width: 95%;">
        <div class="row no-gutters">
          <div class="col-md-12 ">
            <div class="card-body">

              <div>
                <div class="form-group row">
                  <label class="col-sm-12 col-form-label center">Size</label>
                  <div class="col-sm-12 center">
                  <button data-id="1" name="sizeBtn" class="btn btn-sm">S</button>
                  <button data-id="2" name="sizeBtn" class="btn btn-sm">M</button>
                  <button data-id="3" name="sizeBtn" class="btn btn-sm">L</button>
                  <button data-id="4" name="sizeBtn" class="btn btn-sm">XL</button>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Shoe:</label>
                  <div class="col-sm-4">

                <select id="shoeData" class="form-control form-control-sm">
                  <option value="any" selected="">Open this select menu if item need shoe size</option>
                  <option value="8">US 8 - UK 7 - EUR 41</option>
                  <option value="8.5">US 8.5 - UK 7.5 - EUR 42</option>
                  <option value="9">US 9 - UK 8 - EUR 42.5</option>
                  <option value="9.5">US 9.5 - UK 8.5 - EUR 43</option>
                  <option value="10">US 10 - UK 9 - EUR 44</option>
                  <option value="10.5">US 10,5 - UK 9,5 - EUR 44,5</option>
                  <option value="11">US 11 - UK 10 - EUR 45</option>
                  <option value="11.5">US 11,5 - UK 10,5 - EUR 45,5</option>
                  <option value="12">US 12 - UK 11 - EUR 46</option>
                </select>

                  </div>

                  <label class="control-label col-sm-2">Hat:</label>
                  <div class="col-sm-4">

                <select id="shoeData" class="form-control form-control-sm">
                  <option value="any" selected="">Open this select menu if item need shoe size</option>
                  <option value="8">US 8 - UK 7 - EUR 41</option>
                  <option value="8.5">US 8.5 - UK 7.5 - EUR 42</option>
                  <option value="9">US 9 - UK 8 - EUR 42.5</option>
                  <option value="9.5">US 9.5 - UK 8.5 - EUR 43</option>
                  <option value="10">US 10 - UK 9 - EUR 44</option>
                  <option value="10.5">US 10,5 - UK 9,5 - EUR 44,5</option>
                  <option value="11">US 11 - UK 10 - EUR 45</option>
                  <option value="11.5">US 11,5 - UK 10,5 - EUR 45,5</option>
                  <option value="12">US 12 - UK 11 - EUR 46</option>
                </select>

                  </div>
                </div>
                <hr>
                <div class="form-group row">
                  <label class="control-label col-sm-4">Tel</label>
                  <div class="col-sm-8">
                    <input type="text" id="inputTel" class="form-control ">
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-sm-4">City</label>
                  <div class="col-sm-8">
                    <input type="text" id="inputCity" class="form-control ">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    SearchBtnTaskPanel();
}

function SearchBtnTaskPanel(){
    
    document.getElementsByName("sizeBtn").forEach(item => {
        item.addEventListener("click", event => {
            let allBtn = document.getElementsByName("sizeBtn")
            let i = 0;
            while (i < allBtn.length){
                if(allBtn[i].dataset.id == item.dataset.id){
                    allBtn[i].className = 'btn btn-sm supreme-btn';
                }else{
                    allBtn[i].className = 'btn btn-sm';
                }
                i++;
            }
          
        });
      });
}