$(document).ready(function () {

    var replaceEmoticons = function (input) {
        input.val(
            input
                .val()
                .replace(':)', '<img src="assets/images/users/user2.jpg" alt=":)" title=":)" width="16" height="16" />')
                
        );
    };
    
    
    $(function () {
        var chat = $('#chat'),
            result = $('#result');
        
        chat.on('keypress', function (e) {
            // ENTER
            if (e.keyCode == 13) {
                replaceEmoticons(chat);
                
               
                var dt = new Date();
                var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var uid = firebase.database().ref().child('messenger/').push().key;
                
                var d = new Date();
                var month = d.getMonth()+1;
                var day = d.getDate();
                var date = d.getFullYear() + '/' +
                (month<10 ? '0' : '') + month + '/' +
                (day<10 ? '0' : '') + day;
        
        
                var data = {
                 user_id: uid,
                 cusid:"",
                 name:"Jane Doe",
                 time:time,
                 date:date,
                 msg:chat.val(), 
                 attachement:""
                }
             
                
                
                var updates = {};
                updates['/messenger/' + uid] = data;
                firebase.database().ref().update(updates);

                result.append('<div class="item in item-visible"><div class="image"><img src="assets/images/users/user2.jpg" alt="John Doe"></div><div class="text" ><div class="heading"><a href="#">John Doe</a><span class="date">09:22</span></div>'+ chat.val() + '</div></div><br />');
                chat.val('');
            }
            
            

        });

   




    });
    

    
                            

});




   


    
        
        
    
   
