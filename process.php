<?php
$servername = "127.0.0.1";
$username = "minnieball";
$password = "M1nnie<3bubbleball";
$dbname = "minnieballinlove";

if (isset($_POST['name']) && isset($_POST['mobile']) && isset($_POST['coming']) && isset($_POST['room']))
{
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

  $date = date('Y-m-d H:i:s');



  $sql = "INSERT INTO guest (name, mobile, coming, room, create_date)
  VALUES ("$name", "$mobile", $coming, $needroom, $date)";

  if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

?>
