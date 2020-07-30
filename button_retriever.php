<?php


$fileObjbttn = file_get_contents('posts/buttons.txt');
$fileObjcheckedbttn = json_decode($fileObjbttn,true);

echo $fileObjbttn;






 ?>
