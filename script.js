let jogadorAtual = "X";
let tabuleiro = Array(9).fill("");

let numeroJogadas = 0;
let numeroJogadasX = 0;
let numeroJogadasO = 0;

let tempoJogado;
let vencedor;
let ehVelha = false;

let pontosX = 0;
let pontosO = 0;

let melhorTempoSegundos;
let melhorTempoJogador;

function alternarJogador() {
  switch (jogadorAtual) {
    case "X":
      jogadorAtual = "O";
      break;
    case "O":
      jogadorAtual = "X";
      break;
  }
}

function escolherCasa(event, index) {
  if (vencedor || ehVelha) {
    alert("Reinicie o jogo para continuar");
    return;
  }

  if (tabuleiro[index] !== "") {
    alert("Casa já escolhida");
    return;
  }

  if (!tempoJogado) {
    tempoJogado = new Date();
  }

  exibirJogada(event);
  atribuirNumeroJogadas();

  tabuleiro[index] = jogadorAtual;
  const ganhador = verificarGanhador();

  if (ganhador) {
    atribuirVencedor(ganhador);
    return;
  }

  if (verificarVelha()) {
    exibirVencedorOuVelha();
    return;
  }
  
  alternarJogador();
  exibirJogador();
}

function calcularMelhorTempo() {
  const agora = new Date()

  const segundos = (agora.getTime() - tempoJogado.getTime()) / 1000;

  if (!melhorTempoSegundos || segundos < melhorTempoSegundos) {
    melhorTempoSegundos = segundos;
    melhorTempoJogador = vencedor;
  }
}

function exibirJogada(event) {
  const casa = event.target

  casa.classList.add("marcado");
  casa.innerText = jogadorAtual;
}

function exibirJogador() {
  const elementoJogador = document.getElementById("sJogadorDaVez");  
  elementoJogador.innerText = jogadorAtual;
}

function exibirPlacar() {
  const elementoPontosX = document.getElementById("nPontosX");  
  const elementoPontosO = document.getElementById("nPontosO");

  elementoPontosX.innerText = pontosX;
  elementoPontosO.innerText = pontosO;

  if (melhorTempoSegundos) {
    const elementoSegundos = document.getElementById("sMelhorTempoSegundos");  
    const elementoJogador = document.getElementById("sMelhorTempoJogador");
    const melhorTempoDate = new Date(1000 * melhorTempoSegundos);

    elementoSegundos.innerText = melhorTempoDate.toISOString().substr(11, 8)
    elementoJogador.innerText = melhorTempoJogador;
  }
}

function exibirVencedorOuVelha() {
  const elementoVencedor = document.getElementById("sVencedor");
  if (vencedor) {
    elementoVencedor.innerText = "Parabéns jogador " + jogadorAtual + "!"
  } else {
    elementoVencedor.innerText = "Velha! Ninguém ganhou"
  }
}

function atribuirVencedor(ganhador) {
  vencedor = ganhador;
  atribuirPontos();

  calcularMelhorTempo();

  exibirVencedorOuVelha();
  exibirPlacar();
}

function atribuirPontos() {
  let pontos = 1;
  let bonus = 0;
  
  switch (vencedor) {
    case "X": {
      bonus = numeroJogadasX <= 4 ? 1 : 0;

      pontosX += pontos + bonus;
      break;
    }
    case "O": {
      bonus = numeroJogadasO <= 4 ? 1 : 0;
  
      pontosO += pontos + bonus;
      break;
    }
  }
}

function atribuirNumeroJogadas() {
  numeroJogadas++;
  switch (jogadorAtual) {
    case "X":
      numeroJogadasX++;
      break;
    case "O":
      numeroJogadasO++;
      break;
  }
}

function verificarVelha() {
  if (numeroJogadas === 9 && !vencedor) {
    ehVelha = true;
    return true;
  }

  return false;
}

function verificarGanhador() {
  /**
   * // Linhas
   * 0, 1, 2,
   * 3, 4, 5,
   * 6, 7, 8,
   * // Colunas
   * 0, 3, 6,
   * 1, 4, 7,
   * 2, 5, 8,
   * // Diagonal
   * 0, 4, 8,
   * 2, 4, 6,
  */

  if (tabuleiro[0] && tabuleiro[0] === tabuleiro[1] && tabuleiro[0] === tabuleiro[2]) {
    return tabuleiro[0];
  } else if (tabuleiro[3] && tabuleiro[3] === tabuleiro[4] && tabuleiro[3] === tabuleiro[5]) {
    return tabuleiro[3];
  } else if (tabuleiro[6] && tabuleiro[6] === tabuleiro[7] && tabuleiro[6] === tabuleiro[8]) {
    return tabuleiro[6];
  } else if (tabuleiro[0] && tabuleiro[0] === tabuleiro[3] && tabuleiro[0] === tabuleiro[6]) {
    return tabuleiro[0];
  } else if (tabuleiro[1] && tabuleiro[1] === tabuleiro[4] && tabuleiro[1] === tabuleiro[7]) {
    return tabuleiro[1];
  } else if (tabuleiro[2] && tabuleiro[2] === tabuleiro[5] && tabuleiro[2] === tabuleiro[8]) {
    return tabuleiro[2];
  } else if (tabuleiro[0] && tabuleiro[0] === tabuleiro[4] && tabuleiro[0] === tabuleiro[8]) {
    return tabuleiro[0];
  } else if (tabuleiro[2] && tabuleiro[2] === tabuleiro[4] && tabuleiro[2] === tabuleiro[6]) {
    return tabuleiro[2];
  } else {
    return null;
  }
}

function reiniciar() {
  jogadorAtual = "X";
  tabuleiro = Array(9).fill("");

  numeroJogadas = 0;
  numeroJogadasX = 0;
  numeroJogadasO = 0;

  ehVelha = false;
  tempoJogado = null;
  vencedor = null;

  const tiles = document.getElementsByClassName("tile");

  for (const elementoTile of tiles) {
    elementoTile.classList.remove("marcado");
    elementoTile.innerText = "";
  }

  const elementoVencedor = document.getElementById("sVencedor");
  elementoVencedor.innerText = "";
}

