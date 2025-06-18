const palavras = [
    "COMPUTADOR", "PROGRAMACAO", "JAVASCRIPT", "DESENVOLVIMENTO",
    "NAVEGADOR", "ALGORITMO", "TECLADO", "MONITOR", "MOUSE",
    "INTERNET", "WEBSITE", "FRONTEND", "BACKEND", "DATABASE",
    "SERVIDOR", "CLIENTE", "CODIGO", "DEBUGEAR", "OTIMIZAR",
    "FRAMEWORK", "BIBLIOTECA", "REPOSITORIO", "VERSAO", "DEPLOY"
];

let palavraSecreta = '';
let letrasCorretas = [];
let letrasErradas = [];
let tentativasRestantes = 9; // Cabeça, corpo, 2 braços, 2 pernas, poste, trave, corda

const palavraDisplay = document.getElementById('palavraDisplay');
const letrasErradasDisplay = document.getElementById('letrasErradasDisplay');
const tecladoDiv = document.querySelector('.teclado');
const mensagemDisplay = document.getElementById('mensagem');
const reiniciarBtn = document.getElementById('reiniciarBtn');

const partesForca = [
    document.getElementById('poste'),
    document.getElementById('trave'),
    document.getElementById('corda'),
    document.getElementById('cabeca'),
    document.getElementById('corpo'),
    document.getElementById('braco-e'),
    document.getElementById('braco-d'),
    document.getElementById('perna-e'),
    document.getElementById('perna-d')
];

// Função para escolher uma palavra aleatória
function escolherPalavra() {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
}

// Função para inicializar o jogo
function iniciarJogo() {
    letrasCorretas = [];
    letrasErradas = [];
    tentativasRestantes = 9;
    mensagemDisplay.textContent = '';
    reiniciarBtn.style.display = 'none';

    // Esconder todas as partes da forca
    partesForca.forEach(parte => parte.style.display = 'none');

    escolherPalavra();
    exibirPalavra();
    exibirLetrasErradas();
    gerarTeclado();
}

// Função para exibir a palavra com underlines e letras corretas
function exibirPalavra() {
    palavraDisplay.textContent = palavraSecreta
        .split('')
        .map(letra => (letrasCorretas.includes(letra) ? letra : '_'))
        .join(' ');
}

// Função para exibir as letras erradas
function exibirLetrasErradas() {
    letrasErradasDisplay.textContent = letrasErradas.join(', ');
}

// Função para gerar o teclado virtual
function gerarTeclado() {
    tecladoDiv.innerHTML = ''; // Limpa o teclado anterior
    for (let i = 65; i <= 90; i++) { // Letras de A a Z (ASCII)
        const letra = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letra;
        button.addEventListener('click', () => lidarChute(letra));
        tecladoDiv.appendChild(button);
    }
}

// Função para exibir a parte da forca
function desenharForca() {
    const parteParaExibir = partesForca[9 - tentativasRestantes -1]; // Calcula qual parte exibir
    if (parteParaExibir) {
        parteParaExibir.style.display = 'block';
    }
}

// Função para lidar com o chute do jogador
function lidarChute(letraChutada) {
    // Desabilitar o botão da letra chutada
    Array.from(tecladoDiv.children).forEach(button => {
        if (button.textContent === letraChutada) {
            button.disabled = true;
        }
    });

    if (palavraSecreta.includes(letraChutada)) {
        // Letra correta
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letraChutada) {
                letrasCorretas.push(letraChutada);
            }
        }
    } else {
        // Letra errada
        if (!letrasErradas.includes(letraChutada)) {
            letrasErradas.push(letraChutada);
            tentativasRestantes--;
            desenharForca();
        }
    }

    exibirPalavra();
    exibirLetrasErradas();
    verificarFimDeJogo();
}

// Função para verificar se o jogo terminou
function verificarFimDeJogo() {
    // Verifica vitória
    const palavraAtual = palavraDisplay.textContent.split(' ').join('');
    if (palavraAtual === palavraSecreta) {
        mensagemDisplay.textContent = 'Parabéns! Você venceu!';
        mensagemDisplay.style.color = 'green';
        desabilitarTeclado();
        reiniciarBtn.style.display = 'block';
        return;
    }

    // Verifica derrota
    if (tentativasRestantes <= 0) {
        mensagemDisplay.textContent = `Você perdeu! A palavra era: ${palavraSecreta}`;
        mensagemDisplay.style.color = 'red';
        desabilitarTeclado();
        reiniciarBtn.style.display = 'block';
        return;
    }
}

// Função para desabilitar todos os botões do teclado
function desabilitarTeclado() {
    Array.from(tecladoDiv.children).forEach(button => {
        button.disabled = true;
    });
}

// Event listener para o botão de reiniciar
reiniciarBtn.addEventListener('click', iniciarJogo);

// Iniciar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', iniciarJogo);