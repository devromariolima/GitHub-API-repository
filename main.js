const repositories = document.querySelector('.content-main');

function getApiGitHub(){
  let User = document.getElementById("User").value;

  console.log("User", User);
  
  fetch(`https://api.github.com/users/${User}/repos`)
  .then(async res => {
  if ( !res.ok){
    toggleDiv(), setTimeout(() => { 
      hideDiv()
    }, 3000);
      throw new Error(res.status);
    
  }

  let data = await res.json();

  if( !data || data.length <= 0 ){
    toggleDivRepositories(), setTimeout(() => {
      hideDivRepositories()
    }, 3000);
    return;
  }

  data.map(item => {
    console.log("Recebendo", item.language);
    if(item?.language?.length > 0){
      let project = document.createElement('div');

      project.innerHTML = 
      `
    <div class="project">
      <div>
        <h4 class="title">${item.name}</h4>
         <span class="date-create">${Intl.DateTimeFormat('pt-br').format (new Date(item.created_at)) }</span>
      </div>
   <div>
      <a id="url" href="${item.html_url}" target="_blank">${item.html_url}</a>
      <span class="language"><span class="circle"></span>${item.language}</span>
    </div>
  </div> 
  `
    repositories.appendChild(project);  
    }
  });

  } )
}

function limpar (){
  const  list = document.getElementById("limpar");
  list.replaceChildren();
}

  const container = document.getElementById('limpar');
  const btn = document.getElementById('btn');

  btn.addEventListener('click',function handleClick(){
    container.replaceChildren();
  });


//função para usuario não encontrado
function toggleDiv ()  {
  var show = document.getElementById("alert");
  show.style.display = "block";
  
    }
  
    function hideDiv ()  {
      var hide = document.getElementById("alert");
      hide.style.display = "none";
    
        }


    //função para repositorios não encontrado
function toggleDivRepositories ()  {
  var show = document.getElementById("alert-repositories");
  show.style.display = "block";
  
    }
  
    function hideDivRepositories ()  {
      var hide = document.getElementById("alert-repositories");
      hide.style.display = "none";
    
        }




