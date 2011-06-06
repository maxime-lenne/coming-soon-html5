/* Author: Maxime Lenne

source : 
http://www.hv-designs.co.uk/2010/10/18/coming-soon-page-psd-to-html/

*/

dateOfBeginProject = new Date(2011,6,20,00,00,00);
dateOfLaunch = new Date(2011,6,28,00,00,00);
var amount;
var percentage;

var meter = document.getElementById('meter');
var meterPourcent = document.getElementById('meter-percent');


window.applicationCache.addEventListener('updateready', function(e) {
	  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	    window.applicationCache.swapCache();
	    if (confirm('A new version of this site is available. Load it?')) {
	      window.location.reload();
	    }
	  }
	}, false);

function GetCount(){
	dateNow = new Date();
	amount = dateOfLaunch.getTime() - dateNow.getTime();
	percentage = Math.round(((dateOfLaunch.getTime() - dateOfBeginProject.getTime()) * 100)/(dateOfLaunch.getTime() - dateNow.getTime()));
	console.log(percentage);
	delete dateNow; 

	if(amount < 0) {
		document.getElementById('countDown').innerHTML="<span> Now! </span>";
	}
	else {
		 days=0;hours=0;mins=0;secs=0;out="";
		 
		 amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs
		 
		 days=Math.floor(amount/86400);//days
		 amount=amount%86400;
		 
		 hours=Math.floor(amount/3600);//hours
		 amount=amount%3600;
		 
		 mins=Math.floor(amount/60);//minutes
		 amount=amount%60;
		 
		 secs=Math.floor(amount);//seconds
		 
		 if(days != 0) {
			 out += "<span>" + days +"</span><span>Day"+((days!=1)?"s":"")+"</span><span>";
		 }
		 if(days != 0 || hours != 0) {
			 out += hours +"</span><span>Hour"+((hours!=1)?"s":"")+"</span><span>";
		 }
		 if(days != 0 || hours != 0 || mins != 0) {
			 out += mins +"</span><span>Minute"+((mins!=1)?"s":"")+"</span><span>";
		 }
		 out += secs +"</span><span>Seconds</span>>";
		 document.getElementById('countDown').innerHTML=out;
		 console
		 setTimeout("GetCount()", 1000);
	}
}

$(document).ready(GetCount());

document.getElementById('launch-date').innerHTML=dateOfBeginProject.toLocaleString();

/**
 * 
 * Support of HTML5 <progress /> and <meter /> tag
 * 
 */

  
  function updateMeterPourcent(newValue) {
    
  }
  
function support_meter(){
  	var u = document.createElement('meter');
	if(u == undefined) {
  		console.log('HTML5 <meter /> tag not supported !');
		return false;
	}
	u.setAttribute("max","99");
  	if (u.max != 99) {
  		console.log('HTML5 <meter /> tag not supported !');
		return false;
  	}
	console.log('Great ! HTML5 <meter /> tag supported !');
	return true;
}

if (!support_meter()) {
  $(document).ready(function() {
	  $('meter').addClass('hidden');
	  $( "#progressbar" ).removeClass('hidden');
	  $( "#progressbar" ).progressBar(percentage,{barImage: 'img/progressbg_green.gif'});
	});
}
  
function updateProgressBar() { 
  if (support_meter()) {
	  meter.value = percentage;
	  meterPourcent.innerHTML = percentage;
  }
  else {
	  $("#progressbar").progressBar(percentage);
  }
}

updateProgressBar();
setInterval(function() { updateProgressBar(); }, 100000);


/**
 * Launch Notification
 * 
 * Web local storage
 */
$(".recipient").hide();

$("#launch-notification").submit(function() {
	s = $(this).serialize();
	$.ajax({type: "POST",data: s,url: $(this).attr("action"),success: function(retour){
		$(".recipient").show();
		$(".recipient").empty().append(retour);
	}});
	var submit = document.querySelector('#launch-notification-submit');
	if(window.localStorage.getItem('notify') == '1') {
	  	  submit.value = "Do not notify me";
	    }
	    else {
	  	  submit.value = "Notify me";
	    }
	return false;
});

$(document).ready(function() {

    try {
      (window.localStorage.getItem) // will throw in Firefox under some settings
    } catch(e){
      return; // quit because dom.storage.enabled is false
    }

    var email = document.querySelector('#launch-notification-email');
    var submit = document.querySelector('#launch-notification-submit');
    
    // place content from previous edit
    if (!email.value) {
      email.value = window.localStorage.getItem('email');
    }
    
    if(window.localStorage.getItem('notify') == '1') {
  	  submit.value = "Do not notify me";
    }
    else {
  	  submit.value = "Notify me";
    }
    
    // your content will be saved locally
    submit.addEventListener('click', function () {
      window.localStorage.setItem('email', email.value);
      if(window.localStorage.getItem('notify') == '1') {
      	  window.localStorage.setItem('notify', '0');
        }
        else {
      	  window.localStorage.setItem('notify', '1');
        }
        
      window.localStorage.setItem('timestamp', (new Date()).getTime());
    }, false);

}); 
