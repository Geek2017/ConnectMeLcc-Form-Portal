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
     
        $("#uname").text(user.displayName);

      }
    });

      $('#wizard-validation').on('submit', function (e) {
        e.preventDefault();
      
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
               window.location.replace("./main.html")
               return user.updateProfile({
                displayName: data.comname + '::' + data.comid
              })
              }).catch(function(error) {
                console.log("Registration Failed!", error.message);
                alert(error.message+' Check your input');
             
              });
             
             
          }
        }  
      });

      $('#loginForm').on('submit', function (e) {
        e.preventDefault();
       
    
        if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
          //login the user
          var data = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
          };
          firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(function(authData) {
              auth = authData;
             
             console.log(authData);
             window.location.replace("./main.html");
           
            })
            .catch(function(error) {
              console.log("Login Failed!", error.message);
              alert(error.message+' Check your input');
           
            });
        }
      });
    
      $('#logout').on('click', function(e) {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
          console.log('Out')
          window.location.replace("./index.html");
        });
      });

      var email = document.querySelector('#resetloginEmail').value;
             
                

      $("#resetEmail").on("submit", function (e) {
              e.preventDefault();

              const email = $('#resetloginEmail').val();
              console.log(email);
              
              firebase.auth().sendPasswordResetEmail(email)
              .then(function() {
                  alert('Reset link has been sent to provided email address');
              })
          });

      $('#wizard').on('click', function(e) {
        window.location.replace("wizard.html")
      });

    });