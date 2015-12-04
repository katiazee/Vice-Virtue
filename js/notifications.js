var isPushEnabled = false;

window.addEventListener('load', function() {
  var pushButton = document.querySelector('.onoffswitch-checkbox');
  var proto = location.protocol
  if (proto !== 'https:') {
      document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)
      document.getElementById('noNotifications').style.display = 'block';
      document.getElementById('noNotifications').textContent= 'Notifications only work over secure HTTPS.';
  }
  pushButton.addEventListener('click', function(event) {
    console.log("switched")
    if (event.target.checked) {
        subscribe();
    } else {
        // unsubscribe
    }
  });


  // Check that service workers are supported, if so, progressively
  // enhance and add push messaging support, otherwise continue without it.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../worker.js')
    .then(initialiseState);
  } else {
    console.warn('Service workers aren\'t supported in this browser.');
    document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)
    //TODO
    // Set some kind of error message
    document.getElementById('noNotifications').style.display = 'block';
  }
});

// Once the service worker is registered set the initial state
function initialiseState() {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notifications aren\'t supported.');
    document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)

    //TODO
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)
    //TODO
    document.getElementById('noNotifications').style.display = 'block';
    document.getElementById('noNotifications').textContent= 'Enable notifications in your browser in order to receive push notifications';

    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)
    //TODO
    document.getElementById('noNotifications').style.display = 'block';
    document.getElementById('noNotifications').textContent= 'Push notifications are not supported in your browser';
    return;
  }
}

function subscribe() {
  // Disable the button so it can't be changed while
  // we process the permission request
  console.log("subscribing")
  var pushButton = document.querySelector('.onoffswitch-checkbox');

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {

    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from
        // push messages.
        var pushButton = document.querySelector('.onoffswitch-checkbox');
        pushButton.disabled = false;

        if (!subscription) {
          // We aren't subscribed to push, so set UI
          // to allow the user to enable push
          serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly:true})
            .then(function(subscription) {
              // The subscription was successful
              console.log('here - success')
              console.log('endpoint:', subscription.endpoint);
              isPushEnabled = true;
              // pushButton.disabled = false;

              console.log(subscription)
              // TODO: Send the subscription.endpoint to your server
              // and save it to send a push message at a later date
              sendSubscriptionToServer(subscription);
            }).catch(function(e) {
              if (Notification.permission === 'denied') {
                // The user denied the notification permission which
                // means we failed to subscribe and the user will need
                // to manually change the notification permission to
                // subscribe to push messages
                document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)
                //TODO
                document.getElementById('noNotifications').style.display = 'block';
                document.getElementById('noNotifications').textContent= 'Enable notifications in your browser in order to receive push notifications';
                pushButton.disabled = true
              } else {
                // A problem occurred with the subscription; common reasons
                // include network errors, and lacking gcm_sender_id and/or
                // gcm_user_visible_only in the manifest.
                document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", true)
                //TODO
                document.getElementById('noNotifications').style.display = 'block';
                document.getElementById('noNotifications').textContent= 'Unfortunately, we were unable to enable notifications';
                // pushButton.disabled = true
                console.log(e)
              }
            });
          return;
        }

        console.log(subscription)
        // Already have a subscription id, but send it to the server anyway, in case
        sendSubscriptionToServer(subscription);

        // Set your UI to show they have subscribed for
        // push messages
        isPushEnabled = true;
      })
      .catch(function(err) {
        console.warn('Error during getSubscription()', err);
        document.querySelector(".onoffswitch-checkbox").setAttribute("disabled", false)
        document.getElementById('noNotifications').style.display = 'block';
        document.getElementById('noNotifications').textContent= 'Unfortunately, we were unable to enable notifications';
        pushButton.disabled = true
      });
  });
}

function user() {
    var currentUser = Parse.User.current();
    var username = currentUser.get("username");
    console.log("current user: " + username);
}

function sendSubscriptionToServer(subscription) {
    console.log(subscription)
    console.log('endpoint:', subscription.endpoint);
    var curruser = user()
    $.ajax({
        url: "https://vice-virtue.herokuapp.com/subscribe",
        type: "POST",
        data: { endpoint: subscription.endpoint, user:curruser },
        dataType: "json",
        success: function (result) {
            switch (result) {
                case true:
                    processResponse(result);
                    break;
                default:
                    resultDiv.html(result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}
