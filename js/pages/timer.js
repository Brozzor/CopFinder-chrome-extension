function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

setTime($_GET('idt'), $_GET('ttc'));

function setTime(idTask,timeToCop){
const millisecond = 100,
      second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date(timeToCop).getTime(),
    x = setInterval(function() {    

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / (day)) >= 0 ? Math.floor(distance / (day)) : 0,
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)) >= 0 ? Math.floor((distance % (day)) / (hour)) : 0,
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)) >= 0 ? Math.floor((distance % (hour)) / (minute)) : 0,
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second) >= 0 ? Math.floor((distance % (minute)) / second) : 0;


      if (distance < 0) {
        chrome.runtime.sendMessage({msg: "startCopTimer", idtask: idTask});
        clearInterval(x);
        
      }

    }, millisecond)
}