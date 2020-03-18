window.addEventListener("load", function load(event) {
    settingsPage();
  });

function settingsPage() {
    document.getElementById("appp").innerHTML = `
    <br>
    <center>
      <h1 id="title" class="supreme-white-h1">Settings</h1>
    </center>
    
    <div class="col" style="position: relative;">
      <!--card-->
      <div class="card mb-3 center-block" style="max-width: 95%;">
          <div class="row no-gutters">
            <div class="col-md-6">
              <img src="" class="card-img img-item">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">Settings item for cop</h5>
                <p class="card-text">Size :</p>
  
                <p class="card-text">Shoe :</p>
                <p class="card-text">Datetime :
                <input type="datetime-local" class="form-control form-control-sm" id="datetimeData"  required>
                </p>

                <div class="row no-gutters">
                  <button id="redirectWebsiteSup" data-link="" class="btn btn-outline-grey btn-sm">View on supreme</button>
                  <button id="selectToCop" class="btn btn-danger btn-sm">Select to cop</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Card -->
    </div>
      
      `;
  }
