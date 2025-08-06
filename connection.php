<?php
$host = "localhost";
$dbUser = "root"; 
$dbPassword = "";
$dbName = "test";
$port = 5222;

$connection = mysqli_connect($host, $dbUser, $dbPassword, $dbName, $port);

if(mysqli_connect_error()){
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Conexión exitosa.<br>";
}

?>