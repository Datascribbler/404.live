<?php
$headers = apache_request_headers();

$credTable = file_get_contents('people/login.txt');
$credTable = json_decode($credTable, true);

$response = new stdClass;
$response->permission = false;


if ($credTable[$headers['NAME']]['PASSWORD'] == $headers['PASSWORD'])
{
  $response->permission = true;
  $response->screenname = $credTable[$headers['NAME']]['SCREENNAME'];
  $response->profile = $credTable[$headers['NAME']]['PROFILE'];
  $response->posts = file_get_contents('posts/posts.txt');
  echo json_encode($response);
}
else
{
  echo json_encode($response);
}


 ?>
