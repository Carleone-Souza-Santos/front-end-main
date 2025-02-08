import * as Noticias from '../models/newModels.js';

// Controlador para obter todas as notícias
export const getNoticias = async (req, res) => {
  try {
    const noticias = await Noticias.getAll();
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notícias', error: error.message });
  }
};

// Controlador para criar uma nova notícia
export const createNoticia = async (req, res) => {
  const { nome, descricao, imagem } = req.body;

  if (!nome || !descricao || !imagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const noticia = await Noticias.create({ nome, descricao, imagem });
    res.status(201).json(noticia);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar notícia', error: error.message });
  }
};

// Controlador para remover uma notícia pelo ID
export const removerNoticia = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID da notícia é obrigatório' });
  }

  try {
    const result = await Noticias.remove(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover notícia', error: error.message });
  }
};
