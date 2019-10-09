$(document).ready(function(){
    
    var wblue=localStorage.getItem('wblue');
    var wpblue=localStorage.getItem('wpblue');
    var xnavblue=localStorage.getItem('xnavblue');
    var pps2xnavblue=localStorage.getItem('pps2xnavblue');

    $(".widget.widget-info").addClass(wblue);
    $(".panel.panel-warning").addClass(wpblue);
    $(".x-navigation > li.xn-logo > a:first-child").addClass(xnavblue);
    $(".panel.panel-success").addClass(pps2xnavblue);
    

    $("#blue").click(function(){
    
  
        var wblue=localStorage.setItem('wblue','wblue');
        var wpblue=localStorage.setItem('wpblue','wpblue');
        var xnavblue=localStorage.setItem('xnavblue','xnavblue');
        var pps2xnavblue=localStorage.setItem('pps2xnavblue','pps2xnavblue');
    
        $(".widget.widget-info").addClass(wblue);
        $(".panel.panel-warning").addClass(wpblue);
        $(".x-navigation > li.xn-logo > a:first-child").addClass(xnavblue);
        $(".panel.panel-success").addClass(pps2xnavblue);
    });
 
});