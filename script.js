

// Seleciona o elemento header
const header = document.querySelector("header");

// Adiciona um listener para o evento "scroll" da janela
window.addEventListener("scroll", () => {
  // Verifica a posição de rolagem da página
  if (window.scrollY > 0) {
    // Se a posição de rolagem for maior que zero, adiciona a classe "scrolled" ao elemento "header"
    header.classList.add("scrolled");
  } else {
    // Caso contrário, remove a classe "scrolled"
    header.classList.remove("scrolled");
  }
});


// nessa linha chamamos o id que foi definido na tag <strong> no doc html
const textDisplay = document.getElementById('efeito')
// nessa linha são definidas as tres frases que serão animadas
const phrases = ['Henrique Reis']
let i = 0
let j = 0 
let currentPhrase = []
let isDeleting = false
let isEnd = false

function loop () {
  isEnd = false
  textDisplay.innerHTML = currentPhrase.join('')

  if (i < phrases.length) {

    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j])
      j++
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if(isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j])
      j--
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (j == phrases[i].length) {
      isEnd = true
      isDeleting = true
    }

    if (isDeleting && j === 0) {
      currentPhrase = []
      isDeleting = false
      i++
      if (i === phrases.length) {
        i = 0
      }
    }
  }
  const spedUp = Math.random() * (80 -50) + 50
  const normalSpeed = Math.random() * (300 -200) + 200
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()

function getProjects(){
  const urlGitHub = 'https://api.github.com/users/Kraven321/repos'
  var loadingElement = document.getElementById('loading')

  fetch(urlGitHub,{
      method: 'GET',
  })
      .then((response) => response.json())
      .then((response) => {
          console.log(response)
          showProjects(response)
          loadingElement.style.display = 'none'
      })
      .catch((e) => {
          console.log(`Error -> ${e}`)
      })
}

function showProjects(data){
  var listElement = document.getElementById('my-projects-list')
  for(let i = 0; i < data.length; i++)
  {
      let div = document.createElement("div")
      let a = document.createElement("a")
      a.href = data[i]['clone_url']
      a.target = '_blank'
      a.title = data[i]['description']
      let linkText = document.createTextNode(data[i]['name']);
      a.appendChild(linkText);
      div.appendChild(a)
      listElement.appendChild(div)
  }
}

getProjects()