const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { createTokens, getAuthenticated } = require("../functions/func");

const Utilisateur = require('../models/Utilisateur');

// Connexion
router.post('/connexion', async (req, res) => {
    const {identifiant, mdp} = req.body;

    Utilisateur.findByPk(identifiant).then((data) => {
        if (!data) return res.json({ error: "Authentification incorrect" });

        bcrypt.compare(mdp, data.mdp).then((isValid) => {
            if (isValid) {
                const accessToken = createTokens(req.body);
                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                });
                return res.send({ success: identifiant });
            }
            return res.send({ error: "Authentification incorrect" });
        });
    }).catch((e) => {
        return res.status(500).send("Erreur interne lors de la récupération des utilisateurs")
    })
});


// Inscription
router.post('/inscription', async (req, res) => {
    const { identifiant, mdp } = req.body
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(mdp, salt, function(err, hash) {
            Utilisateur.create({
                identifiant,
                mdp: hash
            }).then((success) => {
                if (success) return res.send("Utilisateur créé")
            }).catch((error) => {
                if (error.original.sqlState === "23000") {
                    return res.status(409).send("Cet identifiant a déjà été prit")
                } else {
                    return res.status(500).send("Echec lors de la tentative de création de votre compte")
                }
            })
        });
    });
});

module.exports = router;