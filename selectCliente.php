<?php
include 'connection.php';
$sqlSel = "SELECT * cliente";
$result = $connection ->query($sqlSel);

$clientes = [];

while($row = $result->fetch_assoc()){
    $clientes = $row
}
?>