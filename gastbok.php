<?php
session_start();
include 'db.php';
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $namn = trim($_POST['namn']);
    $meddelande = trim($_POST['meddelande']);
    $user_id = (int)$_SESSION['user_id'];

    if ($namn !== '' && $meddelande !== '') {
        $sql = "INSERT INTO meddelanden (namn, meddelande, user_id)
                VALUES ('" . $conn->real_escape_string($namn) . "',
                        '" . $conn->real_escape_string($meddelande) . "',
                        $user_id)";

        $conn->query($sql);
    }
}

$sql = "SELECT id, namn, meddelande, skapad, user_id
        FROM meddelanden
        ORDER BY skapad DESC";

$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <title>Gästbok</title>
</head>
<body>
    <h1>Gästbok</h1>

    <p>
        Inloggad som: <?php echo htmlspecialchars($_SESSION['username']); ?>
        | <a href="logout.php">Logga ut</a>
    </p>

    <form method="POST" action="gastbok.php">
        <label for="namn">Namn (visningsnamn):</label><br>
        <input type="text" id="namn" name="namn" required><br><br>

        <label for="meddelande">Meddelande:</label><br>
        <textarea id="meddelande" name="meddelande" rows="4" required></textarea><br><br>

        <input type="submit" value="Skicka">
    </form>

    <hr>

    <h2>Alla meddelanden</h2>

    <?php
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<p><strong>" . htmlspecialchars($row['namn']) . " skrev:</strong></p>";
            echo "<p>" . nl2br(htmlspecialchars($row['meddelande'])) . "</p>";
            echo "<p><em>Skickat: " . $row['skapad'] . "</em></p>";

            // Visa ta bort-länk om detta meddelande tillhör inloggad användare
            if ((int)$row['user_id'] === (int)$_SESSION['user_id']) {
                echo '<p><a href="delete.php?id=' . (int)$row['id'] . '">Ta bort detta inlägg</a></p>';
            }

            echo "<hr>";
        }
    } else {
        echo "<p>Inga meddelanden finns ännu.</p>";
    }
    ?>
</body>
</html>
