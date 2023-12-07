const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const {getResponse} = require('../AI/brain');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/datos', isLoggedIn, async (req, res) => {
  res.render('links/datos');
});


router.get('/chat', isLoggedIn, async (req, res) => {
    try {
      const { id } = req.user;
  
      const [name] = await Promise.all([
        pool.query('SELECT fullname FROM users WHERE id = ?', id)
      ]);
      const fullname = name[0].fullname
      const user_res = await pool.query('SELECT * FROM User_Respuesta WHERE user_respuesta_creada = ?', id);
      const user_men = await pool.query('SELECT * FROM User_Mensaje WHERE user_Mensaje = ?', id);
  
      const mensajes = user_men.map(mensaje => mensaje.Mensaje);
      const respuestas = user_res.map(respuesta => respuesta.respuesta_generada);
  
      const data = {
        mensajes,
        respuestas
      };
  
      res.render('links/chat', {fullname, data });
    } catch (error) {
      res.redirect('/chat');
    }
  });
  

router.post('/chat', isLoggedIn, async (req, res) => {
    try {
      const { id } = req.user;
      const { prompt } = req.body;
  
      const newLink = {
        user_dieta: id,
        prompt: prompt,
      };
      const newLink2 = {
        user_Mensaje: id,
        Mensaje: prompt,
      };
  
      await pool.query('INSERT INTO Respuesta SET ? ON DUPLICATE KEY UPDATE ?', [newLink, newLink]);
      await pool.query('INSERT INTO User_Mensaje SET ? ON DUPLICATE KEY UPDATE ?', [newLink2, newLink2]);

      const { Respuesta: respuesta_generada } = await getResponse(prompt, 'Se breve con tu resouesta');
      
      const generateDiet = {
        user_respuesta_creada: id,
        respuesta_generada,
      };

      await pool.query('INSERT INTO user_respuesta SET ? ON DUPLICATE KEY UPDATE ?', [generateDiet, generateDiet]);
      
      res.redirect('/chat');
    } catch (error) {
        res.redirect('/chat');
    }
  });
  


router.get('/info', isLoggedIn, (req, res) => {
    res.render('links/info');
});

module.exports = router;
