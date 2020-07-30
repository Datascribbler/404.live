<?php

$recieved = apache_request_headers();


$fileObj = file_get_contents('posts/posts.txt');
$count = count(json_decode($fileObj,true))+1;

$newPost = '';
$newPost .= ','."\n".'"'.$count.'":{'."\n\t".'"IMG":"'.$recieved['IMG'].'",'."\n\t".'"URL":"'.$recieved['URL'].'",'."\n\t".'"NAME":"'.$recieved['NAME'].'",'."\n\t".'"SUBJECT":"'.$recieved['SUBJECT'].'",'."\n\t".'"CONTENT":'.'"'.$recieved['CONTENT'].'",'."\n\t".'"X":"'.'0'.'",'."\n\t".'"Y":"'.'0'.'"'."\n\t}}";


$updatedLog = substr_replace($fileObj,"",-1);
$updatedLog .= $newPost;

echo $updatedLog;
$log = fopen("posts/posts.txt","w");
fwrite($log, $updatedLog);
fclose($log);
 ?>
