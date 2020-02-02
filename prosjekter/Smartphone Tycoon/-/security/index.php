<?php
require_once '../security/authController.php';

// vertify user token
if (isset($_GET['token'])) {
  $token = $_GET['token'];
  vertifyUser($token);
}

if (!isset($_SESSION['id'])) {
  header('location: ../login');
  exit();
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Smartphone Tycoon | Recover Password</title>
	<link rel="stylesheet" type="text/css" href="../css/login-style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

		<h2>Recover your password</h2>
    <p>An email has been sent to the address provided, please check your inbox.</p>
</body>
</html>
