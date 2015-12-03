Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O", "sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");

function onSignUpPress() {
	var doesEmailValidate = validateEmail();
	if (validatePassword() && doesEmailValidate) {
		registerAccount();
	}
}

function verifyPasswords() {
	var password = document.getElementById("validPass").value;
	var confirmPassword = document.getElementById("validConfirmPass").value;

	if (password == "" || confirmPassword == "") {
		return false;
	}
	else if (password != confirmPassword) {
		// Display form or what not
		document.getElementById("validConfirmPass").style.border = '1px solid';
		document.getElementById("validConfirmPass").style.borderColor = '#b94a48';
		document.getElementById('passwordsMismatch').style.display = 'block';
	}
	else {
		document.getElementById('passwordsMismatch').style.display = 'none';
		document.getElementById("validConfirmPass").style.border = '2px inset';
		return true;
	}
}

function validateEmail() {
	var emailAddress = document.getElementById("validEmail");

	document.getElementById('emailTaken').style.display = 'none';
	emailAddress.style.border = '2px inset';

	// Validation for email addresss
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

function validatePassword(){
	var createPass = document.getElementById("validPass");
	var confirmPass = document.getElementById("validConfirmPass");
	var createPassValid = false;
	var confirmPassValid = false;
	var doesValidate = true;

	document.getElementById('passwordsMismatch').style.display = 'none';
	document.getElementById("validConfirmPass").style.border = '2px inset';

	//Validation for creating a password
	if(createPass.value == ""){
		createPass.style.border = '1px solid';
		createPass.style.borderColor = '#b94a48';
		document.getElementById('noPass').style.display = 'block';
		doesValidate = false;
	}
	else{
		createPass.style.border = '2px inset';
		document.getElementById('noPass').style.display = 'none';
		// createPassValid = true;
	}

	//Validation for confirming password
	if(confirmPass.value == ""){
		confirmPass.style.border = '1px solid';
		confirmPass.style.borderColor = '#b94a48';
		document.getElementById('noConfirmPass').style.display = 'block';
		doesValidate = false;
	}
	else{
		document.getElementById('noConfirmPass').style.display = 'none';
		confirmPass.style.border = '2px inset';
		// confirmPassValid = true;
	}

	// If passwords both have values; check if they are the same
	if (doesValidate) {
		doesValidate = verifyPasswords();
	}

	return doesValidate;
}

function registerAccount() {
	var user = new Parse.User();
	user.set("username", document.getElementById("validEmail").value);
	user.set("password", document.getElementById("validPass").value);
	user.set("email", document.getElementById("validEmail").value);

	user.signUp(null, {
		success: function(user) {
			alert('User successfully created!');
			location = "welcome.html";
		},
		error: function(user, error) {
			// User already taken error
			if (error.code == 202) {
				document.getElementById("validEmail").style.border = '1px solid';
				document.getElementById("validEmail").style.borderColor = '#b94a48';
				document.getElementById('emailTaken').style.display = 'block';
			}
			else {
				// Other error
				alert("Error: " + error.code + " " + error.message);
			}
		}
	});
}

