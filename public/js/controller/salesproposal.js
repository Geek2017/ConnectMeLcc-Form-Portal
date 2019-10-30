$(document).ready(function () {

   
    firebase.auth().onAuthStateChanged(function(user) {
     
      //   console.log(user)
      var databaseRef = firebase.database().ref('com_profiles/');
      databaseRef.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
         var childKey = childSnapshot.key;
         var childData = childSnapshot.val();
              
            console.log(childData);
            
            $('#logoimg').attr('src',childData.comlogo);
 
          });
        });


        $(".mcrrowTable  .mcramount").on('change blur input', function () {
           console.log('123')
            var val = this.value;
            var sum = 0;
            $(this).closest('tr').find('td:eq(4)').text(function () {
                return (+$.trim($(this).siblings(':eq(3)').text()) * +val)
            });
            $('table  tr td:nth-of-type(5)').each(function () {
                sum += parseFloat($(this).text()) || 0;
            });
            $('.mrctotal').text(sum);
        });
      
        
        $("#mrcadd").on("click", function(e) {
            e.preventDefault()
            var $tableBody = $('#mcrrowTable').find("tbody"),
              $trLast = $tableBody.find("tr:first"),
              $trNew = $trLast.clone();
          
            $trLast.after($trNew);
           
          });
      
          $('#mrcmin').on('click', function(e) {
            e.preventDefault()
            var $tableBody = $('#mcrrowTable').find("tbody"),
              $trLast = $tableBody.find("tr:first"),
              $trNew = $trLast.remove();
          
            $trLast.after($trNew);
            
          }); 

          $("#nrcadd").on("click", function(e) {
            e.preventDefault()
            var $tableBody = $('#ncrrowTable').find("tbody"),
              $trLast = $tableBody.find("tr:first"),
              $trNew = $trLast.clone();
          
            $trLast.after($trNew);
           
          });
      
          $('#nrcmin').on('click', function(e) {
            e.preventDefault()
            var $tableBody = $('#ncrrowTable').find("tbody"),
              $trLast = $tableBody.find("tr:first"),
              $trNew = $trLast.remove();
          
            $trLast.after($trNew);
            
          }); 

          $("#fpfhadd").on("click", function(e) {
            e.preventDefault()
            var $tableBody = $('#fpfrowTable').find("tbody"),
              $trLast = $tableBody.find("tr:first"),
              $trNew = $trLast.clone();
          
            $trLast.after($trNew);
           
          });
      
          $('#fpfhmin').on('click', function(e) {
            e.preventDefault()
            var $tableBody = $('#fpfrowTable').find("tbody"),
              $trLast = $tableBody.find("tr:first"),
              $trNew = $trLast.remove();
          
            $trLast.after($trNew);
            
          }); 
    
    });
  });