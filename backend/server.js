import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Routes from './routes/newRoutes.js';

dotenv.config();

// Verifica se todas as variáveis de ambiente estão configuradas corretamente
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME
) {
  console.error('Erro: Variáveis de ambiente não configuradas corretamente.');
  process.exit(1);
}

const app = express();

// Middleware para registrar logs de requisições
app.use(morgan('dev'));

// Configuração de CORS para permitir qualquer origem TEMPORARIAMENTE
app.use(
  cors({
    origin: '*',
    methods: 'GET, POST, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Define as rotas da API
app.use('/api', Routes);

// Middleware para tratamento de erros internos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

// Define a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
