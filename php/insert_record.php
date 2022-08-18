<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Origin,Access-Control-Allow-Methods,Authorization,X-Requested-With");

require_once("db.php");

$data = json_decode(file_get_contents("php://input"),true);

$iname = $data["iname"];
$iage = $data["iage"];
$icity = $data["icity"];

$query = "INSERT INTO json_data(name,age,city) VALUES('{$iname}','{$iage}','{$icity}')";

if(mysqli_query($con,$query)){
  echo json_encode(array("msg" => "Data Inserted", "status" => true));
}
else{
  echo json_encode(array("msg" => "No Data Inserted", "status" => false));
}

?>