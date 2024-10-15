var $ = document.querySelector.bind( document )

let btnStart      = $('.start')
let iconeBtnStart = btnStart.querySelector('i')
let btnReset      = $('.reset')

let elmSegundos      = $('.segundos')
let elmMinutos       = $('.minutos')
let elmMilissegundos = $('.milissegundos')

let milissegundos = 0

let timer // Timer de contagem
let estaContando = false

function pausarContagem(){
         clearInterval(timer) // Para o timer
}

function resetar(){
   milissegundos = 0 // Zera a contagem
   estaContando = false
   
   //Substitui o icone de pausar, pelo ícone de iniciar
   iconeBtnStart.classList.remove('bx-pause')
   iconeBtnStart.classList.add('bx-play')
   
   pausarContagem()
   atualizarPainel()
   beep()
}

function iniciarContagem() {
   timer = setInterval(()=>{
       milissegundos++
       atualizarPainel()
   }, 10)
}

var addZeroAEsquerda = ( num )=> num.toString().padStart(2, '0') // Converte o número em String e completa com zero as unidades

function atualizarPainel(){
    let tempo = converterTempo() // Converte os milissegundos
       
        // Escreve o tempo nos respectivos elementos HTML
        elmMinutos.innerHTML = tempo.minutos
        elmSegundos.innerHTML = tempo.segundos
        elmMilissegundos.innerHTML = tempo.milissegundos
}

function converterTempo(){
  let ms  = Math.floor(milissegundos%100) // Converte os milissegundos em duas casas decimais.
  let seg = Math.floor((milissegundos/100)%60) // Converte os milissegundos em segundos.
  let min = Math.floor((milissegundos/6000)%60) // Converte os milissegundos em minutos.
  
  let tempo = {
     milissegundos: addZeroAEsquerda(ms),
     segundos:      addZeroAEsquerda(seg),
     minutos:       addZeroAEsquerda(min)
  }
  return tempo
}

converterTempo()

btnStart.onclick = ()=>{
     let icone = btnStart.querySelector('i')
     
     if( icone.classList.contains('bx-play')){
       iniciarContagem()
       beep()
      
       //Substitui o icone de inciar, pelo ícone de pausar
       icone.classList.remove('bx-play')
       icone.classList.add('bx-pause')
     }else{
       pausarContagem()
       beep()
       
       //Substitui o icone de pausar, pelo ícone de iniciar
       icone.classList.remove('bx-pause')
       icone.classList.add('bx-play')
     }
}

btnReset.onclick = ()=> resetar()


let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  
  
function beep(){
     let oscilador = audioCtx.createOscillator()
         oscilador.connect(audioCtx.destination)
         oscilador.type = 'square'
         oscilador.frequency.setValueAtTime(4000, audioCtx.currentTime)
         oscilador.start()
         oscilador.stop(audioCtx.currentTime + .04)
}


// Abertura do app

let telaDeAbertura = document.querySelector('.abertura')
    telaDeAbertura.addEventListener('animationend', ()=>{
           telaDeAbertura.remove()
    })