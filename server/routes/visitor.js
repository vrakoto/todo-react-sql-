const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { createTokens } = require("../functions/func");

const Utilisateur = require('../models/Utilisateur');
const Todo = require('../models/Todo');

router.get('/login', (req, res) => {
    return res.send((req.cookies["access-token"]) ? true : false);
});

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
                return res.send({ success: "Authentification réussie !" });
            }
            return res.send({ error: "Authentification incorrect" });
        });
    }).catch((e) => {
        return res.send({ error: "Erreur interne lors de la récupération des utilisateurs" });
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
                if (success) return res.send({success: 'Utilisateur créé !'})
            }).catch((error) => {
                if (error.original.sqlState === "23000") {
                    return res.send({error: "Cet identifiant a déjà été prit"})
                } else {
                    return res.send({error: "Echec lors de la tentative de création de votre compte"})
                }
            })
        });
    });
});

module.exports = router;