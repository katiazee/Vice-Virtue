'use strict';

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("installing service worker")
});

self.addEventListener('subscribe', function(event) {
  // Perform install steps
  console.log("subscribig in service worker")
});

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  console.log(event.data)
console.log(asdgadgadg)

  var title = "Don't forget to do <Habit title here>!";
  var body = 'Remember to do <habit here> and update your progress.';
  var icon = '/img/logo.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});
