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

      //Register



      $('#wizard-validation').on('submit', function (e) {
        e.preventDefault();
        alert('90123');
       
        var data = {
          email: $('#mailid').val(),
          comname: $('#comname').val(),
          comid: $('#comid').val(),
        };
        var passwords = {
          password : $('#registerPassword').val(), //get the pass from Form
          cPassword : $('#registerConfirmPassword').val(), //get the confirmPass from Form
        }
        if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' ){
          if( passwords.password == passwords.cPassword ){
            //create the user
            
            firebase.auth()
              .createUserWithEmailAndPassword(data.email, passwords.password)
              .then(function(user) {
               console.log(user)
               return user.updateProfile({
                displayName: data.comname + '::' + data.comid
              })
              })
             
             
          }
        }  
      });
    });