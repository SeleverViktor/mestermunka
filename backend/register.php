<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "adatbazis_neve";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$name = $data['username'];
$birthDate = $data['birthDate'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password) VALUES ('$email', '$name', '$birthDate', 1, 1, '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Sikeres regisztráció!"]);
} else {
    echo json_encode(["message" => "Hiba: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>