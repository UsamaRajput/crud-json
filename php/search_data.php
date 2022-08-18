<?php
header('Content-Type:applcation/json');
header('Access-Control-Allow-Origin:*');

require_once("db.php");
$search_term = isset($_GET['search']) ? $_GET['search'] : die();

$query = "SELECT * FROM json_data WHERE name LIKE '%{$search_term}%'";
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