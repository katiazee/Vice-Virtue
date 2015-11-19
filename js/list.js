Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O", "sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");
var Habit = Parse.Object.extend("Habit");
var daysArray = [0, 1, 2, 3, 4, 5, 6];
var daysBoolArr = ['onSunday', 'onMonday', 'onTuesday', 'onWednesday', 'onThursday', 'onFriday', 'onSaturday'];

function showMsg(element){
    var msgElement = (element.parentNode.parentNode.getElementsByClassName("message"))[0];
    // alert(msgElement.innerHTML);

    msgElement.style.visibility="visible";
}

// Returns 0 if dates are the same, 1 if date1 is later than date2, and -1 if date1 is earlier than date2
// Date parameters must be in the form of Month/Date/Year
function compareDates(date1, date2) {
    var dateArr1 = date1.split("/");
    var dateArr2 = date2.split("/");

    // Compare years
    if (dateArr1[2] > dateArr2[2]) {
        return 1;
    } else if (dateArr1[2] < dateArr2[2]) {
        return -1;
    } else {
        // If years are the same, compare months
        if (dateArr1[0] > dateArr2[0]) {
            return 1;
        } else if (dateArr1[0] < dateArr2[0]) {
            return -1;
        } else {
            // if year and month match, compare dates
            if (dateArr1[1] > dateArr2[1]) {
                return 1;
            } else if (dateArr1[1] < dateArr2[1]) {
                return -1;
            } else {
                // Dates match if match on year, month, and date
                return 0;
            }
        }
    }
}

function editHabit(element) {
    // localStorage.setItem("toEdit", element.parentNode.parentNode.getAttribute("data-id"));
    location = "edit.html?id=" + element.parentNode.parentNode.getAttribute("data-id");
}

function deleteHabit(element){
    var child = element.parentNode.parentNode;
    var parent = child.parentNode;

    var query = new Parse.Query(Habit);
    // console.log("Element to delete: " + child.getAttribute("data-id"))
    var confirmDelete = confirm("Are you sure you want to delete this habit?");
    if (confirmDelete == true) {
        query.get(child.getAttribute("data-id"), {
            success: function(habit) {
                // The object was retrieved successfully.
                habit.destroy({
                    success: function(habit) {
                        // The object was deleted from the Parse Cloud.
                        $(element.parentNode.parentNode).fadeOut(400, function() { $(this).remove(); });
                    },
                    error: function(habit, error) {
                        // The delete failed.
                        // error is a Parse.Error with an error code and message.
                        console.log("error here 2")
                    }
                });
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                console.log("error here1")
                console.log(error)
            }
        });
    }
    // If not, don't delete habit
}



function days(habit, clone) {
    checkDay('onSunday', habit, clone);
    checkDay('onMonday', habit, clone);
    checkDay('onTuesday', habit, clone);
    checkDay('onWednesday', habit,clone);
    checkDay('onThursday', habit,clone);
    checkDay('onFriday', habit, clone);
    checkDay('onSaturday', habit, clone);
}


function checkDay(element, habit, clone) {
    var boolDay = habit.get(element);

    var d = new Date();
    var n = d.getDay();

    if (boolDay) {
        switch (element) {
        case 'onSunday':
            if (n == 0) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onSunday").style.color = "black";
            clone.querySelector("#onSunday").style.fontWeight = "bold";
            break;
        case 'onMonday':
            if (n == 1) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onMonday").style.color = "black";
            clone.querySelector("#onMonday").style.fontWeight = "bold";
            break;
        case 'onTuesday':
            if (n == 2) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onTuesday").style.color = "black";
            clone.querySelector("#onTuesday").style.fontWeight = "bold";
            break;
        case 'onWednesday':
            if (n == 3) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onWednesday").style.color = "black";
            clone.querySelector("#onWednesday").style.fontWeight = "bold";
            break;
        case 'onThursday':
            if (n == 4) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onThursday").style.color = "black";
            clone.querySelector("#onThursday").style.fontWeight = "bold";
            break;
        case 'onFriday':
            if (n == 5) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onFriday").style.color = "black";
            clone.querySelector("#onFriday").style.fontWeight = "bold";
            break;
        case 'onSaturday':
            if (n == 6) {
                clone.getElementById("thumbsUp").className = clone.getElementById("thumbsUp").className + " enableThumbsUp";
                clone.getElementById("thumbsDown").className = clone.getElementById("thumbsDown").className + " enableThumbsDown";
            }
            clone.querySelector("#onSaturday").style.color = "black";
            clone.querySelector("#onSaturday").style.fontWeight = "bold";
            break;
        }
    }
}

function streak(habit, clone) {
    var currStreak = habit.get("currStreak");
    var bestStreak = habit.get("bestStreak");
    var percentage;

    if (bestStreak == 0) {
        percentage = 0;
    } else {
        var percentage = currStreak/bestStreak * 200;
    }

    $(clone).find('#progressBar').find('div').animate({ width: percentage }, 500);
    if (percentage == 200) {
        $(clone).find('#progressBar').find('div').css('background', '#009900');
    } else {
        $(clone).find('#progressBar').find('div').css('background', '#0099ff');
    }
}

function updateStreakFromButton(habit, element) {
    var currStreak = habit.get("currStreak");
    var bestStreak = habit.get("bestStreak");
    var percentage;

    if (bestStreak == 0) {
        percentage = 0;
    } else {
        var percentage = currStreak/bestStreak * 200;
    }

    $(element).find('#progressBar').find('div').animate({ width: percentage }, 500);

    if (percentage == 200) {
        $(element).find('#progressBar').find('div').css('background', '#009900');
    } else {
        $(element).find('#progressBar').find('div').css('background', '#0099ff');
    }

}


function addHabitToList(habit) {
    var list = document.getElementById("habit-list");
    var template = document.querySelector("#habit-template")
    var clone = document.importNode(template.content, true);

    clone.firstElementChild.setAttribute("data-id", habit.id)

    // Set up days display for each habit
    days(habit, clone);
    streak(habit,clone);

    var habitIcon = habit.get("icon");
    if (habitIcon) {
        clone.querySelector(".habit-icon").src = habitIcon.url();
    }

    /*
     * For each habit, check if currDate and actual current date are different
     * If they are, calculate the next day of habit from currDate, and see if it is
     * greater than actual current date; if it is, end streak
     * Also reset thumbCtr and numCompleted for the day
     */
    var dateStr = habit.get('currDate');
    var dateObj = new Date(dateStr);
    var currentDate = new Date();
    var month = currentDate.getUTCMonth() + 1; //months from 1-12
    var day = currentDate.getUTCDate();
    var year = currentDate.getUTCFullYear();
    var currDateStr = month + "/" + day + "/" + year;
    var dayOfWeek = currentDate.getDay();

    // Show completed/missed message if correct day
    if (habit.get(daysBoolArr[dayOfWeek])) {
        showMsg(clone.querySelector(".op-done"));
    } else {
        clone.querySelector(".message-today").className = clone.querySelector(".message-today").className + " hide";
        clone.querySelector(".message-missed").className = clone.querySelector(".message-missed").className + " hide";
    }

    if (compareDates(dateStr, currDateStr) != 0) {
        // Different day, so reset thumbCtr and numCompleted -- reset streak if did not complete habits
        if (habit.get('thumbCtr') != habit.get('frequency') && habit.get('numCompleted') < habit.get('frequency')) {
            habit.set('currStreak', 0);
        }
        habit.set('thumbCtr', 0);
        habit.set('numCompleted', 0);

        var daysToAdd = 0;
        var dateStrDay = habit.get('currDay');
        while (daysToAdd <= 7) {
            dateStrDay = (dateStrDay + 1) % 7;
            daysToAdd++;
            if (habit.get(daysBoolArr[dateStrDay])) {
                break;
            }
        }

        dateObj.setDate(dateObj.getDate() + daysToAdd);
        var nextDateStr = (dateObj.getUTCMonth() + 1) + "/" + dateObj.getUTCDate() + "/" + dateObj.getUTCFullYear();

        // Missed a day for habit, so reset streak
        if (compareDates(currDateStr, nextDateStr) == 1) {
            habit.set('currStreak', 0);
            streak(habit, clone);
        }

        // Update current date for habits
        habit.set('currDate', currDateStr);
        habit.set('currDay', currentDate.getDay());
        habit.save();
        /* habit.save(null, {
            success: function(updatedHabit) {
                // Execute any logic that should take place after the object is saved.
                // Update progress bar
                streak(updatedHabit, clone);
            },
            error: function(updatedHabit, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                console.log('Failed to update object, with error code: ' + error.message);
                alert("Error with accessing habits; please check your network connection and try again later.");
            }
        }); */
    }
    else {
        // If user already completed/failed habit the specified number of times for that day, disable
        //   both the thumbs up and thumbs down button
        if (habit.get('thumbCtr') == habit.get('frequency')) {
            clone.querySelector(".op-done").className = "op op-done";
            clone.querySelector(".op-down").className = "op op-down";
            // Display message if habit completed for the day
            // showMsg(clone.querySelector(".op-done"));
        }
    }

    clone.querySelector(".habit-name").textContent = habit.get('name');

    clone.querySelector(".currStreak").textContent = habit.get('currStreak');
    clone.querySelector(".bestStreak").textContent = habit.get('bestStreak');
    clone.querySelector(".frequencyPerDay").textContent = habit.get('frequency');
    clone.querySelector(".completed").textContent = habit.get('numCompleted');
    clone.querySelector(".missed").textContent = habit.get('thumbCtr') - habit.get('numCompleted');

    var res = list.appendChild(clone);
}

function completeHabit(element) {
    var habitID = element.parentNode.parentNode.getAttribute("data-id");
    var query = new Parse.Query(Habit);

    query.get(habitID, {
        success: function(habit) {
            // The object was retrieved successfully.
            var numCompleted = habit.get("numCompleted");
            var thumbCtr = habit.get("thumbCtr");
            var frequency = habit.get("frequency");
            var currStreak = habit.get("currStreak");
            var bestStreak = habit.get("bestStreak");

            if (thumbCtr < frequency) {
                thumbCtr++;
                numCompleted++;
                currStreak++;

                if (currStreak > bestStreak) {
                    bestStreak = currStreak;
                }

                habit.set("numCompleted", numCompleted);
                habit.set("thumbCtr", thumbCtr);
                habit.set("currStreak", currStreak);
                habit.set("bestStreak", bestStreak);

                habit.save(null, {
                    success: function(updatedHabit) {
                        // Execute any logic that should take place after the object is saved.
                        // Update message
                        element.parentNode.parentNode.querySelector(".currStreak").textContent = updatedHabit.get('currStreak')
                        element.parentNode.parentNode.querySelector(".bestStreak").textContent = updatedHabit.get('bestStreak');
                        element.parentNode.parentNode.querySelector(".completed").textContent = updatedHabit.get('numCompleted');
                        element.parentNode.parentNode.querySelector(".missed").textContent = updatedHabit.get('thumbCtr') - updatedHabit.get('numCompleted');

                        // Update progress bar
                        updateStreakFromButton(updatedHabit, element.parentNode.parentNode);
                    },
                    error: function(updatedHabit, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        console.log('Failed to update object, with error code: ' + error.message);
                        alert("Unable to update habit!  Please check your network connection and try again later.");
                    }
                });
            }

            if (thumbCtr == frequency) {
                // Disable thumbs up and thumbs down buttons
                element.parentNode.parentNode.querySelector('#thumbsUp').className = "op op-done";
                element.parentNode.parentNode.querySelector('#thumbsDown').className = "op op-down";
            }
        },
        error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            console.log("Habit object was not retrieved successfully!");
            alert("Unable to update habit!  Please check your network connection and try again later.");
        }
    });
}

function failHabit(element) {
    var habitID = element.parentNode.parentNode.getAttribute("data-id");
    var query = new Parse.Query(Habit);

    query.get(habitID, {
        success: function(habit) {
            // The object was retrieved successfully.
            var thumbCtr = habit.get("thumbCtr");
            var frequency = habit.get("frequency");

            if (thumbCtr < frequency) {
                thumbCtr++;

                // End streak if user indicates habit was not completed
                habit.set("thumbCtr", thumbCtr);
                habit.set("currStreak", 0);

                habit.save(null, {
                    success: function(updatedHabit) {
                        // Execute any logic that should take place after the object is saved.
                        // Update message
                        element.parentNode.parentNode.querySelector(".currStreak").textContent = updatedHabit.get('currStreak');
                        element.parentNode.parentNode.querySelector(".missed").textContent = updatedHabit.get('thumbCtr') - updatedHabit.get('numCompleted');

                        // Update progress bar
                        updateStreakFromButton(updatedHabit, element.parentNode.parentNode);
                    },
                    error: function(updatedHabit, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        console.log('Failed to update object, with error code: ' + error.message);
                        alert("Unable to update habit!  Please check your network connection and try again later.");
                    }
                });
            }

            if (thumbCtr == frequency) {
                // Disable thumbs up and thumbs down buttons
                element.parentNode.parentNode.querySelector('#thumbsUp').className = "op op-done";
                element.parentNode.parentNode.querySelector('#thumbsDown').className = "op op-down";
            }
        },
        error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            console.log("Habit object was not retrieved successfully!");
            alert("Unable to update habit!  Please check your network connection and try again later.");
        }
    });
}

// Resize titles on resize of window
$(window).resize(function() {
    $('.hidden-resizer').each(function(i, obj) {
        $(this).css("font-size", 24);
        while($(this).width() > $('.title-li').width()) {
            var size = parseInt($(this).css("font-size"), 10);
            $(this).css("font-size", size - 1);
        }
     });
})

// Script to run when page loads
var query = new Parse.Query(Habit);
query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
        addHabitToList(results[i]);
       // console.log(results[i]);
       // console.log(results[i].id);
    }

    // Resize titles so they fit in habit box
    $('.hidden-resizer').each(function(i, obj) {
        while($(this).width() > $('.title-li').width()) {
            var size = parseInt($(this).css("font-size"), 10);
            $(this).css("font-size", size - 1);
        }
     });
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});