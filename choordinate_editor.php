<?php
$headers=apache_request_headers();
$posts = file_get_contents('posts/posts.txt');
$posts = json_decode($posts,true);

if(array_key_exists($headers["KEY"],$posts)==true){
$posts[$headers["KEY"]]["X"]=$headers['X'];
$posts[$headers["KEY"]]["Y"]=$headers['Y'];



$posts = json_encode($posts);
echo $posts;
$file = fopen("posts/posts.txt", "w");
fwrite($file,$posts);
fclose($file);
}
?>
