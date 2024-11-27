const canvas = document.getElementById('gameCanvas'); 
const ctx = canvas.getContext('2d'); 

//                                        VARIAVEIS DO JOGO                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const tileSize = 20; // Tamanho de cada célula do jogo
let snake = [{ x: 9, y: 10 }]; // Array de segmentos da cobra 1
let snake2 = [{ x: 23, y: 10 }]; // Array de segmentos da cobra 2
let dx = 0; // Direção horizontal da cobra 1
let dy = 0; // Direção vertical da cobra 1
let dx2 = 0; // Direção horizontal da cobra 2
let dy2 = 0; // Direção vertical da cobra 2
let score = 0; // Pontuação da cobra 1
let score2 = 0; // Pontuação da cobra 2
const food = { x: 9, y: 15 }; // Posição inicial da comida para a cobra 1
const food2 = { x: 23, y: 15 }; // Posição inicial da comida para a cobra 2
let gameOver = false; // Indica se o jogo acabou
let paused = false; // Indica se o jogo está pausado

////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Função para desenhar a cobra 1
function drawSnake() {
    ctx.fillStyle = '#00ff10'; 
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para desenhar a cobra 2
function drawSnake2() {
    ctx.fillStyle = '#0000ff';
    snake2.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para desenhar a comida para a cobra 1
function drawFood() {
    ctx.fillStyle = '#808080'; 
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para desenhar a comida para a cobra 2
function drawFood2() {
    ctx.fillStyle = '#808080'; 
    ctx.fillRect(food2.x * tileSize, food2.y * tileSize, tileSize, tileSize);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para mover a cobra 1
function moveSnake() {
    if (!paused) {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy }; // Próxima posição da cabeça da cobra 1
        snake.unshift(head); // Adiciona a nova posição da cabeça
        if (head.x === food.x && head.y === food.y) { // Verifica se a cobra 1 comeu a comida
            generateFood(); // Gera uma nova posição para a comida
            score += 50; // Incrementa a pontuação
            updateScore(); // Atualiza a pontuação na tela
        } else if (head.x === food2.x && head.y === food2.y){
            generateFood2()
            score += 50
            updateScore()
        }else {
            snake.pop(); // Remove o último segmento da cobra
        }

        
        if (checkCollision() || checkCollisionWithSnake(head, snake2)) { // Verifica colisão com as paredes ou com a outra cobra
            gameOver = true; // Define o jogo como acabado
            setTimeout(() => {
                displayGameOverMessage(2); // Exibe a mensagem de fim de jogo
            }, 1000);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para mover a cobra 2
function moveSnake2() {
    if (!paused) {
        const head2 = { x: snake2[0].x + dx2, y: snake2[0].y + dy2 }; // Próxima posição da cabeça da cobra 2
        snake2.unshift(head2); // Adiciona a nova posição da cabeça
        if (head2.x === food2.x && head2.y === food2.y) { // Verifica se a cobra 2 comeu a comida
            generateFood2(); // Gera uma nova posição para a comida
            score2 += 50; // Incrementa a pontuação
            updateScore2(); // Atualiza a pontuação na tela
        } else if (head2.x === food.x && head2.y === food.y) {
            generateFood()
            score2+= 50
            updateScore2()
        }else {
            snake2.pop(); // Remove o último segmento da cobra
        }
        if (checkCollision2() || checkCollisionWithSnake(head2, snake)) { // Verifica colisão com as paredes ou com a outra cobra
            gameOver = true; // Define o jogo como acabado
            setTimeout(() => {
                displayGameOverMessage(1); // Exibe o fim de jogo
            }, 1000);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Função para verificar colisão entre a cabeça de uma cobra e outra cobra
function checkCollisionWithSnake(head, otherSnake) {
    for (let i = 0; i < otherSnake.length; i++) {
        if (head.x === otherSnake[i].x && head.y === otherSnake[i].y) {
            return true;
        }
    }
    return false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para atualizar a pontuação da cobra 1 na tela
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para atualizar a pontuação da cobra 2 na tela
function updateScore2() {
    const scoreElement = document.getElementById('score2');
    scoreElement.textContent = score2;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para gerar uma nova posição para a comida da cobra 1
function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / tileSize);
    food.y = Math.floor(Math.random() * canvas.height / tileSize);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para gerar uma nova posição para a comida da cobra 2
function generateFood2() {
    food2.x = Math.floor(Math.random() * canvas.width / tileSize);
    food2.y = Math.floor(Math.random() * canvas.height / tileSize);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Função principal para atualizar o jogo
function update() {
    clearCanvas(); // Limpa o canvas
    drawFood(); // Desenha a comida da cobra 1
    drawFood2(); // Desenha a comida da cobra 2
    drawSnake(); // Desenha a cobra 1
    drawSnake2(); // Desenha a cobra 2
    moveSnake(); // Move a cobra 1
    moveSnake2(); // Move a cobra 2
    if (!gameOver) { 
        setTimeout(update, 100); // Aguarda tal numero e atualiza novamente
    } else {
        // Se o jogo acabou, exibe a mensagem de fim de jogo
        ctx.fillStyle = '#ffff';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Função para verificar colisões da cobra 1
function checkCollision() {
    const head = snake[0]; // Cabeça da cobra 1
    if (head.x === food.x && head.y === food.y) { // Verifica se a cobra 1 comeu a comida
        return true;
    }
    // Verifica se a cobra 1 colidiu com as paredes
    return head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Função para verificar colisões da cobra 2
function checkCollision2() {
    const head2 = snake2[0]; // Cabeça da cobra 2
    if (head2.x === food2.x && head2.y === food2.y) { // Verifica se a cobra 2 comeu a comida
        return true;
    }
    // Verifica se a cobra 2 colidiu com as paredes
    return head2.x < 0 || head2.x >= canvas.width / tileSize || head2.y < 0 || head2.y >= canvas.height / tileSize;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                              controladores                                              //

document.addEventListener('keydown', e => {
    if (!gameOver && !paused) {
        switch (e.key) {
            case 'w':
                if (dy === 0) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 's':
                if (dy === 0) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'a':
                if (dx === 0) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'd':
                if (dx === 0) {
                    dx = 1;
                    dy = 0;
                }
                break;
            case 'ArrowUp':
                if (dy2 === 0) {
                    dx2 = 0;
                    dy2 = -1;
                }
                break;
            case 'ArrowDown':
                if (dy2 === 0) {
                    dx2 = 0;
                    dy2 = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx2 === 0) {
                    dx2 = -1;
                    dy2 = 0;
                }
                break;
            case 'ArrowRight':
                if (dx2 === 0) {
                    dx2 = 1;
                    dy2 = 0;
                }
                break;
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                             Adiciona um evento de clique ao botão de pausa                                  //
const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', () => {
    paused = !paused; // Inverte o estado de pausa
    pauseButton.textContent = paused ? 'Resume' : 'Pause'; // Atualiza o texto do botão
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para exibir a mensagem de fim de jogo
function displayGameOverMessage(winner) {
    let message = `Cobra ${winner} venceu!`; // Mensagem de vitória
    alert(message); // Exibe um alerta com a mensagem
    location.reload(); // Recarrega a página
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função principal que inicia o jogo
function main() {
    update(); // Inicia o ciclo de atualização do jogo
}


main();

