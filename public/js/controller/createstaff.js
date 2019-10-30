$(document).ready(function () {

   
    $('#createstaff').on('submit', function (e) {
        e.preventDefault();
        alert('checking')
        var data = {
          stuffname:$('#stuffname').val(),
          stuffmail:$('#stuffmail').val(),
          stuffcontacts:$('#stuffcontacts').val(),
          stuffdesignation:$('#stuffcontacts').val()
        };


        var passwords = {
          password : $('#stuffpassword').val(), 
          cPassword : $('#stuffre-password').val(),
        }  

        if( data.stuffmail != '' && passwords.password != ''  && passwords.cPassword != '' ){
          if( passwords.password == passwords.cPassword ){
            //create the user
            
            firebase.auth()
              .createUserWithEmailAndPassword(data.stuffmail, passwords.password)
              .then(function(user) {
              
               sendEmailVerification(data);
               save_cus_credencials();
              

               var cusname = $('#stuffname').val();
               var email= $('#stuffmail').val();
               
               function sendEmailVerification(data) {
                cusname = firebase.auth().currentUser;
                email = data.email || user.email;
                var urlr="https://cmlformportal-b8674.firebaseapp.com";

                return user.emailVerified || user.sendEmailVerification({
                  url: urlr,
                });
              }
              //save customer cred to firebase
              function save_cus_credencials(){
               
               
                var uid = firebase.database().ref().child('users').push().key;
                var cusid = "";
                var cusname = $('#stuffname').val();
                var cusemail =$('#stuffmail').val();


                var data = {
                 user_id: uid,
                 cusid:cusid,
                 cusname:cusname,
                 cusemail:cusemail,
                 role:"admin"
                }

                var updates = {};
                updates['/users/' + uid] = data;
                firebase.database().ref().update(updates);
                refresh(localStorage.setItem("hidme",1));
              
              }

   

              function refresh(){
                setTimeout(function(){ alert("Data Successfully Sent"); 
                window.location.refresh();
              }, 1000);
              }
          
              }).catch(function(error) {
                console.log("Registration Failed!", error.message);
                alert(error.message+' Check your input');
             
              });
             
             
          }
        }  
      });
    });