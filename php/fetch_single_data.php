<?php
require_once("db.php");

header("Content-Type:application/json");
header("Access-Control-Allow-Origin:*");

$s_id = json_decode(file_get_contents("php://input"),true);

if(isset($s_id['id'])){
    $id = $s_id['id'];

    $query = "SELECT * FROM json_data WHERE id = $id";
    $run = mysqli_query($con,$query);
    if(mysqli_num_rows($run)>0){
    $data = mysqli_fetch_all($run,MYSQLI_ASSOC);
    echo json_encode($data);
    }
    else{
        echo json_encode(array("msg" => "No Data Found"));
    }
}

?>