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

  var title = "Habit Reminder";
  var body = 'Remember to record your habits today!';
  var icon = 'http://katiazee.github.io/Vice-Virtue/img/logo.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://katiazee.github.io/Vice-Virtue/src/list.html?notif=true"));
});
