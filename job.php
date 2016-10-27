<?php
require 'vendor/autoload.php';
use Mailgun\Mailgun;
//Your credentials

date_default_timezone_set('Asia/Bangkok');

define('LINE_API',"https://notify-api.line.me/api/notify");
define('LINE_TOKEN','aLKeS5gh3wzKUxsOvokATtxy1Ajnl8aZzTiZ5SY1hfc');


class SendNotify
{
  public function setUp ()
  {

  }

  public function notify_message($message){
      $queryData = array('message' => $message);
      $queryData = http_build_query($queryData,'','&');
      $headerOptions = array(
          'http'=>array(
              'method'=>'POST',
              'header'=> "Content-Type: application/x-www-form-urlencoded\r\n"
              		  ."Authorization: Bearer ".LINE_TOKEN."\r\n"
                        ."Content-Length: ".strlen($queryData)."\r\n",
              'content' => $queryData
          )
      );
      $context = stream_context_create($headerOptions);
      $result = file_get_contents(LINE_API,FALSE,$context);
      $res = json_decode($result);
  	return $res;
  }

  public function perform()
  {
    // $host_pinged = $this->args['host'];
    // echo "\n ==== \n pinging $host_pinged \n";
    // echo "sdfsdf";
    $mg = new Mailgun("key-6433c5fa21dd3f598aae6ea9d74dbdf7");
    $domain = "mg.minnieballinlove.com";

    $mg->sendMessage($domain, $this->args['mail']);
    $res = $this->notify_message($this->args['line']);

  }
}
 ?>
