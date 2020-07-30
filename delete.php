<?php
  $delheader = apache_request_headers();
  $delposts = file_get_contents('posts/posts.txt');
  $delposts = json_decode($delposts,true);

  unset($delposts[$delheader['KEY']]);
  $index=1;
  $newposts= array();
  foreach($delposts as $i =>$item){
    $new="".$index;
    $newposts[$new]=$delposts[$i];
    $index=$index+1;
  }

  $newposts = json_encode($newposts);
  $delfile = fopen("posts/posts.txt","w");
  fwrite($delfile,$newposts);
  fclose($delfile);

?>
