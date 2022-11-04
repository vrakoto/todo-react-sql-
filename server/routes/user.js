const express = require('express');
const { getAuthenticated } = require('../functions/func');
const Todo = require('../models/Todo');
const router = express.Router();

router.get('/todos', async (req, res) => {
    const { username } = getAuthenticated(req.cookies["access-token"])
    const request = {
        where: {
            UtilisateurIdentifiant: username
        },
        order: [
            ['id', 'DESC']
        ]
    }

    Todo.findAll(request).then((datas) => {
        if (!datas) return res.send({ error: "Aucun TODO" });
        return res.send(datas)
    }).catch((error) => {
        return res.status(500).send("Erreur interne lors de la récupération des todos")
    })
});

router.post('/todo', async (req, res) => {
    const { username } = getAuthenticated(req.cookies["access-token"])
    const leTodo = { titre: req.body.titre, description: req.body.description, priorite: req.body.priorite, UtilisateurIdentifiant: username }

    Todo.create(leTodo).then((msg) => {
        if (msg) return res.send("Todo créé !")
    }).catch((error) => {
        return res.status(500).send("Echec lors de la tentative de création de votre todo")
    })
});

router.post('/resetTodos', async (req, res) => {
    const { username } = getAuthenticated(req.cookies["access-token"])
    const request = {
        where: { UtilisateurIdentifiant: username }
    }
    
    Todo.destroy(request).then((msg) => {
        if (msg) return res.send('ok')
    }).catch((e) => {
        return res.status(500).send("Echec lors de la suppression de tous vos todos")
    })
});

router.post('/editTodo', async (req, res) => {
    const { id, champs } = req.body
    const selector = { where: { id } }

    Todo.update(champs, selector).then((msg) => {
        if (msg) return res.send('ok')
    }).catch((error) => {
        return res.status(500).send("Echec lors de la modification du todo")
    })
});

router.post('/deleteTodo', (req, res) => {
    const { username } = getAuthenticated(req.cookies["access-token"])
    const { leTodo } = req.body

    const request = {
        where: { UtilisateurIdentifiant: username, id: leTodo }
    }

    Todo.destroy(request).then((msg) => {
        if (msg) return res.send('ok')
    }).catch((error) => {
        return res.status(500).send("Echec lors de la suppression du todo")
    })
});

router.post('/logout', (req, res) => {
    res.clearCookie('access-token')
    return res.send('logout')
});

module.exports = router;