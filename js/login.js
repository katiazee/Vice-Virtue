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

function onClickSignUp() {
  var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "block";
}
