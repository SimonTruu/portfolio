<?php
include 'db.php';

$namn = $_POST['name'];
$meddelande = $_POST['message'];

$sql = "INSERT INTO messages (name, message)
VALUES ('$namn', '$meddelande')";

if ($conn->query($sql) === TRUE) {
  echo "<h1>Tack för ditt meddelande, $namn!</h1>";
  echo "<p>Ditt meddelande har sparats.</p>";
} else {
  echo "Fel vid sparande: " . $conn->error;
}
?>
