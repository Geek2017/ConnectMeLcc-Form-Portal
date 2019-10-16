$(document).ready(function () {
   //initialize the firebase app
   var config = {
    apiKey: "AIzaSyAViE8I43AmabHmS3ZDhdnv_u6psVEOO5g",
    authDomain: "formportal2019.firebaseapp.com",
    databaseURL: "https://formportal2019.firebaseio.com/",
    projectId: "formportal2019"
  };
  firebase.initializeApp(config);

  //create firebase references
  var Auth = firebase.auth();
  var dbRef = firebase.database();
  var contactsRef = dbRef.ref('contacts')
  var usersRef = dbRef.ref('users')
  var auth = null;

    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.displayName)
        $('#uname').val(user.displayName);
        $("#uname").text(user.displayName);

      } else {
        window.location.replace("./index.html");
        
      }
    });


   

  });