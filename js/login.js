
  rg4js('apiKey', '5HU2mFdkS/e5Tur8l31gcA==');
  rg4js('attach', true);
  rg4js('enablePulse', true);

  rg4js('setUser', {
  identifier: 'users_email_address_or_unique_id@domain.com',
  isAnonymous: false,
  email: 'users_email_address@domain.com',
  firstName: 'Firstname',
  fullName: 'Firstname Lastname'
});

Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O", "sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");


function onClickSignUp() {
	var signUpText = document.getElementById("signInMessage");
	signUpText.style.display = "block";
}

function signIn() {
	var userEmail = document.getElementById('usermail').value;
	var password = document.getElementById('password').value;

	// Parse.User.logOut();
	document.getElementById('usermail').className = "textInput";
	document.getElementById('password').className = "textInput";
	document.getElementById('invalidLoginError').style.display = 'none';

	Parse.User.logIn(userEmail, password, {
		success: function(user) {
			// Do stuff after successful login.
			// alert(userEmail + ' was successfully logged in!');
			location = "welcome.html";
		},
		error: function(user, error) {
			// The login failed. Check error to see why.
			// alert("Error: " + error.code + " " + error.message);
			document.getElementById('usermail').className = document.getElementById('usermail').className + " inputError";
			document.getElementById('password').className = document.getElementById('password').className + " inputError";
			document.getElementById('invalidLoginError').style.display = 'block';
		}
	});
}