const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');
const router = express.Router();
const functions = require('../config/function');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

const Utilisateur = require('../models/Utilisateur');
const Todo = require('../models/Todo');

router.post('/inscription', async (req, res) => {
    const { identifiant, mdp } = req.body
    const hash = bcrypt.hashSync(mdp, bcrypt.genSaltSync(10));
    await Utilisateur.create({
        identifiant,
        mdp: hash
    }).then((success) => {
        console.log(success);
        if (success) return res.send({success: 'Utilisateur créé !'})
    }).catch((error) => {
        console.log(error);
        if (error.original.sqlState === "23000") {
            return res.send({error: "Cet identifiant a déjà été prit"})
        } else {
            return res.send({error: "Echec lors de la tentative de création de votre compte"})
        }
    })
});

module.exports = router;