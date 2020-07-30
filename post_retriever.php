<?php

$fileObj = file_get_contents('posts/posts.txt');
$fileObjchecked = json_decode($fileObj,true);

echo $fileObj;




 ?>
