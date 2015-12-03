Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O", "sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");

function onButtonClick() {
	document.getElementById("yesEmail").style.display = 'none';
	document.getElementById("invalidEmail").style.display = 'none';

	if (validateEmail()) {
		resetPass();
	}
}

function resetPass() {
	Parse.User.requestPasswordReset(document.getElementById("validEmail").value, {
		success: function() {
			// Password reset request was sent successfully
			document.getElementById("yesEmail").style.display = 'block';
			document.getElementById("validEmail").style.border = '2px inset';
		},
		error: function(error) {
			// Show the error message somewhere
			console.log("Error: " + error.code + " " + error.message);
			if (error.code == 125) {
				document.getElementById("invalidEmail").style.display = 'block';
				document.getElementById("validEmail").style.border = '1px solid';
				document.getElementById("validEmail").style.borderColor = '#b94a48';
			}
		}
	});
}

function validateEmail() {
	var emailAddress = document.getElementById("validEmail");
	if(emailAddress.value == ""){
		emailAddress.style.border = '1px solid';
		emailAddress.style.borderColor = '#b94a48';
		document.getElementById('noEmail').style.display = 'block';
		return false;
	}
	else{
		document.getElementById('noEmail').style.display = 'none';
		emailAddress.style.border = '2px inset';
		return true;
	}
}