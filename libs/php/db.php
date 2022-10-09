<?php
    // Script d'enregistrement/lecture de la base de données MySQL
    include('credentials.php');

    // Création de l'objet qui sera utilisé pour nos différentes opérations
    $connexion = new mysqli($server,$user,$pwd,$db);

    // Si une méthode POST est reçue par le script (en cas de victoire du joueur), on appelle la fonction setNewTime avec le temps transmit dans la méthode POST
    if(isset($_POST["function"]) && $_POST["function"] == "setNewTime"){
        setNewTime($_POST["args"][0]);
    }

    // Connexion à la base de données
    function connect(){
        global $connexion;
        // Si on ne peut as se connecter à la base, une erreur est affichée et le script stop son execution
        if($connexion->connect_error) {
            die("Erreur de connexion à la base de données.");
        }
    }

    // Enregistrement du nouveau temps dans la base
    function setNewTime($newTime) {
        global $connexion;
        // On se connecte à la base
        connect();
        // On crée la requete d'ajout avec le nouveau temps passé en paramètre
        $sql = "INSERT INTO times (`id`,`time`) VALUES (NULL, ".$newTime.")";
        // La requête est executée, si c'est avec succès, on affiche le message de réussite de l'enregistrement, sinon on affiche l'erreur d'enregistrement
        if($connexion->query($sql) === TRUE) {
            echo "Temps ajouté avec succès";
        }else {
            echo "Erreur lors de l'ajout du temps dans la base de données : ".$connexion->error;
        }
        // On se déconnecte de la base
        $connexion->close();
    }

    // Récupération et affichage des trois meilleurs temps
    function getBestTimes() {
        global $connexion;
        // On se connecte à la base
        connect();
        // On crée la requête qui va ressortir les trois meilleurs temps de la base
        $sql = "SELECT time FROM times ORDER BY time ASC LIMIT 3";
        // Si a requête renvoit des résultats
        if($results = $connexion->query($sql)) {
            // Pour chaque résultat renvoyé, on l'affiche en tant qu'élément d'une liste
            while($row = $results->fetch_assoc()) {
                echo "<li>".$row["time"]."</li>";
            }
        }else { // Si il n'y a pas de résultats, donc pas encore de meilleurs temps
            echo "Pas de résultats";
        }
        // On se déconnecte de la base
        $connexion->close();
    }
    
?>