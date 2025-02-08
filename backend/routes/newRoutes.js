import express from 'express';
import * as NoticiasController from '../controllers/newsController.js';

const router = express.Router();

// Rota para listar todas as notícias
router.get('/noticias', NoticiasController.getNoticias);

// Rota para criar uma nova notícia
router.post('/noticias', NoticiasController.createNoticia);

// Rota para deletar uma notícia por ID
router.delete('/noticias/:id', NoticiasController.removerNoticia);

export default router;
