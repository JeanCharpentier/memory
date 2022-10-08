<?php
    include('credentials.php');
    $connexion = new mysqli($server,$user,$pwd,$db);

    if(isset($_POST["function"]) && $_POST["function"] == "setNewTime"){
        setNewTime($_POST["args"][0]);
    }

    function connect(){
        global $connexion;
        if($connexion->connect_error) {
            die("Erreur de connexion à la base de données !");
        }else {
            //echo("Connexion OK");
        }
    }

    function setNewTime($newTime) {
        global $connexion;
        connect();
        $sql = "INSERT INTO times (`id`,`time`) VALUES (NULL, ".$newTime.")";
        if($connexion->query($sql) === TRUE) {
            echo "Temps ajouté avec succès";
        }else {
            echo "Erreur lors de l'ajout du temps dans la base de donénes : ".$connexion->error;
        }

        $connexion->close();
    }

    function getBestTimes() {
        global $connexion;
        connect();
        $sql = "SELECT time FROM times ORDER BY time ASC LIMIT 5";
        if($results = $connexion->query($sql)) {
            while($row = $results->fetch_assoc()) {
                echo "<li>".$row["time"]."</li>";
            }
        }else {
            echo "Pas de résultats";
        }

        $connexion->close();
    }
    
?>