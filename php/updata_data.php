<?php
header("Content-Type:appplication/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:PUT");
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Content-Type");

require_once("db.php");

$data = json_decode(file_get_contents("php://input"),true);

$u_id = $data['id'];
$u_name = $data['uname'];
$u_age = $data['uage'];
$u_city = $data['ucity'];

$query = "UPDATE json_data SET name = '{$u_name}', age = '{$u_age}', city = '{$u_city}' WHERE id = '{$u_id}'";

if(mysqli_query($con,$query)){
  $msg = array("msg" => "Data is Updated", "status" => true);
  echo json_encode($msg);
}
else{
  $msg = array("msg" => "Data Updated Failed", "status" => false);
  echo json_encode($msg);
}






?>