$(document).ready(function(){
$("#submit").click(function(){
var name = $("#name").val();
var mobile = $("#mobile").val();
var coming = $("#coming").val();
var room = $("#room").val();
// Returns successful data submission message when the entered information is stored in database.
var dataString = 'name1='+ name + '&mobile1='+ mobile + '&coming1='+ coming + '&room1='+ room;
if(name==''||mobile==''||coming==''||room=='')
{
alert("Please Fill All Fields");
}
else
{
// AJAX Code To Submit Form.
$.ajax({
type: "POST",
url: "process.php",
data: dataString,
cache: false,
success: function(result){
alert(result);
}
});
}
return false;
});
});
