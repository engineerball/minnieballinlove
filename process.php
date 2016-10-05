<?php
date_default_timezone_set('Asia/Bangkok');

$servername = "127.0.0.1";
$username = "minnieball";
$password = "M1nnie<3bubbleball";
$dbname = "minnieballinlove";

if (isset($_POST['firstname1']) &&
    isset($_POST['mobile1']) &&
    isset($_POST['coming1']) &&
    isset($_POST['lastname1']) &&
    isset($_POST['room1']) &&
    isset($_POST['friend1'])
    )
{
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $firstname = $_POST['firstname1'];
  $lastname = $_POST['lastname1'];
  $mobile = $_POST['mobile1'];
  $email = $_POST['email1'];
  #$coming = $_POST['coming1'];
  $coming = '1';
  $needroom = $_POST['room1'];
  $friend = $_POST['friend1'];

  $date = date('Y-m-d H:i:s');



  $sql = "INSERT INTO guest (firstname, lastname, mobile, email,coming, room, friend,create_date)
  VALUES ("
  . "'" . $firstname . "',"
  . "'" . $lastname . "',"
  . "'" . $mobile . "',"
  . "'" . $email . "',"
  . "'" . $coming . "',"
  . "'" . $needroom. "',"
  . "'" . $friend. "',"
  . "'" . $date ."')";

  if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

?>
