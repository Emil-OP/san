<?php

header('Content-Type: application/json');
include 'connection.php';

$response = ['success' => false, 'data' => []];

$sqlSel = "SELECT * FROM participante";
$result = $connection ->query($sqlSel);


while($row = $result->fetch_assoc()){
    $response['data'][] = array_map('utf8_encode', $row);
}
    $response['success'] = true;
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

$connection->close();
?>