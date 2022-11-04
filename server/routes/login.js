const express = require('express');
const router = express.Router();

const { getAuthenticated } = require("../functions/func");

// Get Login
router.get('/', (req, res) => {
    const datas = (req.cookies["access-token"]) ? getAuthenticated(req.cookies["access-token"]).username : ''
    return res.send(datas)
});

module.exports = router;