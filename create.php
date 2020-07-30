<?php

$recieved = apache_request_headers();

$usrnm = $recieved['USERNAME'];


$usersegment='';
$usersegment.='"'.$recieved['USERNAME'].'"'.':{'."\n\t".'"PASSWORD":'.'"'.$recieved['PASSWORD'].'"'.','."\n\t".'"PROFILE":'.'"people/pics/default.png",'."\n\t".'"SCREENNAME":'.'"'.$recieved['SCREENNAME'].'"'."\n".'}';

$originallog = file_get_contents('people/login.txt');
echo $originallog;

$newlog = substr_replace($originallog,"",-1);
$newlog.=",\n".$usersegment."}";

$log = fopen("people/login.txt", "w");
fwrite($log, $newlog);
fclose($log);





 ?>
