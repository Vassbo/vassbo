<?php require_once '../security/authController.php') ?>
<!DOCTYPE html>
<html>
<head>
	<title>Smartphone Tycoon | Reset Password</title>
	<link rel="stylesheet" type="text/css" href="../css/login-style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <!--<h1 id="gaming-title">Gaming is great</h1>-->

	<form class="form" method="post" action="index.php">

		<h2>Reset Password</h2>
		<br>
		<?php echo display_error(); ?>

		<div class="input-group">
			<label>Password</label>
			<input class="input" type="password" name="password">
		</div>
    <div class="input-group">
			<label>Confirm Password</label>
			<input class="input" type="password" name="repeat-password">
		</div>

		<div class="input-group">
			<button type="submit" class="btn pointer" name="reset-password_btn">Reset Password</button>
		</div>
		<?php echo login_error(); ?>
	</form>

    <footer>
            <!--<p id="version">v. 2.0</p>-->
            <p id="copy">&copy 2019 Kristoffer Vassbø</p>
    </footer>
</body>
</html>
