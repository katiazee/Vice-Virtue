Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O", "sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");

if (Parse.User.current() == null) {
    location = "login.html";
}

rg4js('apiKey', '5HU2mFdkS/e5Tur8l31gcA==');
rg4js('attach', true);
rg4js('enablePulse', true);

rg4js('setUser', {
  identifier: Parse.User.current().get("email"),
  isAnonymous: false,
  email: Parse.User.current().get("email"),
  firstName: 'Firstname',
  fullName: 'Firstname Lastname'
});

var Habit = Parse.Object.extend("Habit");
var defaultImage = Parse.Object.extend("DefaultImages");
var hasImageChanged = false;
var hasUploaded = false;

function addAlarmToList(alarmNumber)
{
    var list = document.getElementById("alarm-list");
    var template = document.querySelector("#alarm")
    var clone = document.importNode(template.content, true);

    clone.querySelector(".alarm-name").textContent = "Alarm " + alarmNumber;

    var res = list.appendChild(clone);
}


function editAlarmToList(alarmNumber, hours, minutes, am)
{
    var list = document.getElementById("alarm-list");
    var template = document.querySelector("#alarm")
    var clone = document.importNode(template.content, true);

    clone.querySelector(".alarm-name").textContent = "Alarm " + alarmNumber;
    clone.querySelector("#hr1").value = hours;
    clone.querySelector("#min1").value = minutes;
    clone.querySelector("#am1").value = am;

    var res = list.appendChild(clone);
}


$("input[type='radio']").click(function() {
	var previousValue = $(this).attr('previousValue');
	var name = $(this).attr('name');
	var frequencyAlarm = $(this).val();

	if (previousValue == 'checked') {
		$(this).removeAttr('checked');
		$(this).attr('previousValue', false);
	}
	else {
		$("input[name="+name+"]:radio").attr('previousValue', false);
		$(this).attr('previousValue', 'checked');
	}
	var others_text = document.getElementById('others');
	others_text.value = "";

	if (frequencyAlarm == "one")
		frequencyAlarm = 1;
	else if (frequencyAlarm == "two")
		frequencyAlarm = 2;
	else if (frequencyAlarm == "three")
		frequencyAlarm = 3;

	$('#alarm-list').empty();
	var switchState = document.getElementById('myonoffswitch');
	if (switchState.checked)
	{
		for (var i = 1; i <= frequencyAlarm; i++)
		{
			addAlarmToList(i);
		}
	}
});

//function called when other_text changes
$("#others").change(function (e) {
	$("input[type='radio']").removeAttr('checked');
    $('#alarm-list').empty();
    if ($('#others').val() < 10 && $('#others').val() % 1 == 0  && $('#others').val() > 0 ) {
	    var frequencyAlarm;

		frequencyAlarm = $('#others').val();

		var switchState = document.getElementById('myonoffswitch');
	    if (switchState.checked) {
			for (var i = 1; i <= frequencyAlarm; i++) {
				addAlarmToList(i);
			}
		}
	}
});

function switchNotification()
{
	var switchState = document.getElementById('myonoffswitch');
	$('#alarm-list').empty(); //needed in either case (if notification on or off)

	if (switchState.checked)
	{
		var frequencyAlarm;
		if (document.getElementById('once').checked)
		{
			frequencyAlarm = 1;
			for (var i = 1; i <= frequencyAlarm; i++)
	 		{
        		addAlarmToList(i);
      		}
		}
		else if (document.getElementById('twice').checked)
		{
			frequencyAlarm = 2;
			for (var i = 1; i <= frequencyAlarm; i++)
	 		{
        		addAlarmToList(i);
      		}
		}
		else if (document.getElementById('thrice').checked)
		{
			frequencyAlarm = 3;
			for (var i = 1; i <= frequencyAlarm; i++)
	 		{
        		addAlarmToList(i);
      		}
		}
		else if($('#others').val() < 10 && $('#others').val() % 1 == 0 && $('#others').val() > 0 )
		{
			frequencyAlarm = $('#others').val();
			for (var i = 1; i <= frequencyAlarm; i++)
	 		{
        		addAlarmToList(i);
      		}
		}
	}
}

function selectImage(name) {
	//Clear all the other effects
	document.getElementById('icon1').style.border = "none";
	document.getElementById('icon1').className = "icon";
	document.getElementById('icon2').style.border = "none";
	document.getElementById('icon2').className = "icon";
	document.getElementById('icon3').style.border = "none";
	document.getElementById('icon3').className = "icon";
	document.getElementById('myImg').style.border = "none";
	document.getElementById('myImg').className = "icon";
	var image = document.getElementById(name);
	image.style.border = "5px solid #42A5F5";
	image.className = image.className + " selectedIcon";

	fileName = name;
}

function validateForm() {

	var tileValidated = false;
	var iconValidated = false;
	var freqValidated = false;
	var dailyFreqValidated = false;

	//title validation
	if (document.getElementById('title').value == "")
	{
		document.getElementById('title').style.border = '1px solid';
		document.getElementById('title').style.borderColor = '#b94a48';
	}
	else
	{
		document.getElementById('title').style.border = '2px inset';
		tileValidated = true;
	}
	//icon validation
	if ($( "#icon1, #icon2, #icon3, #myImg" ).hasClass( "selectedIcon" ) )
	{
		document.getElementById('noTitle').style.display = 'none';
		iconValidated = true;
	}
	else
		document.getElementById('noTitle').style.display = 'block';

	//frequency validation
	if (document.getElementById('isSun').checked)
		document.getElementById('isSun').className += " selectedDay";
	else
		document.getElementById('isSun').className = "";

	if (document.getElementById('isMon').checked)
		document.getElementById('isMon').className += " selectedDay";
	else
		document.getElementById('isMon').className = "";

	if (document.getElementById('isTues').checked)
		document.getElementById('isTues').className += " selectedDay";
	else
		document.getElementById('isTues').className = "";

	if (document.getElementById('isWed').checked)
		document.getElementById('isWed').className += " selectedDay";
	else
		document.getElementById('isWed').className = "";

	if (document.getElementById('isThurs').checked)
		document.getElementById('isThurs').className += " selectedDay";
	else
		document.getElementById('isThurs').className = "";

	if (document.getElementById('isFri').checked)
		document.getElementById('isFri').className += " selectedDay";
	else
		document.getElementById('isFri').className = "";

	if (document.getElementById('isSat').checked)
		document.getElementById('isSat').className += " selectedDay";
	else
		document.getElementById('isSat').className = "";

	if ($( "#isSun, #isMon, #isTues, #isWed, #isThurs, #isFri, #isSat" ).hasClass( "selectedDay" ) )
	{
		document.getElementById('noFrequency').style.display = 'none';
		freqValidated = true;
	}
	else
		document.getElementById('noFrequency').style.display = 'block';

	//daily frequency validation
	if (document.getElementById('once').checked)
		document.getElementById('once').className += " selectedTimesADay";
	else
		document.getElementById('once').className = "";
	if (document.getElementById('twice').checked)
		document.getElementById('twice').className += " selectedTimesADay";
	else
		document.getElementById('twice').className = "";
	if (document.getElementById('thrice').checked)
		document.getElementById('thrice').className += " selectedTimesADay";
	else
		document.getElementById('thrice').className = "";
	//both daily frequency selected and others selected
	if ($( "#once, #twice, #thrice" ).hasClass( "selectedTimesADay" ) && $('#others').val() != '' )
	{
		document.getElementById('selectedBothFrequencies').style.display = 'block';
		document.getElementById('noDailyFrequency').style.display = 'none';
		document.getElementById('others').style.border = '2px inset';
	}
	//either daily frequency selected or others selected  (validates!)
	else if (($( "#once, #twice, #thrice" ).hasClass( "selectedTimesADay" ) && $('#others').val() == '')
		|| (!($( "#once, #twice, #thrice" ).hasClass( "selectedTimesADay" )) && $('#others').val() != ''
		 && $('#others').val() < 10 && $('#others').val() > 0 && $('#others').val() % 1 == 0 ) )
	{
		document.getElementById('selectedBothFrequencies').style.display = 'none';
		document.getElementById('noDailyFrequency').style.display = 'none';
		document.getElementById('others').style.border = '2px inset';
		dailyFreqValidated = true;
	}
	//nothing selected or invalid input in others box
	else
	{
		document.getElementById('others').style.border = '1px solid';
		document.getElementById('others').style.borderColor = '#b94a48';
		document.getElementById('noDailyFrequency').style.display = 'block';
		document.getElementById('selectedBothFrequencies').style.display = 'none';
	}
	if (tileValidated && iconValidated && freqValidated && dailyFreqValidated)
	{
		updateHabit();
	}

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function selectImage(name) {
	// Check if different image was selected
	if (name == "myImg" && !hasUploaded) {
		// If selecting previously uploaded image, then no change
		hasImageChanged = false;
	}
	else {
		// If selecting a default icon or upload a new image, then there is a change
		hasImageChanged = true;
	}

	//Clear all the other effects
	document.getElementById('icon1').className = "icon";
	document.getElementById('icon2').className = "icon";
	document.getElementById('icon3').className = "icon";
	document.getElementById('myImg').className = "icon";
	var image = document.getElementById(name);
	image.className = image.className + " selectedIcon";
}

function uploadIcon(){
	var x = document.getElementById("myFile");
	var txt = "";
	if ('files' in x) {
		if (x.files.length == 0) {
    		txt = "Select one or more files.";
		} else {
    		for (var i = 0; i < x.files.length; i++) {
            	txt += "<br><strong>" + (i+1) + ". file</strong><br>";
            	var file = x.files[i];

           	 	if ('name' in file) {
                	txt += "name: " + file.name + "<br>";
            	}
        		if ('size' in file) {
           			txt += "size: " + file.size + " bytes <br>";
        		}
    		}
		}
	}

	else if (x.value == "") {
		txt += "Select one or more files.";
	}

	else {
    	txt += "The files property is not supported by your browser!";
    	txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
	}
}

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
	$('.hide').css('display','inline-block');
    $('#myImg').attr('src', e.target.result);
    hasUploaded = true;
    selectImage('myImg');
};

function onStart() {
	// declare and load Parse Habit object using objectid
	var query = new Parse.Query(Habit);

	// Redirect user to home page if no habit object to edit
	editHabitID = getParameterByName("id");
	if (editHabitID == null || editHabitID == "") {
		location = "list.html";
	}

	query.get(editHabitID, {
		success: function(habit) {
			// The object was retrieved successfully.
			document.getElementById("title").value = habit.get("name");

			document.getElementById("isSun").checked = habit.get("onSunday");
			document.getElementById("isMon").checked = habit.get("onMonday");
			document.getElementById("isTues").checked = habit.get("onTuesday");
			document.getElementById("isWed").checked = habit.get("onWednesday");
			document.getElementById("isThurs").checked = habit.get("onThursday");
			document.getElementById("isFri").checked = habit.get("onFriday");
			document.getElementById("isSat").checked = habit.get("onSaturday");

			var frequencyPerDay = habit.get("frequency");
			if (frequencyPerDay <= 3) {
				switch (frequencyPerDay) {
					case 1:
						document.getElementById("once").checked = true;
						break;
					case 2:
						document.getElementById("twice").checked = true;
						break;
					case 3:
						document.getElementById("thrice").checked = true;
						break;
					default:
				}
			}
			else {
				document.getElementById("others").value = "" + frequencyPerDay;
			}

			//get user uploaded alarms
			var alarms = habit.get("alarms");

			// Notification switch should be off if no notifications
			if (alarms.length == 0) {
				document.getElementById("myonoffswitch").checked = false;
			}

			var am;
			var hr;
			var min;
			var parseHour;

			for (var i = 0; i < alarms.length; ++i)
			{
				parseHour = alarms[i].substring(0,2);
				if (parseHour > 11 && parseHour < 24)
					am = 'pm';
				else
					am = 'am';

				if (parseHour > 12)
					hr = parseHour - 12;
				else if (parseHour >= 10)
					hr = parseHour;
				else if (parseHour == "00")
					hr = "12";
				else
					hr = alarms[i].substring(1,2);

				min = alarms[i].substring(3,5);

				editAlarmToList(i + 1, hr, min, am);
			}

			// Upload user uploaded image if it exists
			var habitIcon = habit.get("icon");
            if (habitIcon) {
                document.getElementById("myImg").src = habitIcon.url();
            }

			// Set selected default image or uploaded image
			switch (habit.get("defaultIconID")) {
				case "0JrjvKGnbG":
					selectImage("icon1");
					break;
				case "zgGDtotXrU":
					selectImage("icon2");
					break;
				case "qww3v520kk":
					selectImage("icon3");
					break;
				case "none":
					$('.hide').css('display','inline-block');
					selectImage("myImg");
					break;
				default:
			}
		},
		error: function(object, error) {
			// The object was not retrieved successfully.
	    	// error is a Parse.Error with an error code and message.
	    	console.log("Habit object was not retrieved successfully!");
		}
	});
}

function updateHabit() {
	var query = new Parse.Query(Habit);
	query.get(getParameterByName("id"), {
		success: function(habitToEdit) {
			// The object was retrieved successfully.
			habitToEdit.set("name", document.getElementById("title").value);
			habitToEdit.set("onSunday", document.getElementById('isSun').checked);
			habitToEdit.set("onMonday", document.getElementById('isMon').checked);
			habitToEdit.set("onTuesday", document.getElementById('isTues').checked);
			habitToEdit.set("onWednesday", document.getElementById('isWed').checked);
			habitToEdit.set("onThursday", document.getElementById('isThurs').checked);
			habitToEdit.set("onFriday", document.getElementById('isFri').checked);
			habitToEdit.set("onSaturday", document.getElementById('isSat').checked);

			var otherFrequency = document.getElementById('others').value;
			var frequency;

			if(!(otherFrequency == null || otherFrequency == "")) {
				frequency = Number(otherFrequency);
			} else if(document.getElementById('once').checked) {
				frequency = 1;
			} else if(document.getElementById('twice').checked) {
				frequency = 2;
			} else if(document.getElementById('thrice').checked) {
				frequency = 3;
			}

			if (habitToEdit.get("numCompleted") > frequency) {
				habitToEdit.set("numCompleted", frequency);
			}
			if (habitToEdit.get("thumbCtr") > frequency) {
				habitToEdit.set("thumbCtr", frequency);
			}

			habitToEdit.set("frequency", frequency);


			// Set alarms for habit
			var habitAlarms = [];
			var hours = '';
			var minutes = '';
			var alarmList = document.getElementById("alarm-list");
			var alarms = alarmList.getElementsByTagName("li");
			for (var i = 0; i < alarms.length; ++i) {
				hours = parseInt(alarms[i].querySelector('#hr1').value);
				minutes = parseInt(alarms[i].querySelector('#min1').value);

				hours = hours % 12;

				if (alarms[i].querySelector('#am1').value == 'pm') {
					hours += 12;
				}

				// Format number strings for time
				hours = ("0" + hours).slice(-2);
				minutes = ("0" + minutes).slice(-2);

				habitAlarms.push(hours + ':' + minutes);
			}
			habitToEdit.set("alarms", habitAlarms);


			// Image upload
			var iconID;
			var defaultIconID;
			if (hasClass(document.getElementById('icon1'), "selectedIcon")) {
				iconID = 'icon1';
				defaultIconID = "0JrjvKGnbG";
			}
			else if (hasClass(document.getElementById('icon2'), "selectedIcon")) {
				iconID = 'icon2';
				defaultIconID = "zgGDtotXrU";
			}
			else if (hasClass(document.getElementById('icon3'), "selectedIcon")) {
				iconID = 'icon3';
				defaultIconID = "qww3v520kk";
			}
			else if (hasClass(document.getElementById('myImg'), "selectedIcon")) {
				iconID = 'userUpload';
				defaultIconID = "none";
			}
			habitToEdit.set("defaultIconID", defaultIconID);


			// If one of the default images is selected
			if (iconID == 'icon1' || iconID == 'icon2' || iconID == 'icon3') {
				var query = new Parse.Query(defaultImage);
				query.get(defaultIconID, {
				    success: function(defaultIcon) {
				        habitToEdit.set("icon", defaultIcon.get("icon"));

				        habitToEdit.save(null, {
							success: function(editedHabit) {
								// Execute any logic that should take place after the object is saved.
								location = "list.html"
							},
							error: function(editedHabit, error) {
								// Execute any logic that should take place if the save fails.
								// error is a Parse.Error with an error code and message.
								alert('Failed to update object, with error code: ' + error.message);
							}
						});
				    },
				    error: function(object, error) {
				        // The object was not retrieved successfully.
				        // error is a Parse.Error with an error code and message.
				    }
				});
			}
			// If user uploaded a new image
			else if (hasImageChanged && iconID == 'userUpload') {
				var fileUploadControl = $("#iconFileUpload")[0];
				if (fileUploadControl.files.length > 0) {
					var file = fileUploadControl.files[0];
					var name = "icon.jpg";

					var parseFile = new Parse.File(name, file);
				}

				parseFile.save().then(function() {
					// The file has been saved to Parse.
				}, function(error) {
					// The file either could not be read, or could not be saved to Parse.
				});
				habitToEdit.set("icon", parseFile);

				habitToEdit.save(null, {
					success: function(editedHabit) {
						// Execute any logic that should take place after the object is saved.
						location = "list.html"
					},
					error: function(editedHabit, error) {
						// Execute any logic that should take place if the save fails.
						// error is a Parse.Error with an error code and message.
						alert('Failed to update object, with error code: ' + error.message);
					}
				});
			}
			else {
				// Don't upload new image, just save changes
				habitToEdit.save();
				location = "list.html";
			}
		},
		error: function(object, error) {
			// The object was not retrieved successfully.
	    	// error is a Parse.Error with an error code and message.
	    	console.log("Habit object was not retrieved successfully!");
		}
	});
}

// Make uploaded image go on next line
$(window).resize(function() {
	if($('.hide').css('display') != 'none') {
    	// Make uploaded image go on next line
        if($('#form').width() < 360) {
        	$('.hide').css('display','block');
        	$('.hide').css('position', 'relative');
        } else {
        	$('.hide').css('position', 'absolute');
        	$('.hide').css('display', 'inline-block');

        	// Reload icons to respace them
        	var container = document.getElementById("editForm");
			var content = container.innerHTML;
			container.innerHTML = content;
        }
    }
})

window.onload = onStart;