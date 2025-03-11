const repositories = document.querySelector('.content-main');
const loading = document.getElementById('loading');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1; // Página atual
const itemsPerPage = 10; // Itens por página
let allRepositories = []; // Armazena todos os repositórios carregados

function getApiGitHub() {
  let User = document.getElementById("User").value;

  console.log("User", User);

  // Exibe o indicador de carregamento
  loading.style.display = 'block';

  fetch(`https://api.github.com/users/${User}/repos`)
    .then(async res => {
      if (!res.ok) {
        toggleDiv();
        setTimeout(() => {
          hideDiv();
        }, 3000);
        throw new Error(res.status);
      }

      let data = await res.json();

      if (!data || data.length <= 0) {
        toggleDivRepositories();
        setTimeout(() => {
          hideDivRepositories();
        }, 3000);
        return;
      }

      // Armazena todos os repositórios
      allRepositories = data;

      // Exibe a primeira página
      displayRepositories(currentPage);
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
    })
    .finally(() => {
      // Oculta o indicador de carregamento
      loading.style.display = 'none';
    });
}

function displayRepositories(page) {
  // Limpa o conteúdo anterior
  repositories.innerHTML = '';

  // Calcula o índice inicial e final dos itens da página
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtém os repositórios da página atual
  const pageRepositories = allRepositories.slice(startIndex, endIndex);

  // Exibe os repositórios
  pageRepositories.forEach(item => {
    if (item?.language?.length > 0) {
      let project = document.createElement('div');

      project.innerHTML =
        `
  <div class="project">
    <div>
      <h4 class="title">${item.name}</h4>
       <span class="date-create">${Intl.DateTimeFormat('pt-br').format(new Date(item.created_at))}</span>
    </div>
 <div>
    <a id="url" href="${item.html_url}" target="_blank">${item.html_url}</a>
    <span class="language"><span class="circle"></span>${item.language}</span>
  </div>
</div> 
`;
      repositories.appendChild(project);
    }
  });

  // Exibe o menu de paginação
  document.querySelector('.pagination').style.display = 'block';

  // Atualiza os controles de paginação
  updatePaginationControls();
}

// Função para atualizar os controles de paginação
function updatePaginationControls() {
  // Atualiza o texto da página atual
  pageInfo.textContent = `Página ${currentPage}`;

  // Habilita/desabilita os botões de "Anterior" e "Próximo"
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === Math.ceil(allRepositories.length / itemsPerPage);
}

// Evento para a página anterior
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayRepositories(currentPage);
  }
});

// Evento para a próxima página
nextPageButton.addEventListener('click', () => {
  if (currentPage < Math.ceil(allRepositories.length / itemsPerPage)) {
    currentPage++;
    displayRepositories(currentPage);
  }
});

// Funções de tratamento de erros (mantidas do seu código original)
function toggleDiv() {
  var show = document.getElementById("alert");
  show.style.display = "block";
}

function hideDiv() {
  var hide = document.getElementById("alert");
  hide.style.display = "none";
}

function toggleDivRepositories() {
  var show = document.getElementById("alert-repositories");
  show.style.display = "block";
}

function hideDivRepositories() {
  var hide = document.getElementById("alert-repositories");
  hide.style.display = "none";
}