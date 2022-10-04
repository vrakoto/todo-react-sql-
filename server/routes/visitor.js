const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    return res.send(req.session.login)
});

// Connexion
router.post('/connexion', (req, res) => {
    const {utilisateur} = req.body;
    
    req.session.login = utilisateur
    return res.send(utilisateur)
});

module.exports = router;