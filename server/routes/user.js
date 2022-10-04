const express = require('express');
const router = express.Router();

router.get('/todos', (req, res) => {
    return res.send(req.session.todos)
});

router.post('/todo', (req, res) => {
    const todo = { titre, description, priorite } = req.body
    const lesTodos = req.session.todos
    lesTodos.push(todo)

    return res.send('ok')
});

router.post('/resetTodos', (req, res) => {
    req.session.todos = []
    return res.send('ok')
});

router.post('/deleteTodo', (req, res) => {
    const { leTodo } = req.body
    req.session.todos = req.session.todos.filter((todo, key) => key !== leTodo);

    return res.send('ok')
});

router.post('/logout', (req, res) => {
    req.session.login = ''
    return res.send('ok')
});

module.exports = router;