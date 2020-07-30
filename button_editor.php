<?php
$bttnheaders=apache_request_headers();
$bttnposts = file_get_contents('posts/buttons.txt');
$bttnposts = json_decode($bttnposts,true);

if(array_key_exists($bttnheaders["KEY"],$bttnposts)==true){
$bttnposts[$bttnheaders["KEY"]]["X"]=$bttnheaders['X'];
$bttnposts[$bttnheaders["KEY"]]["Y"]=$bttnheaders['Y'];



$bttnposts = json_encode($bttnposts);
echo $bttnposts;
$bttnfile = fopen("posts/buttons.txt", "w");
fwrite($bttnfile,$bttnposts);
fclose($bttnfile);
}




?>
