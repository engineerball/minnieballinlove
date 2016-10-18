<?php
date_default_timezone_set('Asia/Bangkok');

$servername = "127.0.0.1";
$username = "minnieball";
$password = "M1nnie<3bubbleball";
$dbname = "minnieballinlove";

if (isset($_POST['name1']) &&
    isset($_POST['mobile1']) &&
    isset($_POST['coming1']) &&
    isset($_POST['email1'])
    )
{
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $name = $_POST['name1'];
  $follower = $_POST['follower1'];
  $mobile = $_POST['mobile1'];
  $email = html_entity_decode($_POST['email1']);
  #$coming = $_POST['coming1'];
  $coming = $_POST['coming1'];
  $room = $_POST['room1'];
  $room_input = $_POST['room_input1'];
  $join_event = $_POST['join_event1'];
  $wish = $_POST['wish'];

  switch ($room) {
    case '0':
      $room = "No";
      break;
    case '1':
        $room = "Single";
        break;
    case '2':
        $room = "Double";
        break;
    default:
      $room = "No";
      break;
  }

  switch ($join_event) {
    case '0':
      $join_event = "Both";
      break;
    case '1':
      $join_event = "Morning";
      break;
    case '2':
      $join_event = "Party";
      break;
    default:
      $join_event = "Both";
      break;
  }

  $date = date('Y-m-d H:i:s');

  $sql = "INSERT INTO guest (name, follower, mobile, email,coming, room, room_input,join_event,wish,create_date)
  VALUES ("
  . "'" . $name . "',"
  . "'" . $follower . "',"
  . "'" . $mobile . "',"
  . "'" . $email . "',"
  . "'" . $coming . "',"
  . "'" . $room. "',"
  . "'" . $room_input. "',"
  . "'" . $join_event. "',"
  . "'" . $wish. "',"
  . "'" . $date ."')";

  if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

?>
