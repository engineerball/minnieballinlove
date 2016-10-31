<?php
require 'vendor/autoload.php';
use Mailgun\Mailgun;
//Your credentials
$mg = new Mailgun("key-6433c5fa21dd3f598aae6ea9d74dbdf7");
$domain = "mg.minnieballinlove.com";


date_default_timezone_set('Asia/Bangkok');

define('LINE_API',"https://notify-api.line.me/api/notify");
define('LINE_TOKEN','aLKeS5gh3wzKUxsOvokATtxy1Ajnl8aZzTiZ5SY1hfc');


Resque::setBackend('localhost:6379');



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
  $wish = $_POST['wish1'];

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
      if ($coming == 'yes') {
        $html  = file_get_contents('mail/index.html'); // this will retrieve the html document

        switch ($room) {
          case 'No':
            $room = "ไม่ต้องการ";
            break;
          case 'Single':
              $room = "เตียงเดี่ยว";
              break;
          case 'Double':
              $room = "เตียงคู่";
              break;
          default:
            $room = "No";
            break;
        }

        switch ($join_event) {
          case 'Both':
            $join_event = "ทั้งเช้าและเย็น";
            break;
          case 'Morning':
            $join_event = "พิธีตอนเช้า";
            break;
          case 'Party':
            $join_event = "งานเลี้ยงตอนเย็น";
            break;
          default:
            $join_event = "ทั้งเช้าและเย็น";
            break;
        }

        if ($room_input == 'null'){
          $room_input = 'ไม่ต้องการ';
        }
        $html = str_replace('$NAME',$name,$html);
        $html = str_replace('$ROOM',$room,$html);
        $html = str_replace('$EVENT',$join_event,$html);
        $html = str_replace('$RDATE',$room_input,$html);

        $mail_data = array(
                  'from'=>'MinnieBallinLove <wedding@minnieballinlove.com>',
                  'to'=> $email,
                  'subject' => '[minnieballinlove] Thank you for your response.',
                  'html' => $html
        );
        $line_message = $name . " บอกว่าจะไปร่วมงาน" . $join_event . " ส่วนห้องพักนั้น " . $room;


        //Customise the email - self explanatory
        // $mg->sendMessage($domain, $mail_data);
        //
        // $res = notify_message($line_message);
    }
    else {
      $line_message = $name . " บอกว่าไม่ได้ไปร่วมงาน";

      $html  = file_get_contents('mail/notgoing.html'); // this will retrieve the html document
      $html = str_replace('$NAME',$name,$html);
      
      $mail_data = array(
                'from'=>'MinnieBallinLove <wedding@minnieballinlove.com>',
                'to'=> $email,
                'subject' => '[minnieballinlove] Thank you for your response.',
                'html' => $html
      );
    }
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $args = array('mail' => $mail_data, 'line' => $line_message);
  $jobID = Resque::enqueue('default', 'SendNotify', $args, true);
  $conn->close();
}

?>
