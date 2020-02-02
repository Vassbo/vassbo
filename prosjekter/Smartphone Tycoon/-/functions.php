<?php
	session_start();

	// connect to database
	$db = mysqli_connect('localhost', 'root', 'ricre57', 'smartphone_tycoon');

	// variable declaration
	$company_name = "";
	$email = "";
	date_default_timezone_set("Europe/Oslo");
	$date = date("d.m.Y");
	$time = date("H:i");
	$errors = array();

	// call the register() function if register_btn is clicked
	if (isset($_POST['register_btn'])) {
		register();
	}

	// call the login() function if register_btn is clicked
	if (isset($_POST['login_btn'])) {
		login();
	}

	// call the settings() function if settings_btn is clicked
	if (isset($_POST['settings_btn'])) {
		settings();
	}

	if (isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['user']);
		header("location: index.php");
	}

	// REGISTER USER
	function register(){
		global $db, $errors, $date;

		// receive all input values from the form
		$company_name    =  e($_POST['company_name']);
		$email       =  e($_POST['email']);
		$password_1  =  e($_POST['password_1']);
		$password_2  =  e($_POST['password_2']);

		$checkcompany_nameinput = "SELECT * FROM users WHERE company_name='$company_name'";
		$checkemailinput = "SELECT * FROM users WHERE email='$email' AND email!=''";
		$checkcompany_name = mysqli_query($db, $checkcompany_nameinput) or die(mysqli_error($db));
		$checkemail = mysqli_query($db, $checkemailinput) or die(mysqli_error($db));

		if (mysqli_num_rows($checkcompany_name) > 0) {
		    array_push($errors, "The company name is already taken. Sorry!");
		} else if (mysqli_num_rows($checkemail) > 0) {
		    array_push($errors, "This email is already in use");
		}

		// form validation: ensure that the form is correctly filled
		if (empty($company_name)) {
			array_push($errors, "You have to enter a company name");
		}
		// if (empty($email)) {
		// 	array_push($errors, "Email is required");
		// }
		// validate email if there is one
		if (!empty($email)) {
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		  	array_push($errors, "Email address is not valid");
		  }
	  }
		if (empty($password_1) && empty($password_2)) {
			array_push($errors, "You have to enter a password");
		}
		if ($password_1 != $password_2) {
			array_push($errors, "The passwords doesn't match");
		}
		// array_push($errors, substr($pass_hash, 0, 2) . md5($password_1) . substr($pass_hash, 2));


		// register user if there are no errors in the form
		if (count($errors) == 0) {

			$pass_hash = pswrdCreation("hash", "");
			$password = pswrdCreation($pass_hash, $password_1);
			// alert($password);
			$queryhash = "INSERT INTO pass_hash (company_name, pass_hash)
						VALUES('$company_name', '$pass_hash')";
			mysqli_query($db, $queryhash);

				$query = "INSERT INTO users (company_name, email, password, reg_date, last_login)
						  VALUES('$company_name', '$email', '$password', '$date', '$date')";
				mysqli_query($db, $query);

				// Get id of the created user
				$logged_in_user_id = mysqli_insert_id($db);

				$_SESSION['user'] = getUserById($logged_in_user_id); // Put logged in user in session
				$_SESSION['success']  = "You are now logged in";
				header('location: ../');

		}

	}

	function pswrdCreation($input, $pass) {
		$output;
		if ($input == "hash") {
			$output = substr(md5(microtime()),rand(0,26),10);
		} else {
			$passwrd = md5($pass);
			$mix = substr($input, 0, 2) . substr($passwrd, 0, 4) . $input{3} . substr($passwrd, 4) . substr($input, 2); // Encrypt the password before saving in the database
			$output = md5($mix);
		}
		return $output;
	}

	// return user array from their id
	function getUserById($id){
		global $db;
		$query = "SELECT * FROM users WHERE id=" . $id;
		$result = mysqli_query($db, $query);

		$user = mysqli_fetch_assoc($result);
		return $user;
	}

	// LOGIN USER
	function login(){
		global $db, $errors, $date;

		// grap form values
		$companyName = e($_POST['company_name']);
		$password = e($_POST['password']);

		// make sure form is filled properly
		if (empty($companyName)) {
			array_push($errors, "You have to enter a company name");
		}
		if (empty($password)) {
			array_push($errors, "You have to enter a password");
		}

		// attempt login if no errors on form
		if (count($errors) == 0) {

			// get company name if an email is inputted
			$compName = "SELECT * FROM users WHERE company_name='$companyName' OR email='$companyName' LIMIT 1";
			$compName = mysqli_fetch_assoc(mysqli_query($db, $compName))['company_name'];

			// get stored hash and encrypt password from that
			$getpass_hash = "SELECT * FROM pass_hash WHERE company_name='$compName' LIMIT 1";
			$pass_hash = mysqli_fetch_assoc(mysqli_query($db, $getpass_hash))['pass_hash'];
			$password = pswrdCreation($pass_hash, $password);
			// $password = md5($password);

			// check if password matches inputted name
			$query = "SELECT * FROM users WHERE company_name='$compName' AND password='$password' LIMIT 1";
			$results = mysqli_query($db, $query);

			if (mysqli_num_rows($results) == 1) { // user found

				$logged_in_user = mysqli_fetch_assoc($results);

          $query = "UPDATE users SET last_login='$date' WHERE company_name='$compName' AND password='$password' LIMIT 1";
					mysqli_query($db, $query);

					$_SESSION['user'] = $logged_in_user;
					$_SESSION['success']  = "You are now logged in";

					header('location: ../');
			} else {
				array_push($errors, "Wrong name and password combination");
			}
		}
	}

	function isLoggedIn()
	{
		if (isset($_SESSION['user'])) {
			return true;
		} else {
			return false;
		}
	}















 function settings() {
	 global $db, $errors;

	 // receive all input values from the form
	 $companyName    =  e($_POST['company_name']);
	 $email       =  e($_POST['email']);
	 $password1  =  e($_POST['password1']);
	 $password2  =  e($_POST['password2']);

	 $checkCompanyNameInput = "SELECT * FROM users WHERE company_name='$companyName'";
	 $checkEmailInput = "SELECT * FROM users WHERE email='$email' AND email!=''";
	 $checkCompanyName = mysqli_query($db, $checkCompanyNameInput) or die(mysqli_error($db));
	 $checkEmail = mysqli_query($db, $checkEmailInput) or die(mysqli_error($db));

	 if (mysqli_num_rows($checkCompanyName) > 0 && $_POST['company_name'] !== $_SESSION['user']['company_name']) {
			 array_push($errors, "That company name is already taken. Sorry!");
	 }

	 // form validation: ensure that the form is correctly filled
	 if (empty($companyName)) {
		 array_push($errors, "You have to enter a company name");
	 }
	 // if (empty($email)) {
	 // 	array_push($errors, "Email is required");
	 // }
	 // validate email if there is one
	 if (!empty($email)) {
		 if (mysqli_num_rows($checkEmail) > 0 && $_POST['email'] !== $_SESSION['user']['email']) {
				 array_push($errors, "That email is already in use");
		 }
		 // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			//  array_push($errors, "Email address is not valid");
		 // }
	 }
	 if (!empty($password1) || !empty($password2)) {
		 if ($password1 != $password2) {
			 array_push($errors, "The passwords doesn't match");
		 }
	 }

	 // if no changes
	 if ($_POST['company_name'] == $_SESSION['user']['company_name'] && $_POST['email'] == $_SESSION['user']['email'] && empty($password1) && empty($password2)) {
		 array_push($errors, "There was no changes...");
	 }
	 // header('location: ../Smartphone_Tycoon/');
	 // echo '<script>currentPage = "settings";fadeout(document.getElementsByClassName("main")[0]);fadeout(document.getElementsByClassName("main-side-menu")[0]);document.getElementsByClassName("main-side-menu")[0].classList.add("slide-left");fadeout(document.getElementsByClassName("right-menu")[0]);fadein(document.getElementsByClassName("settings")[0]);</script>';
	 // echo 'menuButton("settings");';

	 // update user information if there are no errors in the form
	 if (count($errors) == 0) {

		 if (!empty($password1)) {
			 $pass_hash = pswrdCreation("hash", "");
			 $password = pswrdCreation($pass_hash, $password1);

			 $compName = $_SESSION['user']['company_name'];

			 $getpass_hash = "SELECT * FROM pass_hash WHERE company_name='$compName' LIMIT 1";
			 $pass_hash_id = mysqli_fetch_assoc(mysqli_query($db, $getpass_hash))['id'];

			 $queryhash = "UPDATE pass_hash SET pass_hash='$pass_hash', company_name='$companyName' WHERE id='$pass_hash_id' LIMIT 1";
			 mysqli_query($db, $queryhash);

			 $sql = "UPDATE users SET password='$password' WHERE id=" . $_SESSION['user']['id'] . "";
			 $result = mysqli_query($db, $sql);
		 }

		 if ($_POST['email'] !== $_SESSION['user']['email']) {
			 $sql = "UPDATE users SET email='$email' WHERE id=" . $_SESSION['user']['id'] . "";
			 $result = mysqli_query($db, $sql);

			 // $_SESSION['user']['email'] = $result;
		 }

		 if ($_POST['company_name'] !== $_SESSION['user']['company_name']) {
			 $sql = "UPDATE users SET company_name='$companyName' WHERE id=" . $_SESSION['user']['id'] . "";
			 $result = mysqli_query($db, $sql);

			 // array_push($errors, $result);
		 }

		 // TODO: max 30 char, min 4 in password

		 // $sql = "UPDATE users SET company_name='$companyName', email='$email', password='$password' WHERE id=" . $_SESSION['user']['company_name'] . "";
		 // $result = mysqli_query($db, $sql);
		 // alert($sql);

		 // Update session
		 $_SESSION['user']['company_name'] = $companyName;
		 $_SESSION['user']['email'] = $email;
		 header('location: ../Smartphone_Tycoon/');

	 }
 }


















// Chat
if (isset($_POST['chat_send'])) {
    global $db, $date, $time;
    $profile_image = $_SESSION['user']['profile_image'];
    $text = e($_POST['chat']); // stripslashes($_POST['chat']);

    if ($text !== "") {
        $id = $_SESSION['user']['id'];
        $company_name = $_SESSION['user']['company_name'];
        $sql = "INSERT INTO chat (company_name, text, profile_image, date, time)
                VALUES ('$company_name', '$text', '$profile_image', '$date', '$time')";
        if(mysqli_query($db, $sql)){
            // $msg = "Image uploaded and saved in the Database";
            // $msg_class = "alert-success";
            // echo "Bilde lastet opp og lagret i databasen";
            // $_SESSION['user']['bio'] = $bio;
            // $_SESSION['user']['profile_image'] = $profileImageName;
        } else {
            // $msg = "Det oppsto en feil i databasen";
            // $msg_class = "alert-danger";
            echo "Det oppsto en feil i databasen";
        }
    }
}





	// escape string
	function e($val){
		global $db;
		return mysqli_real_escape_string($db, trim($val));
	}

	function display_error() {
		global $errors;

		if (count($errors) > 0) {
			echo '<div class="error">';
				foreach ($errors as $error){
					echo $error .'<br>';
				}
			echo '</div>';
		}
	}


	function register_error() {
		global $errors;

		if (count($errors) > 0) {
			$i = 0;
			$cnt = count($errors) - 1;
			echo '<script> document.getElementsByClassName("input")[0].style.border = "1px solid #16a06e"; </script>';
			echo '<script> document.getElementsByClassName("input")[1].style.border = "1px solid #16a06e"; </script>';
			echo '<script> document.getElementsByClassName("input")[2].style.border = "1px solid #16a06e"; </script>';
			echo '<script> document.getElementsByClassName("input")[3].style.border = "1px solid #16a06e"; </script>';
			while ($cnt >= $i) {
				if ($errors[$i] == "You have to enter a company name") {
					echo '<script> document.getElementsByClassName("input")[0].style.border = "1px solid #f25757"; </script>';
				} else if ($errors[$i] == "This email is already in use") {
					echo '<script> document.getElementsByClassName("input")[1].style.border = "1px solid #f25757"; </script>';
				} else if ($errors[$i] == "You have to enter a password" || $errors[$i] == "The passwords doesn't match") {
					echo '<script> document.getElementsByClassName("input")[2].style.border = "1px solid #f25757"; </script>';
					echo '<script> document.getElementsByClassName("input")[3].style.border = "1px solid #f25757"; </script>';
				}
				$i++;
			}
		}
	}

	function login_error() {
		global $errors;

		if (count($errors) > 0) {
			$i = 0;
			$cnt = count($errors) - 1;
			echo '<script> document.getElementsByClassName("input")[0].style.border = "1px solid #16a06e"; </script>';
			echo '<script> document.getElementsByClassName("input")[1].style.border = "1px solid #16a06e"; </script>';
			while ($cnt >= $i) {
				if ($errors[$i] == "You have to enter a company name") {
					echo '<script> document.getElementsByClassName("input")[0].style.border = "1px solid #f25757"; </script>';
				} else if ($errors[$i] == "You have to enter a password" || $errors[$i] == "The passwords doesn't match") {
					echo '<script> document.getElementsByClassName("input")[1].style.border = "1px solid #f25757"; </script>';
				} else if ($errors[$i] == "Wrong name and password combination") {
					echo '<script> document.getElementsByClassName("input")[0].style.border = "1px solid #f25757"; </script>';
					echo '<script> document.getElementsByClassName("input")[1].style.border = "1px solid #f25757"; </script>';
				}
				$i++;
			}
		}
	}


?>
