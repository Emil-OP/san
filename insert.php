<?php
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$numeroTelefono = $_POST['numeroTelefono'];
$direccion = $_POST['direccion'];

$host = "localhost";
$dbUser = "root"; 
$dbPassword = "root";
$dbName = "test";

$connection = mysqli_connect($host, $dbUser, $dbPassword, $dbName);

if(mysqli_connect_error()){
    die("Connection failed: " . mysqli_connect_error());
} else {
    $select = "SELECT telefono FROM cliente WHERE telefono = ? LIMIT 1";
    $stmt = $connection ->prepare($select);
    $stmt->bind_param("s", $numeroTelefono);
    $stmt->execute();
    $stmt->store_result();
    $rnum = $stmt->num_rows;

    if($rnum==0){
        $stmt->close();
        $query = "INSERT INTO cliente (nombre, apellido, telefono, direccion) VALUES (?, ?, ?, ?)";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("ssss", $nombre, $apellido, $numeroTelefono, $direccion);
        $stmt->execute();
        echo "Registro exitoso.";
    } else {
        echo "El numero de telefono ya existe.";
    }    
    $stmt->close();
    $connection->close();
}
?>