Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O", "sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");

function onClickSignUp() {
	var signUpText = document.getElementById("signInMessage");
	signUpText.style.display = "block";
}

function signIn() {
	var userEmail = document.getElementById('usermail').value;
	var password = document.getElementById('password').value;

	// Parse.User.logOut();

	Parse.User.logIn(userEmail, password, {
		success: function(user) {
			// Do stuff after successful login.
			// alert(userEmail + ' was successfully logged in!');
			location = "welcome.html";
		},
		error: function(user, error) {
			// The login failed. Check error to see why.
			alert("Error: " + error.code + " " + error.message);
			document.getElementById('usermail').style.border = '1px solid';
			document.getElementById('usermail').style.borderColor = '#b94a48';
			document.getElementById('password').style.border = '1px solid';
			document.getElementById('password').style.borderColor = '#b94a48';
		}
	});
}