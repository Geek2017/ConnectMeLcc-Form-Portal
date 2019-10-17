$(document).ready(function () {
 
 
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
   

      } else {
       console.log(user+"val")
        window.location.replace("./index.html");
        
      }
    });


   

  });