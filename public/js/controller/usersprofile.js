$(document).ready(function () {

   
      firebase.auth().onAuthStateChanged(function(user) {
       
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
             designation:$('#usersdesignation').val()
            }
            
            var updates = {};
            updates['/users/'+ localStorage.getItem('childkey') ] = data;
            firebase.database().ref().update(updates);
            
            alert('The user is updated successfully!');
            
         


        });
      });
    });