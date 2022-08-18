<?php
require_once("db.php");
header('Content-Type:applcation/json');
header('Access-Control-Allow-Origin:*');

$query = "SELECT * FROM json_data";
$run = mysqli_query($con,$query) or die("Query Failed");
if(mysqli_num_rows($run)>0){
    $data = mysqli_fetch_all($run,MYSQLI_ASSOC);
    echo json_encode($data);
}
else{
    $msg = array("msg" => "No Record Found","status"=>false);
    echo json_encode($msg);
}



?>