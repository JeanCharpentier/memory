<!DOCTYPE html>
<?php include('./libs/php/db.php'); ?>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Memory - Démo</title>
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div class="container">
            <div class="leaderboard">
                <ul>
                    <p>Leaderboard</p>
                    <?php getBestTimes($connexion); ?>
                </ul>
            </div>
            <div class="grille"></div>
            <div class="timer" id="progressbar"></div>
            
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="libs/js/cards.js"></script>
        <script src="libs/js/functions.js"></script>
        <script src="main.js"></script>
    </body>
</html>