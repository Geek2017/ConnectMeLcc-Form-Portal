
$(document).ready(function () {
  
        
         
        var databaseRef = firebase.database().ref('com_profiles/');
        databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
                
            console.log(childData);
            
            $('#logoimg').attr('src',childData.comlogo);

            });
        });



        
        // $("#mrcadd").on("click", function(e) {
        //     e.preventDefault()
        //     var $tableBody = $('#mcrrowTable').find("tbody"),
        //         $trLast = $tableBody.find("tr:first"),
        //         $trNew = $trLast.clone();
            
        //     $trLast.after($trNew);
            
        //     });
        
        //     $('#mrcmin').on('click', function(e) {
        //     e.preventDefault()
        //     var $tableBody = $('#mcrrowTable').find("tbody"),
        //         $trLast = $tableBody.find("tr:first"),
        //         $trNew = $trLast.remove();
            
        //     $trLast.after($trNew);
            
        //     }); 

  
});