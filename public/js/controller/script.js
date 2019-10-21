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
              
               sendEmailVerification(data);

               var comname = $('#comname').val();
               var email=$('#mailid').val();
               
               function sendEmailVerification(data) {
                comname = firebase.auth().currentUser;
                email = data.email || user.email;
                return user.emailVerified || user.sendEmailVerification({
                  url: window.location.href + '?email=' + user.email,
                });
              }
              console.log(user);
              window.location.replace("./index.html");
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
             if(authData.emailVerified){
              window.location.replace("./main.html");
              console.log(authData);
             }else{
               alert('email not verified, please check your email for confirmation');
             }
             
           
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

     

      $('#wizard').on('click', function(e) {
        window.location.replace("wizard.html")
      });

    });