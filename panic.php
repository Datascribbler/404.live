<?php

$backup = file_get_contents('posts/backup.txt');

$paniclog = fopen("posts/posts.txt","w");
fwrite($paniclog,$backup);
fclose($paniclog);

?>
