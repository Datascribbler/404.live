<?php
  $headers=apache_request_headers();
  $posts = file_get_contents('posts/posts.txt');
  $posts = json_decode($posts,true);
  $posts[$headers["KEY"]]["SUBJECT"]=$headers['SUBJECT'];
  $posts[$headers["KEY"]]["CONTENT"]=$headers['CONTENT'];

if($posts["1"]["URL"]==true){
  $posts = json_encode($posts);
  echo $posts;
  $file = fopen("posts/posts.txt", "w");
  fwrite($file,$posts);
  fclose($file);
}
 ?>
