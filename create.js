$(document).ready(function(){

  function add_user(username, screenname, password){

    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        console.log("sent");
      }
    }

    xhttp.open("POST", "create.php", true);
    xhttp.setRequestHeader("USERNAME",username);
    xhttp.setRequestHeader("SCREENNAME",screenname);
    xhttp.setRequestHeader("PASSWORD",password);
    xhttp.send();
  }



  $("#submit").mouseenter(function(){
    $("#submit").css("background-color","#000000");
    $("#submit").css("color","#ffffff");
  });

  $("#submit").mouseleave(function(){
    $("#submit").css("background-color","transparent");
    $("#submit").css("color","grey");
  });

  $("#submit").click(function(){
    add_user(document.getElementById("Username").value, document.getElementById("ScreenName").value,document.getElementById("Password").value);
  });

});
