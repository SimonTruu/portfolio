<?php
session_start();
include 'db.php';

// Kräver inloggning
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

if (!isset($_GET['id'])) {
    header("Location: gastbok.php");
    exit;
}

$user_id = (int)$_SESSION['user_id'];
$meddelande_id = (int)$_GET['id'];

// Ta bort endast om inlägget tillhör den inloggade användaren
$sql = "DELETE FROM meddelanden
        WHERE id = $meddelande_id
          AND user_id = $user_id";

$conn->query($sql);

header("Location: gastbok.php");
exit;
