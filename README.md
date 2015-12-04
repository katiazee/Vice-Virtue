Team: Smarties
Members: Aaron Chuang, Amy Lin, Daniel Brim, Katerina Zorko, Seung (Brian) Kim
Assignment: Homework #4

Link to Github repo:  https://github.com/katiazee/Vice-Virtue

How to access our web application

Please use the following url to access our website: https://katiazee.github.io/Vice-Virtue/
Notifications only work in Google Chrome, so please visit our website using the link above.  However, our site works in Safari and Firefox as well if you visit our site locally (i.e. through the files in our zip file); it’s just that notifications will not work in those browsers (This is due to restrictions discussed further in this writeup).

Browser conformance

Unfortunately, due to the lack of support for templates and progress bars, our application does not display correctly in any version of IE.  This is the only issue with browser conformance we have (our website displays fine on the latest versions of Google Chrome, Firefox, and Safari).

Design and Changes from Original Markup

In developing and implementing the JavaScript for our application, we first decided we wanted to implement the use of a third party service to store our data, so we implemented the use of Parse to do this.  

As for the original markup for which this application is based on, we made a few design changes.  Firstly, we moved the delete button away from the main button group to the top right corner of the habit box for each habit on list.html, as we felt that the delete button is something that will not be used nearly as often as the other buttons.  We also added back the “thumbs down” button, to allow the user to indicate if they did not complete the habit for an instance on a given day.  We figured it’d be best to give users the option to tell the website that they forgot to complete a habit.  We also implemented the logic for if they forgot to record if they completed a habit or not; so no matter if the users decide to record their habits or if they forget, the logic for tracking streaks will still be functional.

A few notes on the logic flow of our application: on the habit listings page, we have grayed out the use of the “thumbs up” and “thumbs down” buttons if current day does not match the day for each habit.  For example, if you have a habit “Exercise 1 hour” set for Thursdays and Fridays, but the current day is Tuesday, you will not be able to “complete” or “fail” that habit for the day (the thumbs up and thumbs down buttons will both be grayed out/disabled).  In order to help make this clear, we added a small calendar on the bottom left of each habit box with the selected days for that habit bolded to make it clear to the user what days the habit is to be performed on.  Another thing is that users will have to set a frequency (or number of times per day) for each habit.  Users are only allowed to “complete” or “fail” a habit that number of times on a given day.  For example, if the user has a habit to “walk the dog” 3 times in a day, then the user will only be able to press the “thumbs up” and “thumbs down” button 3 times in total before those buttons will be grayed out.  So the user can press the “thumbs up” twice and the “thumbs down” button once, and the buttons will then be disabled.  Or the user can simply press the “thumbs up” button 3 times to indicate he completed the habit all 3 times that day, and the buttons then be disabled, and so on.  We have also tried to make this as clear as possible to user by including messages that display how many times the user has completed a given habit for a day, and another message display how many times the user did not complete a habit (pressed the “thumbs down” button).  Also, the progress bar has been implemented to be a percentage of how close you are to achieving your best streak for a habit (so if your current streak is 5 and your best streak is 10, the progress bar will be 50% full).

Also, on the add a habit and edit a habit page, for setting frequency of the habit (specifically number of times per day), we allow the user to select 1, 2, 3, or enter a value higher than 3.  We restrict the uses to selecting/entering a number less than 10, as we felt that users will generally not have habits that they would perform more than 10 times a day.  Or even if they did, it would be very unlikely that the user would be willing to track it using an application like ours, so we felt that it was an unnecessary use case.

Notifications

Ah, notifications. The bane of this homework’s existence. After much extensive research and exploring a number of notification options, we decided to settle on a single solution that works well for one platform. First, notifications are a widely unsupported feature and each browser on each platform implements them differently and may not even implement them at all. Instead of spreading resources thin and trying to create a solution that works everywhere but excels nowhere, we decided to focus on one specific platform in order to create a solution that we feel accomplishes the goal of the assignment. (We explored Goroost, Pushover, and Parse, but found them all unsuitable. Our thoughts on these sites are included later in this document.)

We decided to use Chrome’s Push Notification API to create our alarm notification solution. These push notifications work even when the website itself is closed. However, due to Chrome’s requirements, notifications only work in a very specific environment. 
Namely as follows...

Notifications work:
Only in Chrome
Only on Desktop (Might actually work in some Android Chrome browsers, but we were unable to test this without access to one.)
Only over HTTPS. 
And therefore, only when hosted over a live web URL. (https://katiazee.github.io/Vice-Virtue/ is a live url that is the only place push notifications will successfuly work. We kindly ask that when you test notifications, you use this link.)

Why these limitations? Google’s Chrome emphasizes security and allows only secure websites to register Push Notification web workers (a pivotal piece of JavaScript that runs in the background of Chrome). TLS/SSL is difficult to set up locally, but Github provides it for us very easily.

Caveats:
Notifications won’t be sent at second 0 for a given time. If an alarm is specified at 10:40, it’ll be sent sometime between 10:40:00 and 10:40:59. (The reason for this is because it’s cheaper to run server code every minute instead of every second, and use less CPU usage.)
Notifications won’t always arrive at the specified time. If our server sends a push notification at 10:40am, there may be an unspecified delay before it pops up in your browser. The reason is unclear, but probably because of network delays or maybe Chrome simply doesn’t guarantee that it will run the web worker the instant a push notification comes in. (Not a big deal though. Notifications usually arrive within a few minutes of the specified time, if they are late.)

Why not Goroost, Parse, or Pushover?
Goroost
Does not support individual push notifications. All push notifications were sent to all users. We wanted a solution that was customizable for each user.
Cost a lot. They required a credit card up front and for us, $30 is unacceptable for a solution we could create ourselves. 
Pushover
Only free for 7 days. 
“Our browser client enables desktop notifications in newer versions of Chrome (including Chrome OS), Firefox, and Safari when you have a tab open to our desktop app website.” We wanted a solution that worked even when the tab wasn’t open. If the tab is open, what’s the point of notifications?
Parse
Only had a Push Notification API for native apps, not JavaScript in a web browser. The API simply didn’t exist. 

(Note, no web solution works for iOS due to physical restrictions imposed by Apple.)

Validation issues

The only issues we had with validation were with our CSS.  Only list.css does not quite validate due to the use of “pointer-events.”  We used this attribute to disable mouse events (i.e. hover effects, as well as onclick functions) for the thumbs up and thumbs down buttons on habits where it was on the incorrect day or if you already completed that habit enough times on that day.  Researching pointer-events online, it seems like valid CSS to use, as this attribute is listed on Mozilla’s Developer Network, but perhaps it does not validate due to its lack of support on older versions of IE.  This is the only issue with validation we have.  All of our HTML files validate, and all CSS files (except for list.css due to use of pointer-events) validate as well.

Individual Team Member Contributions

Katerina

I handled all of the form validation in the add habit and edit habit page, which makes sure that if the user leaves one of the fields empty or enters an improper value (such as characters instead of numbers in the others field for the daily frequency or a value that is 10 or greater for the daily frequency) then the form will not be submitted and a habit will not be created (or edited). The errors are listed so that the user knows what they need to fix.
I also created an alarm template in the html for the add and edit pages so that based on the daily frequency that the user selects and whether they turn notifications on or off, the correct numbers of alarms can be created on the page. There are several methods for the creation of the alarms so that if the user selects a radio button for the daily frequency either 1, 2, or 3 alarms will be created. If they enter their own number that is more than 0 and less than 10, then that corresponding number of alarms will be created. If the user turns notifications off, the alarms disappear and if the user turns on notifications, a corresponding number of alarms will be created based on if a radio button is selected or a value is entered in the others textbox. If the user selects a radiobutton, then any value in the others textbox will be deleted whereas if the user enters a value in the textbox, any selected radiobutton will be deselected. 
In the edit page I added some code to the function that loads all of the habits from Parse, so that the users’ saved alarms are loaded (the times that they specified when they added the habit). 
Finally, I fixed some of the UI on the edit and add page by fixing spacing and adding style to the CSS. I moved all of the javascript functions in our html files into separate javascript files in a javascript folder.  

Amy 

On the add a habit/ edit a habit page, I handled the new icon upload so when you click the new icon, it acts as a button and allows you to select an image from your folders. The image is hidden in the beginning, then after it’s selected and loaded, it image then appears to the right of the icon button. I also started working on the notifications by adding the buttons and the first three alarms. On list.html, I made it so if the current day isn’t a day that you originally selected for that habit, the check and thumbs down button are disabled because you should not be able to do those habits that day. To remind the user why they are disabled,  I displayed the days for which the habit was selected for. It bolds the days that were selected, and the ones that were not selected are just gray and not in bold. I also made the progress bar for each habit reflective of how many times in a row you’ve done that habit / your best streak. When you have reached your highest streak, the progress bar turns green to acknowledge that you’re doing a good job. If the thumbs down button is pressed, your streak for that habit is broken and it is reset to 0 and turns back to blue. The progress bar is also animated so the thumbs up and thumbs down transitions are smooth. Lastly, I moved the delete button to the top right hand corner for practical purposes. 

Aaron

I created the Parse database for our application and implemented most of the CRUD functionality for the habit application.  I designed the schema for our Habit objects/table and how data for each habit should be stored.  I implemented adding a habit (creating objects and uploading them to Parse), editing a habit (which included querying for a habit, pre-filling in input boxes with old data, and updating a habit object on Parse), and several pieces of logic for listing habits as well.  I also implemented the functionality in the thumbs up and thumbs down buttons, as well as the logic for streaks by, taking into account number of times the user completed the habit on a given day and the current date itself (i.e. determining if the user completed a habit enough times for a given day, it they missed any days for habits, etc.).  While Amy handled getting the browser to allow the user to choose a file to upload (for icon uploads), I had to write the logic for uploading images into Parse, which was challenging as well.  I also contributed to UI javascript for our application as well.  After implementing most of the basic functionality for the habit application, we found that some elements we added didn’t scale well on browsers of smaller width or on phones; so I helped in resizing certain elements (for example, the resizing of the habit title based on the browser width), as well as the spacing of the icon images to get everything to fit on the screen.  I also added the extra message on the list.html page to indicate how many times a person “failed” a habit on a given day.  I also implemented a few animations, such as the fading of the HTML element on the delete of a habit, as well as some basic animations on the welcome page.

Daniel

I did notifications. (See above.) This involved writing the client-side JavaScript code to communicate with Chrome’s Push Notification API, register a web worker to handle incoming push notifications, a separate web server to receive Chrome IDs and store them for later use, and server-side python to continuously check the time and send out the actual push notification when appropriate. This also involved writing the appropriate JavaScript to handle any errors when communicating with the Push API and handle compatibility with other browsers.

I also worked with Aaron to incorporate Parse into our app and created list.html which is the default place to view all of your habits. I used HTML templates to dynamically list all of the habits that exist in the database and helped write the JavaScript to populate each habit with its appropriate fields (name, image, habit streak, etc.)

Brian

My focus was on the user interface and animation functionality of the project. I started with color scheme changes on buttons and options. The buttons were similarly matched to a blue/gray/white/tan-green color scheme. Certain buttons also change color,opacity, and size based on whether the pointer is hovered over the button. The Login Page contains the animation of fading as well as resizing of the sign-up and login buttons. The Welcome Page has hover buttons as well as color changes to the buttons when the cursor is hovered over them. On the Add Habit/Edit Page the weekly/daily frequency button colors change when they are clicked on; additionally, the alarm options have been resized and recolored to better match the layout. Animation changes to the add/edit habit page include “pulse”. Lastly on the habit list page, the habits zoom in and the add button slides in. 
