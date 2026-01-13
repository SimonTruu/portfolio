<?php
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "logbook_db";

// Skapa anslutning
$conn = new mysqli($servername, $username, $password, $dbname);

// Kontrollera anslutning
if ($conn->connect_error) {
  die("Anslutningen misslyckades: " . $conn->connect_error);
}
?>
