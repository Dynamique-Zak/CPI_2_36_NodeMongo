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
mongoose.connect("mongodb://127.0.0.1:27017/db_article");

// Creer le modèle Article
const Article = mongoose.model('Article', { title: String, content: String, author: String }, 'articles');

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
app.get('/articles', async (request, response) => {

    // Récupérer tout les articles
    const articles = await Article.find();

    return response.json(articles);
});

app.get('/article/:id', async (request, response) => {
    // Récupèrer l'id
    const idParam = request.params.id;

    // BONUS : Eviter de try catch on va tester que l'id a 24 character
    if (idParam.length != 24){
        return response.json({ code : '702' });
    }

    // Select de l'article
    const foundArticle = await Article.findOne({ _id : idParam});

    //Si l'id n'existe pas en base
    if (!foundArticle) {
        return response.json({ code : '702' });
    }

    // Sinon ok
    return response.json(foundArticle);
});

app.post('/save-article', async (request, response) => {
    // Récupérer le body envoyé
    const articleJSON = request.body;

    // Save en base
    const newArticle = new Article(articleJSON);

    await newArticle.save();

    // Réponse json
    return response.json(newArticle);
});

app.delete('/article/:id', async (request, response) => {
    // Récupèrer l'id
    const idParam = request.params.id;

    // BONUS : Eviter de try catch on va tester que l'id a 24 character
    if (idParam.length != 24){
        return response.json({ code : '702' });
    }

    // Select de l'article
    const foundArticle = await Article.findOne({ _id : idParam});

    //Si l'id n'existe pas en base on delete pas
    if (!foundArticle) {
        return response.json({ code : '702' });
    }

    // DELETE l'article
    await Article.deleteOne({ _id : idParam});

    // Sinon ok
    return response.json({ code : '200' });
});

// ================================================
// Lancer le serveur
// ================================================
app.listen(3000, () => {
    console.log("Le serveur a démarré");
});