<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:DELETE");
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Origin,Access-Control-Allow-Methods,Authorization,X-Requested-With");
require_once("db.php");
$data = json_decode(file_get_contents("php://input"),true);
$id = $data['id'];

$query = "DELETE FROM json_data WHERE id = {$id}";

if(mysqli_query($con,$query)){
 echo json_encode(array("msg" => "Data Is Deleted", "status" => true));
}
else{
 echo json_encode(array("msg" => "Data Deleted Failed", "status" => false));
}




?>