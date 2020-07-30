<?php
 $headersinit=apache_request_headers();
 $postsinit=file_get_contents('posts/buttons.txt');
 $postsinit=json_decode($postsinit,true);

 if(array_key_exists($headersinit["KEY"],$postsinit)==true){
 $postsinit[$headersinit["KEY"]]["XIN"]=$headersinit['X'];
 $postsinit[$headersinit["KEY"]]["YIN"]=$headersinit['Y'];

 $postsinit = json_encode($postsinit);
 $fileinit= fopen("posts/buttons.txt", "w");
 fwrite($fileinit,$postsinit);
 fclose($fileinit);
 }
 ?>
