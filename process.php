<?php
date_default_timezone_set('Asia/Bangkok');

$servername = "127.0.0.1";
$username = "minnieball";
$password = "M1nnie<3bubbleball";
$dbname = "minnieballinlove";

if (isset($_POST['name1']) && isset($_POST['mobile1']) && isset($_POST['coming1']) && isset($_POST['room1']))
{
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $name = $_POST['name1'];
  $mobile = $_POST['mobile1'];
  $coming = $_POST['coming1'];
  $needroom = $_POST['room1'];

  $date = date('Y-m-d H:i:s');



  $sql = "INSERT INTO guest (name, mobile, coming, room, create_date)
  VALUES ("
  . "'" . $name . "',"
  . "'" . $mobile . "',"
  . "'" . $coming . "',"
  . "'" . $needroom. "',"
  . "'" . $date ."')";

  if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

?>
