<?php
include 'db.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if ($username === '' || $password === '') {
        $message = "Alla fält måste fyllas i.";
    } else {
        $sql = "INSERT INTO users (username, password)
                VALUES ('" . $conn->real_escape_string($username) . "',
                        '" . $conn->real_escape_string($password) . "')";

        if ($conn->query($sql) === true) {
            $message = "Användare skapad. Du kan nu logga in.";
        } else {
            $message = "Fel: " . $conn->error;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <title>Registrera</title>
</head>
<body>
    <h1>Registrera ny användare</h1>

    <?php
    if ($message !== '') {
        echo "<p>$message</p>";
    }
    ?>

    <form method="POST" action="register.php">
        <label for="username">Användarnamn:</label><br>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Lösenord:</label><br>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Skapa konto</button>
    </form>

    <p><a href="login.php">Har du redan konto? Logga in här</a></p>
</body>
</html>
