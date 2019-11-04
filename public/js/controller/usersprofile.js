$(document).ready(function () {
  
   
      firebase.auth().onAuthStateChanged(function(user) {
       
        $("#userimg").change(function(){
          console.log("A file has been selected.");
          var file = document.querySelector('input[type=file]')['files'][0];
          var reader = new FileReader();
          var baseString;
          reader.onloadend = function () {
            baseString = reader.result;
            console.log(baseString);
            localStorage.setItem('userimg',baseString)
          };
          reader.readAsDataURL(file);
        });


        //   console.log(user)
        var databaseRef = firebase.database().ref('users/');
        databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
           var childKey = childSnapshot.key;
           var childData = childSnapshot.val();
                
         
           if(user.providerData[0].email==childData.cusemail){
            console.log(childSnapshot.key);

            localStorage.setItem('childkey',childSnapshot.key)

            $('#usersname').val(childData.cusname);
            $('#usersmail').val(childData.cusemail);
            $('#userscontacts').val(childData.contact);
            $('#usersdesignation').val(childData.designation); 
           }
                
            });
          });
  
     
        

        $('#updateprofile').on('submit', function (e) {
            e.preventDefault();
    
            var uid = firebase.database().ref().child('users').push().key;
            var data = {
             cusname: $('#usersname').val(),
             cusemail:$('#usersmail').val(),
             contact:$('#userscontacts').val(),
             designation:$('#usersdesignation').val(),
             userimages:localStorage.getItem('userimg')
            }
            
            var updates = {};
            updates['/users/'+ localStorage.getItem('childkey') ] = data;
            firebase.database().ref().update(updates);
            
            alert('The user is updated successfully!');
            
         


        });
      });
    });