<?php
header('Content-Type: text/plain'); // Temporalmente cambiar a texto
include 'connection.php';

// Verificar conexión
if ($connection->connect_error) {
    die("Conexión fallida: " . $connection->connect_error);
}

echo "Conexión exitosa.\n";

$sql = "SELECT * FROM participante LIMIT 1";
$result = $connection->query($sql);

if (!$result) {
    die("Error en consulta: " . $connection->error);
}

echo "=== DATOS CRUDOS ===\n";

if ($row = $result->fetch_assoc()) {
    echo "Primera fila:\n";
    print_r($row);
    
    // Mostrar el primer carácter del primer campo
    if (!empty($row)) {
        $firstField = reset($row); // Obtiene el primer valor del array
        echo "Primer carácter del primer campo: '" . substr($firstField, 0, 1) . "'\n";
    }
} else {
    echo "No se encontraron registros\n";
}

$connection->close();
?>