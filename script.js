const html = document.querySelector('html'); //criando uma variavel que recebo a tag html
const focoBt =  document.querySelector('.app__card-button--foco'); //criando uma variavel constante que recebe a classe button - foco
const curtoBt = document.querySelector('.app__card-button--curto'); //criando uma variavel constante que recebe a classe button - curto
const longoBt = document.querySelector('.app__card-button--longo');//criando uma variavel constante que recebe a classe button - longo
const banner = document.querySelector('.app__image'); //criando uma variavel que recebe a classe do banner
const titulo = document.querySelector('.app__title'); //criando uma variavel que recebe a classe do titulo h1
const butoes = document.querySelectorAll('.app__card-button');  //criado um array com todos os botões
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3') //criando um objeto audio
const startPauseBt = document.querySelector('#start-pause'); //criando uma variavel que recebe o id star-pause
const play = new Audio('/sons/play.wav') //vaariavel que  chama o som de tocar
const pause = new Audio('/sons/pause.mp3')
const tempoEsgotado = new Audio ('/sons/beep.mp3')
const iconePause = document.querySelector('.app__card-primary-butto-icon') //variavel para mudar o icone do botão 
const iconeInicia = document.querySelector('.app__card-primary-butto-icon')
const on = document.querySelector('#on') //variavel para mudar o texto do botão 
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500; //variavel para controlar o tempo
let intervaloId = null; //variavel para o intevalo na hora de diminuir
musica.loop = true; //mantem a musica em loop


musicaFocoInput.addEventListener('change',() => { //passando uma funcao anonima
    if(musica.paused){ //paused é uma propriedade do objeto audio
        musica.play() //play é um metodo da propriedade audio
    }else{
        musica.pause()//pause é um metodo da propriedade audio
    }

})

focoBt.addEventListener('click', () => { //passando uma funcao anonima adicionar um evento 
    tempoDecorridoEmSegundos = 1500; //alterando o tempo 
    alterarContexto('foco'); //chamando a função e passando como parametro o foco que vai alterar o fundo e a imagem
    focoBt.classList.add('active'); //adicionando a classe active
    
})

curtoBt.addEventListener('click', () => { //passando uma funcao anonima adicionando evento ao clicar no botão descanso curto
    tempoDecorridoEmSegundos = 300; //alterando o tempo 
    alterarContexto('descanso-curto');//chamando a funcao 
    curtoBt.classList.add('active');//adicionando a classe active
})

longoBt.addEventListener('click', () =>{ //passando uma funcao anonima
    tempoDecorridoEmSegundos = 900; //alterando o tempo 
    alterarContexto('descanso-longo');//
    longoBt.classList.add('active');//adicionando a classe active
})


//obs: isso só é possivel pq as  imagens e a estilização do fundo estão com o nome igual
function alterarContexto(contexto){ //funcao para alterar o fundo e o banner 
    mostrarTempo() //chamando a função mostrar tempo
    butoes.forEach(function (contexto){ //pegando todas as classes passadas para a variavel butoes e chamando uma funcao callback passando o contexto
        contexto.classList.remove('active') //removendo a class active dos botoes
    })
    html.setAttribute('data-contexto', contexto) //passando para o background a varivel contexto
    banner.setAttribute('src', `/imagens/${contexto}.png`); //passando para o banner a imagem correspondente ao contexto
    
    switch(contexto){ //case para alterar o texto para cada caso
        case 'foco': //caso contexto == foco
            titulo.innerHTML = `Otimize sua produtividade<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>` //altera o h1 e a o texto entre o strong
        break; //break para parar

        case 'descanso-curto':  //caso contexto == descanso curto vamos alterar os textos
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
        break;
        
        case 'descanso-longo': //caso contexto == descanso longo vamos alterar os textos
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default: //se não encontrar nada utiliza o break
            break;
  
    }
}

const contagemRegressiva = () => { //criando uma funcao para a contagem regressiva
    if(tempoDecorridoEmSegundos <= 0){ //verificando se o tempo decorrido em segundos é menor ou igual a zero, para não criar um loop
        zerar() //se for menor ou igual a zero, chama a função para zerar 
        tempoEsgotado.play() //chamando um audio para quando o tempos e esgote
        alert('Tempo Finalizado!') //e da um alert na tela informando que o tempo acabou
        tempoEsgotado.pause() //pausando quando clicar no alert
        return 
    }
    tempoDecorridoEmSegundos -= 1; //diminuindo em 1 segundo 
    //console.log('Temporizado: ' + tempoDecorridoEmSegundos); //verificando no console se está dando certo
    mostrarTempo() //mostrando o tempo atual na interface

}

startPauseBt.addEventListener('click', iniciarOuPausar); //adicionando um evento de click na funcao iniciar

function iniciarOuPausar(){ //funcao para iniciar o cronometro
    if(intervaloId){ //verifica se tem algum valor dentro da variavel intevaloId
        zerar() //se possui ela pausa
        pause.play() //adicionando audio quando se pausa o jogo
        iconePause.setAttribute('src', '/imagens/play_arrow.png')
        on.innerHTML = `Começar`
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000) //se não possuir ela vai iniciar o cronometro
    iconeInicia.setAttribute('src', '/imagens/pause.png')
    on.innerHTML = `Pausar`
    play.play() //adicionando audio quando inicia o jogo
    

}

function zerar(){ //funcao para zerar  o cronometro
    clearInterval(intervaloId) //utilizando a funcao clearIntervalo e passado a variavel intervaloId como parametro
    intervaloId = null; //intervalo recebe nulo
}

function mostrarTempo(){ //criando uma função para mostrar o tempo na tela
    const tempo = new Date(tempoDecorridoEmSegundos * 1000) //instanciando um novo objeto data
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'}) //formatando o tempo para aparecer os minutos e segundos
    tempoNaTela.innerHTML = `${tempoFormatado}` //colocando os valores do minuto e dos segundos na div tempo
}

mostrarTempo() //a funcao sempre será chamada




