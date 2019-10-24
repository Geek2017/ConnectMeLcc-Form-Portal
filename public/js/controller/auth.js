$(document).ready(function () {
  // alert('checking')
 
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.emailVerified) {
        console.log(user.emailVerified)

      } else {
       console.log(user.emailVerified)
        window.location.replace("./index.html");
        
      }
    });
  });