<?php
header('Content-Type: text/html; charset=utf-8');
$host = "localhost";
$dbUser = "root"; 
$dbPassword = "";
$dbName = "sandb";
$port = 5222;

$connection = mysqli_connect($host, $dbUser, $dbPassword, $dbName, $port);
mysqli_set_charset($connection, "utf8mb4");
?>