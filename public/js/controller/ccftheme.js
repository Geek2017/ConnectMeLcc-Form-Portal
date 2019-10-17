$(document).ready(function(){

 
  $('#container').css('visibility', 'hidden');
 

  $("#filename").change(function(){
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        // console.log(baseString); 
        localStorage.setItem('base64',baseString);
    };
    reader.readAsDataURL(file);
});

$("#logoimg").attr("src", localStorage.getItem('base64'));


if(localStorage.getItem('theme')==null){
  localStorage.setItem('theme','css/theme-default.css') 
}else{
  $("#theme").prop("href", localStorage.getItem('theme'));
  
}
   
setTimeout(function(){
  $('#container').css('visibility', 'visible');
},1000);



      $("#cpr").click(function(){
          console.log('click');
        setInterval(function(){
            localStorage.setItem('unicolor',$("#dcpr").val());}, 
             100);
      });

     
      
      
    $(".widget.widget-info").css("background", localStorage.getItem('unicolor'));
    $(".panel.panel-warning").css("border-top-color", localStorage.getItem('unicolor'));
    $(".x-navigation>li.xn-logo>a:first-child").css("background", localStorage.getItem('unicolor'));
    $(".panel.panel-success").css("border-top-color", localStorage.getItem('unicolor'));
    
    
    
     
    //theme color

    $("#default").click(function(){
     localStorage.setItem('theme','css/theme-default.css')
    });
    
    $("#brown").click(function(){
      localStorage.setItem('theme','css/theme-brown.css')
    });

    $("#blue").click(function(){
      localStorage.setItem('theme','css/theme-blue.css')
    });
    
    $("#white").click(function(){
      localStorage.setItem('theme','css/theme-white.css')
    });

    $("#black").click(function(){
      localStorage.setItem('theme','css/theme-black.css')
    });

    //form color
    $("#green").click(function(){
      localStorage.setItem('unicolor','green')
     });

     $("#bl").click(function(){
      localStorage.setItem('unicolor','blue')
      // alert('blue')
     });

     $("#grey").click(function(){
      localStorage.setItem('unicolor','grey')
     });

     $("#red").click(function(){
      localStorage.setItem('unicolor','red')
     });

     $("#orange").click(function(){
      localStorage.setItem('unicolor','orange')
     });
    
});