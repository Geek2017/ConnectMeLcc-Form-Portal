$(document).ready(function () {
      //initialize the firebase app
      var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
      };
      firebase.initializeApp(config);

      //create firebase references
      var Auth = firebase.auth();
      var dbRef = firebase.database();
      var usersRef = dbRef.ref('users')
      var auth = null;

       
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log(user)
     
        $("#uname").text(user.displayName);

      }
    });

    $("#comlogo").change(function(){
      console.log("A file has been selected.");
      var file = document.querySelector('input[type=file]')['files'][0];
      var reader = new FileReader();
      var baseString;
      reader.onloadend = function () {
        baseString = reader.result;
        console.log(baseString);
        localStorage.setItem('base64',baseString)
      };
      reader.readAsDataURL(file);
    });

      $('#wizard-validation').on('submit', function (e) {
        e.preventDefault();
      
        var data = {
          email: $('#cusemail').val(),
          cusname: $('#cusname').val(),
          cusid: $('#cusid').val(),
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
               save_cus_credencials();
               save_cus_com_info();
               save_cus_theme_info();

               var cusname = $('#cusname').val();
               var email=$('#cusemail').val();
               
               function sendEmailVerification(data) {
                cusname = firebase.auth().currentUser;
                email = data.email || user.email;
                var urlr = location.origin;

                return user.emailVerified || user.sendEmailVerification({
                  url: urlr,
                });
              }
              //save customer cred to firebase
              function save_cus_credencials(){
               
               
                var uid = firebase.database().ref().child('users').push().key;
                var cusid = $('#cusid').val();
                var cusname = $('#cusname').val();
                var cusemail =$('#cusemail').val();


                var data = {
                 user_id: uid,
                 cusid:cusid,
                 cusname:cusname,
                 cusemail:cusemail,
                 role:"admin",
                 designation:"Account Manager",

                }

                var updates = {};
                updates['/users/' + uid] = data;
                firebase.database().ref().update(updates);
   
              
              }

              //save customer com_info to firebase
              function save_cus_com_info(){
               
                var uid = firebase.database().ref().child('com_profiles').push().key;
                var cusid = $('#cusid').val();
                var comlogo = localStorage.getItem('base64');
                var comname = $('#comname').val();
                var comcontact =$('#comcontact').val();
                var comaddress =$('#comaddress').val();

                var data = {
                 user_id: uid,
                 cusid:cusid,
                 comlogo:comlogo,
                 comname:comname,
                 comcontact:comcontact,
                 comaddress:comaddress
                }

                var updates = {};
                updates['/com_profiles/' + uid] = data;
                firebase.database().ref().update(updates);
   
                
              }

              //save customer theme to firebase
              function save_cus_theme_info(){
               
                var uid = firebase.database().ref().child('theme_info').push().key;
                var cusid = $('#cusid').val();
                var theme = localStorage.getItem('theme');
                var formcolor = localStorage.getItem('unicolor');
                // var layout =$('#comcontact').val();
                // var options =$('#comaddress').val();

                var data = {
                 user_id: uid,
                 cusid:cusid,
                 theme:theme,
                 formcolor:formcolor
                //  layout:layout,
                //  options:options
                }

                var updates = {};
                updates['/theme_info/' + uid] = data;
                firebase.database().ref().update(updates);
   
                refresh();
              }

              function refresh(){
                setTimeout(function(){ alert("Data Successfully Sent"); 
                window.location.replace("./index.html");
              }, 3000);
              }
          
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


      $('#nexthwb').on('click', function(e) {
      var dbRef = firebase.database().ref().child('cus_data');
      dbRef.on('value', snapshot => {
       var data=snapshot.val();
       for (i=0;i<=data.length;i++){
        var dbRef0 = firebase.database().ref().child('cus_data/'+i+'/customerid');
        dbRef0.on('value', dataval => {

          if(dataval.val()==$('#cusid').val()){
            // console.log(dataval.val(),i);
            // alert('Customer Validated AutoFill will take place');
            var dbRef = firebase.database().ref().child('cus_data/'+i);
            dbRef.on('value', calling => {
              // console.log(calling.val());
              $('#comname').val(calling.val().company);
              $('#comcontact').val(calling.val().customerphone);
              $('#comaddress').val(calling.val().address1+' '+calling.val().state);

            });



          }
          
        });
       }
       
      })
    });

    });