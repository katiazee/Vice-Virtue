Parse.initialize("Ih70t530LwJAnRJungwuPtE2nE3eakzmwVuZHb6O","sE6Y6iMcoTTa9Z3pBCaAtwnD9F1L9SlWHBKlDQ7h");function onSignUpPress(){var a=validateEmail();if(validatePassword()&&a){registerAccount()}}function verifyPasswords(){var b=document.getElementById("validPass").value;var a=document.getElementById("validConfirmPass").value;if(b==""||a==""){return false}else{if(b!=a){document.getElementById("validConfirmPass").style.border="1px solid";document.getElementById("validConfirmPass").style.borderColor="#b94a48";document.getElementById("passwordsMismatch").style.display="block"}else{document.getElementById("passwordsMismatch").style.display="none";document.getElementById("validConfirmPass").style.border="2px inset";return true}}}function validateEmail(){var a=document.getElementById("validEmail");document.getElementById("emailTaken").style.display="none";a.style.border="2px inset";if(a.value==""){a.style.border="1px solid";a.style.borderColor="#b94a48";document.getElementById("noEmail").style.display="block";return false}else{document.getElementById("noEmail").style.display="none";a.style.border="2px inset";return true}}function validatePassword(){var e=document.getElementById("validPass");var d=document.getElementById("validConfirmPass");var c=false;var a=false;var b=true;document.getElementById("passwordsMismatch").style.display="none";document.getElementById("validConfirmPass").style.border="2px inset";if(e.value==""){e.style.border="1px solid";e.style.borderColor="#b94a48";document.getElementById("noPass").style.display="block";b=false}else{e.style.border="2px inset";document.getElementById("noPass").style.display="none"}if(d.value==""){d.style.border="1px solid";d.style.borderColor="#b94a48";document.getElementById("noConfirmPass").style.display="block";b=false}else{document.getElementById("noConfirmPass").style.display="none";d.style.border="2px inset"}if(b){b=verifyPasswords()}return b}function registerAccount(){var a=new Parse.User();a.set("username",document.getElementById("validEmail").value);a.set("password",document.getElementById("validPass").value);a.set("email",document.getElementById("validEmail").value);a.signUp(null,{success:function(b){location="welcome.html"},error:function(b,c){if(c.code==202){document.getElementById("validEmail").style.border="1px solid";document.getElementById("validEmail").style.borderColor="#b94a48";document.getElementById("emailTaken").style.display="block"}else{alert("Error: "+c.code+" "+c.message)}}})};