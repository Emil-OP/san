<?php

var_dump($_SERVER['REQUEST_METHOD']);
print_r($_POST);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST received!";
    print_r($_POST);
} else {
    echo "Please submit a form with POST method";
}
?>