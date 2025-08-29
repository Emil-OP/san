<?php 
header('Content-Type: application/json');
include 'connection.php';

$id=$_GET['id'];


$select_where = 'SELECT * FROM participante WHERE idParticipante=?';

$stmt = $connection ->prepare($select_where);
$stmt->bind_param("i",$id);
$stmt->execute();
$result = $stmt ->get_result();



if($result->num_rows >0){
    $clientInfo = $result ->fetch_assoc();
    echo json_encode($clientInfo);
}

$stmt->close();
$connection -> close();
?>