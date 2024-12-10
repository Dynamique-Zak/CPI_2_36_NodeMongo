// Importer le module express
const express = require('express');
// Importer le module mongoose
const mongoose = require('mongoose');

// ================================================
// Connexion à la base de données
// ================================================
// Quand je suis connecté à la bdd (evenementiel)
mongoose.connection.once('open', () => {
    console.log("Connexion à la base de données effectué");
});

// Quand la bdd aura des erreurs
mongoose.connection.on('error', () => {
    console.log("Erreur dans la BDD");
});

// Se connecter sur mongodb (async)
// Ca prend x temps à s'executer
// TODO :: Adapter le lien de connexion à la base
mongoose.connect("mongodb://localhost:27017/db_demo");

// TODO : creer le modèle Article

// ================================================
// Instancier un serveur et autoriser envokie json
// ================================================
// Instancier le server grace à express
const app = express();

// AUTORISER LE BACK A RECEVOIR DES DONNEES DANS LE BODY
app.use(express.json());

// ================================================
// Les routes (url/point d'entrée)
// ================================================
app.get('/articles', (request, response) => {
    return response.json({ message : "Todo" });
});

app.get('/article/:id', (request, response) => {
    const idParam = request.params.id;

    return response.json({ message : `id : ${idParam}` });
});

app.post('/save-article', (request, response) => {
    return response.json({ message : "Todo" });
});

app.delete('/article/:id', (request, response) => {
    return response.json({ message : "Todo, supprimera un article" });
});

// ================================================
// Lancer le serveur
// ================================================
app.listen(3000, () => {
    console.log("Le serveur a démarré");
});