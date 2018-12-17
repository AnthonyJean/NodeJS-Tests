/**
 *
 * Premiers tests Node.js
 *
 * @summary Patchwork de fonctionnalités Node.js
 * @author Anthony JEAN
 *
 * Created at     : 2018-12-17 21:12:56 
 * Last modified  : 2018-12-27 23:09:40
 */


var http = require('http');
var dt 	= require('./myfirstmodule');
var url = require ('url');
var fs = require('fs'); 
// Gestion des évenements
var events = require('events');
var eventEmitter = new events.EventEmitter(); 
// A télécharger depuis NPM
var uc = require('upper-case'); 


// URL de test 
// http://localhost:8080/
// http://localhost:8080/erreur.html
// http://localhost:8080/summer.html
// http://localhost:8080/winter.html?year=2018&month=July

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html ; charset=utf-8'});

    // Traitement de l'évenement potentiel
    var myEventHandler = function() {
    	console.log("Un évenement est survenu !");
    }

    // Assignation de l'évenement à l'objet eventEmitter
    eventEmitter.on('ping', myEventHandler);

    // Ecriture en majuscules
    res.write(uc("Hello World!<br>"));

    // Appel au module perso
    res.write("Date et heure recuperee du module perso [" + dt.myDateTime() + "]<br>");

    // Affichage de l'url
    if (req.url != "/") {
    	res.write("URL actuelle [" + req.url + "]<br>");
    }

    // Affichage paramètre sur l'objet url
    var q = url.parse(req.url, true).query;
    if (q.year && q.month) {
    	res.write("year [" + q.year + "] month [" + q.month + "]<br>");	
    }

    // Split de l'url et affichage en console
    var q2 = url.parse(req.url, true);
    console.log(q2.host); 
	console.log(q2.pathname); 
	console.log(q2.search); 
    
    // Lecture du fichier html
    if (req.url != "/") {
	    fs.readFile("." + q2.pathname, function(err, data) {
	    	if (err) {
	    		return res.end("Fichier html non trouvé (" + q2.pathname + ")<br>");
	    	}
	    	res.write("Ce contenu provient de " + q2.pathname + "<br>");
	    	res.write(data);
	    	res.end();
	    });
	}

    // Création et remplissage d'un fichier s'il n'existe pas
    var fs1 = require('fs');

	fs1.appendFile('mynewfile1.txt', 'Hello content File 1!', function (err) {
  	if (err) throw err;
  		console.log('File 1 saved!');
	}); 

	// Création d'un fichier vide en écriture
	var fs2 = require('fs');

	fs2.open('mynewfile2.txt', 'w', function (err, file) {
  	if (err) throw err;
  		console.log('File 2 saved!');
	}); 

	// Création et remplissage d'un fichier avec la méthode writeFile
	var fs3 = require('fs');

	fs3.writeFile('mynewfile3.txt', 'Hello content File 3!', function (err) {
  	if (err) throw err;
  		console.log('File 3 saved!');
	}); 

	// Lancement de l'évenement
	eventEmitter.emit('ping');

}).listen(8080); 

