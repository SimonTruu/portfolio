<?php
session_start();
include 'db.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $sql = "SELECT * FROM users
            WHERE username = '" . $conn->real_escape_string($username) . "'
              AND password = '" . $conn->real_escape_string($password) . "'
            LIMIT 1";

    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id']  = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: gastbok.php");
        exit;
    } else {
        $message = "Felaktigt användarnamn eller lösenord.";
    }
}
?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <title>Logga in</title>
</head>
<body>
    <h1>Logga in</h1>

    <?php
    if ($message !== '') {
        echo "<p>$message</p>";
    }
    ?>

    <form method="POST" action="login.php">
        <label for="username">Användarnamn:</label><br>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Lösenord:</label><br>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Logga in</button>
    </form>

    <p><a href="register.php">Skapa nytt konto</a></p>
</body>
</html>
