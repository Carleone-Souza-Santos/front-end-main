import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const connectDB = async () => {
  try {
    // Criação do pool de conexões com tempo limite na conexão
    const connection = await mysql.createPool({
      host: process.env.DB_HOST, // Endereço do banco de dados
      user: process.env.DB_USER, // Usuário do banco de dados
      password: process.env.DB_PASS, // Senha do banco de dados
      database: process.env.DB_NAME, // Nome do banco de dados
      waitForConnections: true, // Espera por conexões se o número máximo for atingido
      connectionLimit: 5, // Limite máximo de conexões simultâneas
      queueLimit: 0, // Limite da fila de requisições
      connectTimeout: 10000, // Tempo máximo para tentar se conectar (em milissegundos)
    });

    // Logar que a conexão foi estabelecida com sucesso
    console.log('Conectado ao Banco de Dados');
    return connection;
  } catch (error) {
    // Caso ocorra algum erro ao conectar, imprimir o erro no console e finalizar o processo
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Finaliza o processo com código 1 (erro)
  }
};

export default connectDB;
