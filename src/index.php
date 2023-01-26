<!DOCTYPE html>
<html lang="fr-FR">
<head>
	<title>Météo &#8211; Léo SEGUIN</title>
	<meta charset="UTF-8">
	<meta name="description" content="Météo en temps réel, précise et fiable pour n'importe quelle ville du monde avec prévisions des 5 prochains jours.">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="noindex, nofollow">
	<meta name="theme-color" id="themecolor" content="#1c95ec">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="#1c95ec">
	<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
	<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="style.min.css">
	<link rel="manifest" href="manifest.json">
</head>
<body>
	<div class="wrapper">
		<header>
			<span id="heure"></span>
			<a href="./" id="retour" aria-label="Retour">🔎</a>Météo
		</header>
		<div class="input-part">
			<p class="info-txt">Chargement...</p>
			<input type="text" id="ville" placeholder="Saisissez le nom d'une ville" maxlength="35" aria-label="Rechercher">
			<div class="separator"></div>
			<button id="geolocalisation">Localisation actuelle</button>
		</div>
		<div class="weather-part">
			<div class="main-info">
				<div class="temp">
				<img id="img" src="/" alt="">
					<span></span>
				</div>
			</div>
			<div class="location">
				<span></span>
			</div>
			<div class="bottom-details">
				<div class="column feels">
					<div class="details">
						<span></span>
						<p>Ressenti</p>
					</div>
				</div>
				<div class="column humidity">
					<div class="details">
						<span></span>
						<p>Humidité</p>
					</div>
				</div>
				<div class="column wind">
					<div class="details">
						<span></span>
						<p>Vent</p>
					</div>
				</div>
				<div class="column pressure">
					<div class="details">
						<span></span>
						<p>Pression</p>
					</div>
				</div>
			</div>
			<div class="graphique">
				<p class="titreGraph">Températures prochaines 24 heures</p>
				<canvas id="chart" aria-label="Graphique" role="img"></canvas>
			</div>
			<div class="bottom-details">
				<div class="column">
					<div class="details">
						<p id="jour2"></p>
						<img id="img2" src="/" alt="">
						<div class="temp">
							<span class="numb2"></span>
							°C
						</div>
					</div>
				</div>
				<div class="column">
					<div class="details">
						<p id="jour3"></p>
						<img id="img3" src="/" alt="">
						<div class="temp">
							<span class="numb3"></span>
							°C
						</div>
					</div>
				</div>
				<div class="column">
					<div class="details">
						<p id="jour4"></p>
						<img id="img4" src="/" alt="">
						<div class="temp">
							<span class="numb4"></span>
							°C
						</div>
					</div>
				</div>
				<div class="column">
					<div class="details">
						<p id="jour5"></p>
						<img id="img5" src="/" alt="">
						<div class="temp">
							<span class="numb5"></span>
							°C
						</div>
					</div>
				</div>
				<div class="column">
					<div class="details">
						<p id="jour6"></p>
						<img id="img6" src="/" alt="">
						<div class="temp">
							<span class="numb6"></span>
							°C
						</div>
					</div>
				</div>
			</div>
		</div>
		<span class="copyright">&copy;2020-<?php echo date('Y'); ?>
			<a href="https://leoseguin.fr/" target="_blank" rel="noreferrer">Léo SEGUIN</a>
		</span>
	</div>
	<script src="js/script.min.js"></script>
	<script src="js/chart.min.js"></script>
</body>
</html>