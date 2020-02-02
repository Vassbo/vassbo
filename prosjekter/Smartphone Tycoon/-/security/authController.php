
<?php
include('../functions.php');
include('sendEmail.php');

// if user clicks on the recover password button
if (isset($_POST['recover_password'])) {
  $email = $_POST['email'];

  // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  // 	array_push($errors, "Email address is not valid");
  // }

  // $checkEmailInDataBase = "SELECT email FROM users WHERE email='$email'";
  $checkEmailInDataBase = "SELECT * FROM users WHERE email='$email' LIMIT 1";
  $result = mysqli_query($db, $checkEmailInDataBase);
  if (empty($email)) {
  	array_push($errors, "Email is required");
  } else if (mysqli_num_rows($result) == 0) {
  	array_push($errors, "Could not find that email in our database");
  }

  // if (count($errors) > 0) {
  //   echo '<div class="error">';
  //     foreach ($errors as $error){
  //       echo $error .'<br>';
  //     }
  //   echo '</div>';
  // }

  if (count($errors) == 0) {
    // global $db;

    $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $result = mysqli_query($db, $sql);
    $user = mysqli_fetch_assoc($result);
    $token = $user['token'];
    // echo $token;
    sendPasswordResetLink($email, $token);
    header('location: ../security/password_message.php');
    exit(0);
  }
}

// if user click on the reset password button
if (isset($_POST['reset-password_btn'])) {
  $password1 = $_POST['password'];
  $password2 = $_POST['repeat-password'];

  if (empty($password1) && empty($password2)) {
    array_push($errors, "You have to enter a password");
  }

  if ($password1 != $password2) {
    array_push($errors, "The passwords doesn't match");
  }

  if (count($errors) == 0) {

    $pass_hash = pswrdCreation("hash", "");
    $password = pswrdCreation($pass_hash, $password1);

    $compName = "SELECT company_name FROM users WHERE email='$email'";
    $queryhash = "UPDATE pass_hash SET pass_hash='$pass_hash' WHERE company_name='$compName'";
    mysqli_query($db, $queryhash);

    $sql = "UPDATE users SET password='$password' WHERE email='$email'";
    $result = mysqli_query($db, $sql);

    if ($result) {
      location('location: ../login');
      exit(0);
    }
  }
}


function resetPassword($token) {
  global $db;
  $sql = "SELECT * FROM users WHERE token='$token' LIMIT 1";
  $result = mysqli_query($db, $sql);
  $user = mysqli_fetch_assoc($result);
  $_SESSION['email'] = $user['email'];
  header('location: ../reset-password');
  exit();
}

?>
