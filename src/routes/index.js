const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/crearDieta', isLoggedIn, (req, res) => {
    res.render('links/crearDieta');
});

router.post('/crearDieta', isLoggedIn, async (req, res) => {
    console.log(req.body);
    const { firstname } = req.body;
    const newLink = {
        id_dieta: req.user.id, // Asegúrate de que este es el valor correcto para 'id_dieta'
        firstname,
        user_dieta: req.user.id
    };
    await pool.query('INSERT INTO Dieta SET ? ON DUPLICATE KEY UPDATE ?', [newLink, newLink]);
    res.redirect('/dieta');
});

router.get('/dieta', isLoggedIn, async (req, res) => {
    const id = req.user.id;
    const links = await pool.query('SELECT firstname FROM Dieta WHERE id_dieta = ?', id);
    res.render('links/dieta', {link: links[0]});
});

router.get('/crearRutina', isLoggedIn, (req, res) => {
    res.render('links/crearDieta');
});



module.exports = router;