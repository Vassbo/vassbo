<?php require_once '../security/authController.php'; ?>
<!DOCTYPE html>
<html>
<head>
	<title>Smartphone Tycoon | Forgot Password</title>
	<link rel="stylesheet" type="text/css" href="../css/login-style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <!--<h1 id="gaming-title">Gaming is great</h1>-->

	<form class="form" method="post" action="index.php">

		<h2>Recover your password</h2>
    <br>
    <p>Please enter your email adress you used to sign up on this site and we will assist you in recovering your password.</p>
		<br>
		<?php echo display_error(); ?>
		<div class="input-group">
			<!-- <label>Email</label> -->
			<input class="input" type="email" name="email"> <!--placeholder="Company or email"-->
		</div>

		<div class="input-group">
			<button type="submit" class="btn pointer" name="recover_password">Recover your password</button>
		</div>
		<?php echo login_error(); ?>
		<p><a href="../login">Go back</a></p>
	</form>

    <footer>
            <!--<p id="version">v. 2.0</p>-->
            <p id="copy">&copy 2019 Kristoffer Vassbø</p>
    </footer>
</body>
</html>
