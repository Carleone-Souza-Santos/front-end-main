import connectDB from '../config/database.js';

// Obtém todas as notícias do banco de dados
export const getAll = async () => {
  const connection = await connectDB();
  try {
    const [rows] = await connection.execute("SELECT * FROM noticias");
    return rows;
  } finally {
    connection.end();
  }
};

// Insere uma nova notícia no banco de dados
export const create = async (noticia) => {
  const { nome, descricao, imagem } = noticia;

  // Verifica se os campos foram preenchidos corretamente
  if (!nome || !descricao || !imagem) {
    throw new Error('Todos os campos são obrigatórios');
  }

  const connection = await connectDB();
  try {
    const sql = "INSERT INTO noticias (nome, descricao, imagem) VALUES (?, ?, ?)";
    const [result] = await connection.execute(sql, [nome, descricao, imagem]);
    return { id: result.insertId, nome, descricao, imagem };
  } finally {
    connection.end();
  }
};

// Remove uma notícia pelo ID
export const remove = async (id) => {
  const connection = await connectDB();
  try {
    const [result] = await connection.execute("DELETE FROM noticias WHERE id = ?", [id]);

    // Verifica se alguma notícia foi realmente removida
    if (result.affectedRows === 0) {
      throw new Error('Nenhuma notícia encontrada para deletar');
    }
    return { message: 'Notícia deletada com sucesso!' };
  } finally {
    connection.end();
  }
};
