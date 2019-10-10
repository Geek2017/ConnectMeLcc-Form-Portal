$(document).ready(function(){




  $("#theme").attr("href", localStorage.getItem('theme'))


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

     $("#blue").click(function(){
      localStorage.setItem('unicolor','blue')
     });

     $("#grey").click(function(){
      localStorage.setItem('unicolor','grey')
     });

     $("#red").click(function(){
      localStorage.setItem('unicolor','red')
     });

     $("#blue").click(function(){
      localStorage.setItem('unicolor','blue')
     });

     $("#orange").click(function(){
      localStorage.setItem('unicolor','orange')
     });
});