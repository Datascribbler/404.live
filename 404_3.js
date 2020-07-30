$(document).ready(function(){
  var identity="";
  var posts=[];
  var i=0;
  var flicker;
  var secondflicker;
  var keytosend;
  function setup(){
    $("#post_button").hide();
    $("#delete_button").hide();
    $("#submit").hide();
    $("#posts").hide();
    $("#post_form").hide();
    $("#profile_pic").hide();
    $("#edit_form").hide();
    $("#photo_forum").hide();
    $("#banner").hide();
    $("#post_buttonshadow").hide();
    $("#upload_button").hide();
    $("#upload_buttonshadow").hide();

    $("#post_button").mouseenter(function(){
      $("#post_button").css("background-color","#ffff00");
    });
    $("#post_button").mouseleave(function(){
      $("#post_button").css("background-color","#ffffff");
    });
    $("#upload_button").mouseenter(function(){
      $("#upload_button").css("background-color","#ffff00");
    });
    $("#upload_button").mouseleave(function(){
      $("#upload_button").css("background-color","#ffffff");
    });
  }
  function greet(){
    $("#post_button").show();
    $("#post_buttonshadow").show();
    $("#upload_button").show();
    $("#upload_buttonshadow").show();
    $("#posts").show();
    $("#profile_pic").show();
    $("#title2").hide();
    $("#password").hide();
    $("#submit").hide();
    $("#banner").show();

    var refresher = setInterval(function(){
      refresh_post();
      refresh_buttons();
    },60);



    clickanddrag("#profile_pic","fixed",function(){console.log("h")});

    clickanddrag("#post_button","fixed",function(){
      $("#post_form").fadeIn(1000);
    });

    clickanddrag("#upload_button","fixed",function(){
      $("#photo_forum").fadeIn(1000);
    });

    clickanddrag("#logout","fixed",function(){
        logout();
        document.getElementById("title2").value="";
        document.getElementById("password").value="";
      });
    clickanddrag("#profile","fixex",function(){});
    clickanddrag("#upload_buttonshadow","fixed",function(){});
    clickanddrag("#post_buttonshadow","fixed",function(){});

    var tiles=["titles/00.png", "tiles/01.png", "tiles/02.png", "tiles/03.png", "tiles/04.png", "tiles/05.png"];
    var greet_counter=0;

    /*var greet_ticker=setInterval(function(){
      greet_counter++;
      $("#tiles").css("background-image","url("+tiles[greet_counter]+")");
      console.log(tiles[greet_counter]);
      if(greet_counter>=tiles.length-1){
        clearInterval(greet_ticker);
      }
    },200);*/
    $("body").css("background-image","url('stripes_tile_3.png')")
  }
  function logout(){
    $("#post_button").hide();
    $("#delete_button").hide();
    $("#posts").hide();
    $("#profile_pic").hide();
    $("#title2").show();
    $("#password").show();
    $("#submit").hide();
    $("#banner").hide();
    $("#post_form").hide();
    $("#photo_forum").hide();
    $("#post_buttonshadow").hide();
    $("#upload_button").hide();
    $("#upload_buttonshadow").hide();
    $("body").css("background-image","none");
    stopflick();
  }

  function flickon(){
    $("body").css("background-color","blue");
  }
  function flickoff(){
    $("body").css("background-color","#eeeeee");
  }
  function flick(){
    flickon();
    setTimeout(flickoff,20);
  }
  function startflick(){
    flicker=setInterval(function(){flick()},2000);
    secondflicker=setInterval(function(){flick()},2600);
  }
  function stopflick(){
    clearInterval(flicker);
    clearInterval(secondflicker);
  }

  function clickanddrag(selector,position,callback){
    start=true;
    $(selector).mousedown(function(x){
        var offsetY=getOffsetTop(this)-x.clientY;
        var offsetX=getOffsetLeft(this)-x.clientX;
        var ref=this;
        var initX=getOffsetLeft(ref);
        var initY=getOffsetTop(ref);
        keytosend_button=this.dataset.key;
        if(start===true){
        make_initRequest(keytosend_button,initX,initY);
        start=false;
        }


        function drag(y){
          ref.style.left=y.clientX+offsetX+"px";
          ref.style.top=y.clientY+offsetY+"px";
          make_buttonChoordinateRequest(keytosend_button,y.clientX+offsetX,y.clientY+offsetY);
        }

        ref.style.position=position;
        ref.style.left=x.clientX+offsetX+"px";
        ref.style.top=x.clientY+offsetY+"px";

      document.addEventListener('mousemove',drag);

    $(document).mouseup(function(){

      document.removeEventListener('mousemove',drag);
    });

    function trigger(){
            var newX=getOffsetLeft(ref);
            var newY=getOffsetTop(ref);
            start=true;
            if(Math.abs(initX-newX)<=5 && Math.abs(initY-newY)<=5){
            callback();
            document.removeEventListener('mouseup',trigger);
          }
        }

    document.addEventListener('mouseup',trigger);


    });
  }
  function clickanddragPost(selector,position,callback){
    $(selector).mousedown(function(x){
        var offsetY=getOffsetTop(this)-x.clientY;
        var offsetX=getOffsetLeft(this)-x.clientX;
        var ref=this;
        var initX=getOffsetLeft(ref);
        var initY=getOffsetTop(ref);
        keytosend=this.dataset.key;



        function drag(y){
          ref.style.left=y.clientX+offsetX+"px";
          ref.style.top=y.clientY+offsetY+"px";
          make_choordeditRequest(keytosend,y.clientX+offsetX,y.clientY+offsetY);
        }

        ref.style.position=position;
        ref.style.left=x.clientX+offsetX+"px";
        ref.style.top=x.clientY+offsetY+"px";

      document.addEventListener('mousemove',drag);

    $(document).mouseup(function(){

      document.removeEventListener('mousemove',drag);

    });

    function trigger(){
            var newX=getOffsetLeft(ref);
            var newY=getOffsetTop(ref);


            callback();
            document.removeEventListener('mouseup',trigger);

        }

    document.addEventListener('mouseup',trigger);


    });
  }

  function submit_credentials(username,password){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200) {

          var response=JSON.parse(this.responseText);

          if(response.permission == 1){

            greet();
            render_posts(response.posts);
            identity=response.screenname;
            if(identity=="admin"){
              $("#delete_button").show();
              $("#delete_button").click(function(){
                make_panicRequest();
              });

            }
            profurl=response.profile;
            $("#profile_pic").css("background-image","url("+profurl+")");
            document.getElementById("profile").innerHTML="&ltWelcome "+identity+"!&gt"+"<div class='rule'></div>"
          }
          else{

          }
        }
      };
      xhttp.open("POST", "404.php", true);
      xhttp.setRequestHeader("NAME",username);
      xhttp.setRequestHeader("PASSWORD",password);
      xhttp.send();
  }

  function make_post(img,url,name,subject,content){

    var postxhttp = new XMLHttpRequest();
    postxhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        render_posts(this.responseText);
      }
    }


    postxhttp.open("POST", "post_logger.php", true);
    postxhttp.setRequestHeader("IMG",img);
    postxhttp.setRequestHeader("URL",url);
    postxhttp.setRequestHeader("NAME",name);
    postxhttp.setRequestHeader("SUBJECT",subject);
    postxhttp.setRequestHeader("CONTENT",content);
    postxhttp.send();
  }

  function refresh_post(){
    var refresh = new XMLHttpRequest();
    refresh.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        render_posts(this.responseText);
      }
    }

    refresh.open("GET", "post_retriever.php", true);
    refresh.send();
  }

  function refresh_buttons(){
    var refresh_bttns = new XMLHttpRequest();
    refresh_bttns.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        render_buttons(this.responseText);
      }
    }

    refresh_bttns.open("GET", "button_retriever.php", true);
    refresh_bttns.send();
  }

  function make_editRequest(key,subject,content){
    var editxhttp = new XMLHttpRequest();
    editxhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        render_posts(this.responseText);
      }
    }

    editxhttp.open("POST", "post_editor.php" ,true);
    editxhttp.setRequestHeader("KEY",key);
    editxhttp.setRequestHeader("SUBJECT",subject);
    editxhttp.setRequestHeader("CONTENT",content);
    editxhttp.send();
  }

  function make_panicRequest(){
    var panicxhttp = new XMLHttpRequest();

    panicxhttp.open("POST", "panic.php",true);
    panicxhttp.send();
  }

  function make_deleteRequest(key){
    var deletexhttp = new XMLHttpRequest();
    deletexhttp.onreadystatechange = function(){
      if(this.readyState==4 && this.status==200){

      }
    }
    deletexhttp.open("POST", "delete.php",true);
    deletexhttp.setRequestHeader("KEY",key);
    deletexhttp.send();
  }

  function make_choordeditRequest(key,x,y){
    var editchoordxhttp = new XMLHttpRequest();


    editchoordxhttp.open("POST", "choordinate_editor.php" ,true);
    editchoordxhttp.setRequestHeader("KEY",key);
    editchoordxhttp.setRequestHeader("X",x);
    editchoordxhttp.setRequestHeader("Y",y);
    editchoordxhttp.send();
  }

  function make_initRequest(key,x,y){
    var initxhttp = new XMLHttpRequest();

    initxhttp.open("POST", "init_setter.php", true);
    initxhttp.setRequestHeader("KEY",key);
    initxhttp.setRequestHeader("X",x);
    initxhttp.setRequestHeader("Y",y);
    initxhttp.send();
  }

  function make_buttonChoordinateRequest(key,x,y){
    var btchrdxhttp = new XMLHttpRequest();

    btchrdxhttp.open("POST", "button_editor.php");
    btchrdxhttp.setRequestHeader("KEY",key);
    btchrdxhttp.setRequestHeader("X",x);
    btchrdxhttp.setRequestHeader("Y",y);
    btchrdxhttp.send();
  }

  function getOffsetTop( elem ){
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetTop );
    return offsetTop;
    }

  function getOffsetLeft( elem ){
    var offsetLeft = 0;
    do {
        if ( !isNaN( elem.offsetLeft ) )
        {
            offsetLeft += elem.offsetLeft;
        }
      } while( elem = elem.offsetLeft );
      return offsetLeft;
      }

  function create_block(name,subject,content,number,key,x,y){
    var block = document.createElement('div');

    var name_txt = document.createTextNode(name);
    if(subject===""){
      var sub_txt = document.createTextNode('No Subject');
    }
    else{
      var sub_txt = document.createTextNode(subject);
    }
    var cont_txt = document.createTextNode(content);

    var name_highlight= document.createElement('mark');
    var sub_highlight=document.createElement('mark');
    var cont_highlight=document.createElement('mark');

    var name_head= document.createElement('p');
    var sub_head= document.createElement('p');
    var cont_head= document.createElement('p');

    name_head.className="name_head";
    name_highlight.className="highlight";
    name_highlight.appendChild(name_txt);
    name_head.appendChild(name_highlight);

    sub_head.className="sub_head";
    sub_highlight.appendChild(sub_txt);
    sub_highlight.className="highlight";
    sub_head.appendChild(sub_highlight);

    cont_head.className="cont_head";
    cont_highlight.className="highlight";
    cont_highlight.appendChild(cont_txt);
    cont_head.appendChild(cont_highlight);


    if(x==0){
    block.style.position = "relative";
    }
    else{
    block.style.position = "absolute";
    }
    block.style.top=y+"px";
    block.style.left=x+"px";


    block.id="post"+number;
    block.className="post";
    block.setAttribute('data-key',key);

    block.appendChild(name_head);
    block.appendChild(sub_head);
    block.appendChild(cont_head);
    document.getElementById("posts").appendChild(block);
  }

  function create_imgblock(name,number,key,url,x,y){
    var block = document.createElement('div');


    var name_txt = document.createTextNode(name);

    var frame = document.createElement('div');
    var name_head = document.createElement('mark');


    name_head.className="name_head";
    name_head.appendChild(name_txt);

    frame.style.position = "relative";
    frame.style.height = "100%";
    frame.style.width = "100%";
    frame.style.backgroundColor = "transparent";
    frame.style.backgroundImage = "url("+url+")";
    frame.style.backgroundSize = '100%';
    frame.style.backgroundRepeat = 'no-repeat';
    frame.style.backgroundPosition = 'center 20%';
    frame.style.top = "0px";
    frame.style.left= "0px";
    block.style.width = "420px";
    block.style.height = "600px";
    if(x==0){
    block.style.position = "relative";
    }
    else{
    block.style.position = "absolute";
    }
    block.style.left=x+"px";
    block.style.top=y+"px";
    block.style.backgroundColor = "transparent";
    block.style.zIndex = "4";
    block.style.wordWrap="break-word";



    block.id="post"+number;
    block.className="imgpost";
    block.setAttribute('data-key',key);
    block.appendChild(name_head);
    block.appendChild(frame);

    document.getElementById("posts").appendChild(block);
   }

  function render_buttons(bttnjson){
    var targetframe = document.getElementById("buttons");

    while(targetframe.firstChild){
      targetframe.removeChild(targetframe.firstChild);
    }

    bttnjson = JSON.parse(bttnjson);

    document.getElementById('post_button').style.left=bttnjson['post_button']['X']+"px";
    document.getElementById('post_button').style.top=bttnjson['post_button']['Y']+"px";

    document.getElementById('post_buttonshadow').style.left=bttnjson['post_buttonshadow']['X']+"px";
    document.getElementById('post_buttonshadow').style.top=bttnjson['post_buttonshadow']['Y']+"px";

    document.getElementById('upload_button').style.left=bttnjson['upload_button']['X']+"px";
    document.getElementById('upload_button').style.top=bttnjson['upload_button']['Y']+"px";

    document.getElementById('upload_buttonshadow').style.left=bttnjson['upload_buttonshadow']['X']+"px";
    document.getElementById('upload_buttonshadow').style.top=bttnjson['upload_buttonshadow']['Y']+"px";

    document.getElementById('logout').style.left=bttnjson['logout']['X']+"px";
    document.getElementById('logout').style.top=bttnjson['logout']['Y']+"px";

    document.getElementById('profile').style.left=bttnjson['profile']['X']+"px";
    document.getElementById('profile').style.top=bttnjson['profile']['Y']+"px";

  }

  function render_posts(json){
    var targetnode = document.getElementById("posts");

    while(targetnode.firstChild){
      targetnode.removeChild(targetnode.firstChild);
    }

    json=JSON.parse(json);
    for(var key in json){
      var length=Object.keys(json).length;


      if(json[length+1-key]['IMG']=='false'){
        create_block(json[length+1-key]['NAME'], json[length+1-key]['SUBJECT'], json[length+1-key]['CONTENT'],length+1-key,Object.keys(json)[length+1-key-1],json[length+1-key]['X'],json[length+1-key]['Y']);
      }
      else{
        create_imgblock(json[length+1-key]['NAME'], length+1-key, Object.keys(json)[length+1-key-1], json[length+1-key]['URL'], json[length+1-key]['X'], json[length+1-key]['Y']);
      }

    }

    if(identity!="admin"){
    clickanddragPost(".post","absolute",function(){});
    clickanddragPost(".imgpost","absolute",function(){});
  }
    else{
            clickanddragPost(".imgpost","absolute",function(){make_deleteRequest(keytosend)});
      clickanddragPost(".post","absolute",function(){make_deleteRequest(keytosend)});

    }
  }


  setup();

  $("#submit").mouseenter(function(){
    $("#submit").css("background-color","#fbfbfb");
    $("#submit").css("color","#eeeeee");
  });
  $("#submit").mouseleave(function(){
    $("#submit").css("background-color","#eeeeee");
    $("#submit").css("color","#ffffff");
  });

  $("#logout").mouseenter(function(){
    $("#logout").css("background-color","#ffff00");
    $("#logout").css("color","#000000");
  });

  $("#logout").mouseleave(function(){
    $("#logout").css("background-color","#000000");
    $("#logout").css("color","#ffffff");
  });

  $("#submit").click(function(){
    submit_credentials(document.getElementById("title2").value, document.getElementById("password").value);
  });



  $("#postsubmit").click(function(){

    make_post(false,null,identity,document.getElementById("postsub").value, document.getElementById('posttxt').value);


    $("#post_form").hide();
  });
  $("#x").click(function(){
    $("#post_form").fadeOut(1000);
  });
  $("#editx").click(function(){
    $("#edit_form").hide();
  });
  $("#photox").click(function(){
    $("#photo_forum").fadeOut(1000);
  });
  $("#urlSubmit").click(function(){
    make_post(true,document.getElementById("urlInput").value,identity,null,null);
  });
  $("#editsubmit").click(function(){
    make_editRequest(document.getElementById('edit_form').dataset.key,document.getElementById('editsub').value,document.getElementById('edittxt').value);
    $("#edit_form").hide();
  });










});
