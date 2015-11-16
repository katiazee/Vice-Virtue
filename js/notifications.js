console.log("hello world")

var isPushEnabled = false;

window.addEventListener('load', function() {
  var pushButton = document.querySelector('.notifbutton');
  pushButton.addEventListener('click', function() {
    if (isPushEnabled) {
      unsubscribe();
    } else {
      subscribe();
    }
  });

  // Check that service workers are supported, if so, progressively
  // enhance and add push messaging support, otherwise continue without it.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../worker.js')
    .then(initialiseState);
  } else {
    console.warn('Service workers aren\'t supported in this browser.');
  }
});

// Once the service worker is registered set the initial state
function initialiseState() {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notifications aren\'t supported.');
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.warn('Push messaging isn\'t supported.');
    return;
  }

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from
        // push messages.
        var pushButton = document.querySelector('.notifbutton');
        pushButton.disabled = false;

        if (!subscription) {
          // We aren't subscribed to push, so set UI
          // to allow the user to enable push
          return;
        }

        console.log(subscription)
        // Keep your server in sync with the latest subscriptionId
        sendSubscriptionToServer(subscription);

        // Set your UI to show they have subscribed for
        // push messages
        pushButton.textContent = 'Disable Push Messages';
        isPushEnabled = true;
      })
      .catch(function(err) {
        console.warn('Error during getSubscription()', err);
      });
  });
}

function subscribe() {
  // Disable the button so it can't be changed while
  // we process the permission request
  var pushButton = document.querySelector('.notifbutton');
  console.log('button pushed')
  if ('serviceWorker' in navigator) {
      console.log("serviceworker in navigators")
      console.log(navigator.serviceWorker.ready)
  } else {
      console.log("nope")
  }
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      console.log(serviceWorkerRegistration)
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly:true})
      .then(function(subscription) {
        // The subscription was successful
        console.log('here - success')
        isPushEnabled = true;
        pushButton.textContent = 'Disable Push Messages';
        pushButton.disabled = false;

        console.log(subscription)
        // TODO: Send the subscription.endpoint to your server
        // and save it to send a push message at a later date
        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          console.warn('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription; common reasons
          // include network errors, and lacking gcm_sender_id and/or
          // gcm_user_visible_only in the manifest.
          console.error('Unable to subscribe to push.', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        }
      });
  });
}
