<?php
include 'connection.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $numeroTelefono = $_POST['numeroTelefono'];
    $direccion = $_POST['direccion'];
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