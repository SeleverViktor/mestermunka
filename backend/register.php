<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "partyez"; // Cserélje le a tényleges adatbázis nevére

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$name = $data['username'];
$birthDate = $data['birthDate'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssiss", $email, $name, $birthDate, $isAdult, $consent, $password);
$isAdult = 1; // vagy számolja ki a kor alapján
$consent = 1; // vagy vegye az értéket a bemeneti adatokból

if ($stmt->execute()) {
    echo json_encode(["message" => "Sikeres regisztráció!"]);
} else {
    echo json_encode(["message" => "Hiba: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>