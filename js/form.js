function myFunction() {
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var coming = document.getElementById("coming").value;
  var room = document.getElementById("room").value;
  // Returns successful data submission message when the entered information is stored in database.
  var dataString = 'name1=' + name + '&mobile1=' + mobile + '&coming1=' + coming + '&room1=' + room;
  if (name == '' || mobile == '' || coming == '' || room == '') {
  alert("Please Fill All Fields");
  } else {
  // AJAX code to submit form.
  $.ajax({
  type: "POST",
  url: "process.php",
  data: dataString,
  cache: false,
  success: function(html) {
  alert(html);
  }
  });
  }
  return false;
}
