Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O","sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");if(Parse.User.current()==null){location="login.html"}rg4js("apiKey","5HU2mFdkS/e5Tur8l31gcA==");rg4js("attach",true);rg4js("enablePulse",true);rg4js("setUser",{identifier:Parse.User.current().get("email"),isAnonymous:false,email:Parse.User.current().get("email"),firstName:"Firstname",fullName:"Firstname Lastname"});var Habit=Parse.Object.extend("Habit");var daysArray=[0,1,2,3,4,5,6];var daysBoolArr=["onSunday","onMonday","onTuesday","onWednesday","onThursday","onFriday","onSaturday"];function showMsg(a){var b=(a.parentNode.parentNode.getElementsByClassName("message"))[0];b.style.visibility="visible"}function compareDates(d,c){var b=d.split("/");var a=c.split("/");if(b[2]>a[2]){return 1}else{if(b[2]<a[2]){return -1}else{if(b[0]>a[0]){return 1}else{if(b[0]<a[0]){return -1}else{if(b[1]>a[1]){return 1}else{if(b[1]<a[1]){return -1}else{return 0}}}}}}}function editHabit(a){location="edit.html?id="+a.parentNode.parentNode.getAttribute("data-id")}function deleteHabit(b){var e=b.parentNode.parentNode;var c=e.parentNode;var d=new Parse.Query(Habit);var a=confirm("Are you sure you want to delete this habit?");if(a==true){d.get(e.getAttribute("data-id"),{success:function(f){f.destroy({success:function(g){$(b.parentNode.parentNode).fadeOut(400,function(){$(this).remove()})},error:function(g,h){alert("There was an error deleting this habit; please try again.")}})},error:function(g,f){alert("There was an error deleting this habit; please try again.")}})}}function days(a,b){checkDay("onSunday",a,b);checkDay("onMonday",a,b);checkDay("onTuesday",a,b);checkDay("onWednesday",a,b);checkDay("onThursday",a,b);checkDay("onFriday",a,b);checkDay("onSaturday",a,b)}function checkDay(c,a,g){var b=a.get(c);var e=new Date();var f=e.getDay();if(b){switch(c){case"onSunday":if(f==0){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onSunday").style.color="black";g.querySelector("#onSunday").style.fontWeight="bold";break;case"onMonday":if(f==1){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onMonday").style.color="black";g.querySelector("#onMonday").style.fontWeight="bold";break;case"onTuesday":if(f==2){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onTuesday").style.color="black";g.querySelector("#onTuesday").style.fontWeight="bold";break;case"onWednesday":if(f==3){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onWednesday").style.color="black";g.querySelector("#onWednesday").style.fontWeight="bold";break;case"onThursday":if(f==4){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onThursday").style.color="black";g.querySelector("#onThursday").style.fontWeight="bold";break;case"onFriday":if(f==5){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onFriday").style.color="black";g.querySelector("#onFriday").style.fontWeight="bold";break;case"onSaturday":if(f==6){g.getElementById("thumbsUp").className=g.getElementById("thumbsUp").className+" enableThumbsUp";g.getElementById("thumbsDown").className=g.getElementById("thumbsDown").className+" enableThumbsDown"}g.querySelector("#onSaturday").style.color="black";g.querySelector("#onSaturday").style.fontWeight="bold";break}}}function streak(b,e){var c=b.get("currStreak");var d=b.get("bestStreak");var a;if(d==0){a=0}else{var a=c/d*200}$(e).find("#progressBar").find("div").animate({width:a},500);if(a==200){$(e).find("#progressBar").find("div").css("background","#009900")}else{$(e).find("#progressBar").find("div").css("background","#0099ff")}}function updateStreakFromButton(b,d){var c=b.get("currStreak");var e=b.get("bestStreak");var a;if(e==0){a=0}else{var a=c/e*200}$(d).find("#progressBar").find("div").animate({width:a},500);if(a==200){$(d).find("#progressBar").find("div").css("background","#009900")}else{$(d).find("#progressBar").find("div").css("background","#0099ff")}}function addHabitToList(e){var i=document.getElementById("habit-list");var o=document.querySelector("#habit-template");if(!o.content){notSupported()}var l=document.importNode(o.content,true);l.firstElementChild.setAttribute("data-id",e.id);days(e,l);streak(e,l);var a=e.get("icon");if(a){l.querySelector(".habit-icon").src=a.url()}var d=e.get("currDate");var q=new Date(d);var b=new Date();var h=b.getUTCMonth()+1;var m=b.getUTCDate();var k=b.getUTCFullYear();var p=h+"/"+m+"/"+k;var c=b.getDay();if(e.get(daysBoolArr[c])){showMsg(l.querySelector(".op-done"))}else{l.querySelector(".message-today").className=l.querySelector(".message-today").className+" hide";l.querySelector(".message-missed").className=l.querySelector(".message-missed").className+" hide"}if(compareDates(d,p)!=0){if(e.get("thumbCtr")!=e.get("frequency")&&e.get("numCompleted")<e.get("frequency")){e.set("currStreak",0)}e.set("thumbCtr",0);e.set("numCompleted",0);var g=0;var f=e.get("currDay");while(g<=7){f=(f+1)%7;g++;if(e.get(daysBoolArr[f])){break}}q.setDate(q.getDate()+g);var n=(q.getUTCMonth()+1)+"/"+q.getUTCDate()+"/"+q.getUTCFullYear();if(compareDates(p,n)==1){e.set("currStreak",0)}e.set("currDate",p);e.set("currDay",c);e.save();streak(e,l)}else{if(e.get("thumbCtr")==e.get("frequency")){l.querySelector(".op-done").className="op op-done";l.querySelector(".op-down").className="op op-down"}}l.querySelector(".habit-name").textContent=e.get("name");l.querySelector(".currStreak").textContent=e.get("currStreak");l.querySelector(".bestStreak").textContent=e.get("bestStreak");l.querySelector(".frequencyPerDay").textContent=e.get("frequency");l.querySelector(".completed").textContent=e.get("numCompleted");l.querySelector(".missed").textContent=e.get("thumbCtr")-e.get("numCompleted");var j=i.appendChild(l)}function completeHabit(a){var c=a.parentNode.parentNode.getAttribute("data-id");var b=new Parse.Query(Habit);b.get(c,{success:function(d){var e=d.get("numCompleted");var f=d.get("thumbCtr");var i=d.get("frequency");var g=d.get("currStreak");var h=d.get("bestStreak");if(f<i){f++;e++;g++;if(g>h){h=g}d.set("numCompleted",e);d.set("thumbCtr",f);d.set("currStreak",g);d.set("bestStreak",h);d.save(null,{success:function(k){a.parentNode.parentNode.querySelector(".currStreak").textContent=k.get("currStreak");a.parentNode.parentNode.querySelector(".bestStreak").textContent=k.get("bestStreak");a.parentNode.parentNode.querySelector(".completed").textContent=k.get("numCompleted");a.parentNode.parentNode.querySelector(".missed").textContent=k.get("thumbCtr")-k.get("numCompleted");updateStreakFromButton(k,a.parentNode.parentNode);var j={count:f.toString(),curr_streak:g.toString(),best_streak:h.toString()};Parse.Analytics.track("completehabit",j)},error:function(k,j){alert("Unable to update habit!  Please check your network connection and try again later.")}})}if(f==i){a.parentNode.parentNode.querySelector("#thumbsUp").className="op op-done";a.parentNode.parentNode.querySelector("#thumbsDown").className="op op-down"}},error:function(e,d){console.log("Habit object was not retrieved successfully!");alert("Unable to update habit!  Please check your network connection and try again later.")}})}function failHabit(a){var c=a.parentNode.parentNode.getAttribute("data-id");var b=new Parse.Query(Habit);b.get(c,{success:function(d){var e=d.get("thumbCtr");var f=d.get("frequency");if(e<f){e++;d.set("thumbCtr",e);d.set("currStreak",0);d.save(null,{success:function(h){a.parentNode.parentNode.querySelector(".currStreak").textContent=h.get("currStreak");a.parentNode.parentNode.querySelector(".missed").textContent=h.get("thumbCtr")-h.get("numCompleted");updateStreakFromButton(h,a.parentNode.parentNode);var g={count:e.toString()};Parse.Analytics.track("failhabit",g)},error:function(h,g){alert("Unable to update habit!  Please check your network connection and try again later.")}})}if(e==f){a.parentNode.parentNode.querySelector("#thumbsUp").className="op op-done";a.parentNode.parentNode.querySelector("#thumbsDown").className="op op-down"}},error:function(e,d){alert("Unable to update habit!  Please check your network connection and try again later.")}})}$(window).resize(function(){$(".hidden-resizer").each(function(b,c){$(this).css("font-size",24);while($(this).width()>$(".title-li").width()){var a=parseInt($(this).css("font-size"),10);$(this).css("font-size",a-1)}})});function logOff(){Parse.User.logOut();location="login.html"}function loadHabits(){var b=new Parse.Query(Habit);var a=Parse.User.current();b.equalTo("username",a.get("username"));b.find({success:function(d){for(var c=0;c<d.length;c++){addHabitToList(d[c])}$(".hidden-resizer").each(function(f,g){while($(this).width()>$(".title-li").width()){var e=parseInt($(this).css("font-size"),10);$(this).css("font-size",e-1)}})},error:function(c){alert("Error: "+c.code+" "+c.message)}})}function notSupported(){document.getElementById("notSupported").style.display="block";alert("This website doesn't support your browser. Only Chrome, Safari, and Firefox are supported.")}function getParameterByName(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c=new RegExp("[\\?&]"+a+"=([^&#]*)"),b=c.exec(location.search);return b===null?"":decodeURIComponent(b[1].replace(/\+/g," "))}var notif=getParameterByName("notif");var fromNotif=(notif=="true");var dimensions={from_notif:fromNotif.toString()};Parse.Analytics.track("viewlist",dimensions);try{loadHabits()}catch(exception){console.error("exception caught");document.getElementById("notSupported").style.display="block"};