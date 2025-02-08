const API_Blog = 'http://localhost:5000/api/noticias';

// Carregar as notícias do backend
async function carregarNoticias() {
  try {
    const res = await fetch(API_Blog);
    if (!res.ok)
      throw new Error(`Erro ao carregar notícias: ${res.statusText}`);

    const noticias = await res.json();
    console.log(noticias);

    let container = document.getElementById('listaNoticias');
    if (!container) {
      console.error("Erro: Elemento 'listaNoticias' não encontrado.");
      return;
    }

    container.innerHTML = noticias
      .map(
        (noticia) => `
      <div class="col s12 m3">
        <div class="card">
          <div class="card-image">
            <img src="${noticia.imagem}" alt="${noticia.nome}">
          </div>
          <div class="card-content">
            <span class="card-title">${noticia.nome}</span>
            <p>${noticia.descricao}</p>
          </div>
          <div class="card-action">
            <button class="btn red" onclick="removerNoticias(${noticia.id})">Remover</button>
          </div>
        </div>
      </div>
    `,
      )
      .join('');
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar as notícias!');
    // Função principal para verificar ambos os status
    const verificarStatusConexoes = async () => {
      const internetStatus = verificarConexaoInternet();
      const dbStatus = await verificarConexaoBD();
      mostrarStatusBar(internetStatus, dbStatus);
    };

    // Verificando os status ao carregar a página
    window.addEventListener('load', verificarStatusConexoes);
  }
}

// Adicionar uma nova notícia
async function adicionarNoticias() {
  const nomeInput = document.getElementById('nomeNoticia');
  const descricaoInput = document.getElementById('descricaoNoticia');
  const imagemInput = document.getElementById('imagemNoticia');

  if (!nomeInput || !descricaoInput || !imagemInput) {
    console.error('Erro: Um dos campos do formulário não foi encontrado.');
    return;
  }

  const nome = nomeInput.value.trim();
  const descricao = descricaoInput.value.trim();
  const imagem = imagemInput.value.trim();

  if (!nome || !descricao || !imagem) {
    alert('Todos os campos devem ser preenchidos!');
    return;
  }

  const bodyData = { nome, descricao, imagem };

  try {
    const res = await fetch(API_Blog, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok)
      throw new Error(`Erro ao adicionar notícia: ${res.statusText}`);

    // Limpar campos após adicionar
    nomeInput.value = '';
    descricaoInput.value = '';
    imagemInput.value = '';

    carregarNoticias();
    alert('Notícia adicionada com sucesso!');
  } catch (error) {
    console.error(error);
    alert('Erro ao adicionar a notícia!');
  }
}

// Remover uma notícia
async function removerNoticias(id) {
  try {
    const res = await fetch(`${API_Blog}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Erro ao remover notícia: ${res.statusText}`);

    carregarNoticias();
    alert('Notícia removida com sucesso!');
  } catch (error) {
    console.error(error);
    alert('Erro ao remover a notícia!');
  }
}

// Garantir que o script só execute após o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado. Iniciando carregamento de notícias...');
  carregarNoticias();
});
