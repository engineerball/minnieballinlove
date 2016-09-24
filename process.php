<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "minnieballinlove";



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$mobile = $_POST['mobile'];
$coming = $_POST['coming'];
$needroom = $_POST['room'];

$sql = "INSERT INTO MyGuests (name, mobile, coming, room)
VALUES ($name, $mobile, $coming, $needroom)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
