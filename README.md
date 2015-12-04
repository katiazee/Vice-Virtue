Team: Smarties
Members: Aaron Chuang, Amy Lin, Daniel Brim, Katerina Zorko, Seung (Brian) Kim
Assignment: Homework #5

Link to Github repo:  https://github.com/katiazee/Vice-Virtue

How to access our web application

Like HW4, please use the following url to access our website: https://katiazee.github.io/Vice-Virtue/

A sample account you may use to login:
Email: achuang94@yahoo.com
PW: sameasyours

The sign up/register an account, logging in, and resetting your password features are all functional in our web application, so please feel free to register your own account when testing our final web application, but we have provided a test account for you to use if you so wish.

Similar to HW4, notifications still only work in Google Chrome and only through HTTPS (i.e. only on a live web URL) due to restrictions and security requirements of Chrome’s Push Notification API, so please visit our website using the link above.  However, our site works in Safari and Firefox as well if you visit our site locally (i.e. through the files in our zip file); it’s just that notifications will not work in those browsers (for the same restrictions discussed in the HW4 README).

From HW4, we made a few modifications to our web application to make the entire application more complete.  Firstly, we added user authentication through Parse’s interface.  We created new markup pages for signing up and for resetting your password.  Also, we added form validation to the login.html page.  Now any end user using our website can easily register an account for our application and login to save and view their habits anytime.  We also modified the logic in the habit list page and the “add a habit” page, so that each habit is saved to a specific user.  This way, only each user will see their own habits (and none that are not their own) when they are logged into their account.  We have also added a “logout” button on the habit list page.

One note about the logic of our application: we now have the welcome.html, list.html, add.html, and edit.html all redirect the user to the login page if the end user tries to access those pages without logging into an account first, since now you should not be able to view habits, add habits, or edit habits if you are not logged into an account.



Error Monitoring

https://app.raygun.io/dashboard/g0g957 (may be unable to view these due to lack of permissions)

We used Raygun’s crash reporting tool (https://raygun.io/) for our error monitoring. We were able to see when and where an error occurred, and also the time that it occurred.  After adding code to our application to track these errors, we were able to track any errors that occurred when users were using our site.  We have attached some screenshots of the data we were able to collect in the raygun_screenshots folder in our zip archive.


Data Analytics

For User Analytics, we compared a few different 3rd party analytic providers and settles on using Parse’s analytic library. The next best analytic library we looked into was Mixpanel. 

Pros
Easy to integrate. We decided to go with Parse because it was already integrated into our site in order to run our backend. It already kept track of a number of valuable metrics such as number of users, number of Habits created, number and type of API requests being made, among others. Adding custom metric points into Parse was quick and easy. 
No extra JS needed. One advantage of using Parse over Mixpanel was that Mixpanel required its own JavaScript library to be linked to. This would have slowed down performance times on every page we wanted to track. 

Cons
Limited analytic functionality. One downside (and probably the biggest), was that we felt the functionality of Parse’s analytics was lacking in comparison to Mixpanel in terms of what you could actually do with the data. Parse shows you counts of events, and not much else. On the other hand, Mixpanel lets you manipulate the data in various ways in order to better understand it. For example, you can filter on events and values, graph correlations between metrics, and overall have finer control of the data. 

Metrics

On top of what Parse tracks automatically, we decided to track the most meaningful metrics we could think of:
user logging in, logging out
user signing up
creation of habit
deletion of habit
successfully completing habit
unsuccessfully marking a habit 
viewing your habit list
clicking on a push notification

We included some screenshots (in analytics_screenshots) of the more meaningful metrics: clicking on a push notification, and successfully and unsuccessfully marking a habit. (Obviously, without real users the data looks terribly small and meaningless. But you get the idea.)

The first graph (analytic1.png) shows the menu for viewing which metrics we want to graph as well as the number of times users completed habits over a week period. 

The second graph (analytic2.png) shows the number of times users viewed their habits, after clicking on a push notification! This is important to note because notifications are an important trigger to get users into our app and maintain usages rates. 


HTML, CSS, JS Minification and Bundling

We explored the use of several tools to minimize our HTML, CSS, and JS files.  Firstly, we tried using Grunt to automate the concatenation and minification of our CSS and JS files.  We were able to set up NPM and use grunt to create a task that would bundle and minify our files for us automatically; however, we ran into an issue after concatenating our files.  Our CSS files seemed to have conflicting rules that overlapped with various HTML elements on several pages, messing up the markup and styling of our application.  Likewise, for our JS files, bundling/concatenating each script file together lead to some issues as well, as we had a few functions in our JavaScript that were modifying specific element ID’s that appeared in multiple HTML pages.  Also, originally, we had a JS file for each page, and several of those pages have scripts that run when the page loads.  As a result, we experienced issues on a few pages of our application after bundling the JS together, as each page was running a script for window.onload for a different page.

Consequently, we decided to look into the use of another tool for minifying our files.  We ended up using YUI compressor (found here: http://yui.github.io/yuicompressor/) to minify our CSS and JS files individually.  We also found another resource online that helped us minify our HTML files as well (found here: http://www.willpeavy.com/minifier/).  The only issues we ran into with the minimization using these tools was the elimination of some whitespaces in our application in some places.  After careful inspection, we were able to add it back by adding a few extra spaces in a few spots to maintain the spacing and styling of our application.  But this way, we were able to maintain functionality of our application while still minimizing our files substantially.  


Proof of Concept for iOS and Android

iOS 

There are a number of solutions for creating iOS app versions of projects that we looked at, including PhoneGap (https://build.phonegap.com/apps) and actually creating an Xcode project. We decided to use PhoneGap (Cordova) to create a simple PoC to prove the app scales and works. 
PhoneGap Pros
Quick & easy. For a proof-of-concept, PhoneGap made it easy to take our web code and get it on a phone. 
PhoneGap Cons
No notifications. iOS has a great notification system, but unless you create a truly native app, it’s next to impossible to take advantage of them. We created a wonderful push notification system for Chrome, but that doesn’t translate well to a mobile app. Given a lot more time, it would be cool to create a real mobile app that could have notifications as well as take advantage of other iOS specific features, but that is not possible in a web client class.

Because iOS is heavily locked down by Apple, the included .ipa won’t be able to be run in the simulator or on a real device to be tested. (It can be run on a real iOS device and we verified that it works the same way the Android .apk works (see below), but we’d need your Apple iPhone unique id to validate and yada-yada… proprietary software sucks.) We included it to prove that it works – just trust us :P, but the Android .apk file works the exact same way and can be run on the simulator.  

Android 

When we used PhoneGap to build an apk file for Android development, the PhoneGap build did not include internet access and since the apk file is already packaged, there is no way to open the config files inside and enter the necessary code to establish an internet connection. So although the iOS PhoneGap build worked more or less seamlessly, PhoneGap couldn’t be used for an Android app. Therefore, we decided to take a look at Apache Cordova:
 https://cordova.apache.org/#getstarted
We installed Cordova (which is basically the most recent version of PhoneGap) and then created a new project, added the android platform to the project. We installed Android Studio:
http://developer.android.com/sdk/index.html
We created a new AVD (Android Virtual Device) and installed the necessary packages for the virtual device. We copied and pasted our github files into the new cordova app, such as all of the html, javascript, css, and image files. Since upon creation of the Cordova app, an index.html file is already created, we copied some of the material from our index.html into their index.html. Their index.html file calls index.js, which handles the initialization of the device, such as setting up the listeners, and index.html also calls cordova.js, which handles the whole creation of the app. At the end of index.js, we set the location to login.html which is the first html page that the user should see after the app loads. 
We had to change some of the html and javascript files so that they point to the correct paths, such as going up a directory, going into another directory, etc, since now all of these files from our github were organized and being run in a different way in the cordova app. 
The startup “logo.png”  image also had to be resized so that it would show up with correct dimensions when the app was running. 
Finally, we could launch the Android emulator by running our cordova app on the Android platform. After all of the above changes, the app worked in the Android emulator. We can create a user, add and edit habits, logout, change our password, etc. Unfortunately, we cannot run notifications, because the app has to be hosted on a secure server that we have set up for Google Chrome only. For setting up notifications on Android, we would need to use Android-specific tools. 
After running the Apache Cordova app on the Android platform, it builds an apk file, which we have submitted.   
To run the apk file, you must have Android Studio installed with all necessary updates. You must also set up an AVD. After this, navigate into the Android/sdk/platform-tools directory. If you use a Mac, then you can run:
./adb install -r path/to/ViceVirtueAndroid-debug.apk
If you use Windows run:
adb install -r path/to/ViceVirtueAndroid-debug.apk

This will install the app on the emulator. You can then open the app to launch it in the emulator. 
Overall, we think that PhoneGap can be used for iOS, but not for Android since PhoneGap had a problem with setting up an Internet connection. The apk file it builds is packaged and the config files inside cannot be altered to include the code needed for setting up an Internet connection. Apache Cordova, however can more easily create an Android app because you can directly edit the config files and after a few minor edits, you can have your app running on an Android device. Overall, the Apache Cordova apk build was more or less streamlined, but it still took quite a bit of tinkering with to get our app to run seamlessly. 


Contributions

Daniel:
I implemented user analytics in Parse as well as worked to create and verify the iOS version with PhoneGap. I also update our notification system to take be user specific on both the client side and the server side. I also helped Katerina with the Android version with PhoneGap.

Aaron:
I worked on implementing user authentication for our application through Parse.  I added the functionality for user login, registering an account, resetting your password, as well as adding and viewing habits for each specific user.  I added some form validation for the login page as well.  Also, I minified all of our HTML, CSS, and JS files.

Brian:
I worked on creating the login and reset password pages. Created the html, css, and JavaScript for each respective page. I also worked on form validation for each respective page and linking of the pages to Parse. The form validation included blank input checks as well as sending out a success message for resetting your password. 

Amy: 
I set up Raygun for the error reporting, and added the HTML and CSS for the logout button.

Katerina: 
I got our app running on an Android virtual device in Android Studio through creating an Apache Cordova project. (Refer to Android section of POC). Additionally, I created a PhoneGap account to build an ipa and apk file from our github link. I helped a bit with getting a certificate and key to build the ipa file and I tried to get the PhoneGap apk file to work, before switching to Apache Cordova.
