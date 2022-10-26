const express = require('express');
const router = express.Router();

router.get('/todos', (req, res) => {
    return res.send(req.session.todos)
});

router.post('/todo', (req, res) => {
    req.session.key++
    let key = req.session.key

    const leTodo = { id: key, titre: req.body.titre, description: req.body.description, priorite: req.body.priorite }
    const lesTodos = req.session.todos

    lesTodos.push(leTodo)
    return res.send('ok')
});

router.post('/resetTodos', (req, res) => {
    req.session.todos = []
    return res.send('ok')
});

router.post('/editTodo', (req, res) => {
    const { id, titre, description, priorite } = req.body

    req.session.todos.forEach(leTodo => {
        if (leTodo.id === id) {
            console.log(req.session.todos);
        }
    });
});

router.post('/deleteTodo', (req, res) => {
    const { leTodo } = req.body
    req.session.todos = req.session.todos.filter((todo, key) => key !== leTodo);

    return res.send('ok')
});

router.post('/logout', (req, res) => {
    res.clearCookie('access-token')
    return res.send('logout')
});

module.exports = router;