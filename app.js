window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const ball = document.getElementById('ball');
    const canvasWidth = 1000;
    const canvasHeight = 600;
    const playerWidth = 4;
    const playerHeight = 100;
    const ballWidth = 50;
    const ballHeight = 50;
    const heartImage = document.getElementById('heart');
    let ballCoordsY = canvasHeight / 2 ;
    let ballCoordsX = canvasWidth / 2 - 25;
    let leftCoorsY = 300;
    let rightCoorsY = 300;
    let ballMovingState = "toLeft";
    let movingBallInterval;
    let ballSpeed = 100;
    let score = 0;
    let health = 3;
    const playerSpeed = 5;
    window.addEventListener('keydown', (e) => {
        if (e.key === "w" && leftCoorsY > 0) {
            leftCoorsY -= playerSpeed;
            console.log(leftCoorsY);
        } else if (e.key === "s" && leftCoorsY < 500) {
            leftCoorsY += playerSpeed;
            console.log(leftCoorsY);
        }

        if (e.key === "ArrowUp"  && rightCoorsY > 0) {
            rightCoorsY -= playerSpeed;
        } else if (e.key === "ArrowDown" && rightCoorsY < 500) {
            rightCoorsY += playerSpeed;
        }
    })


    function moveTheball () {
        if (ballMovingState === "toLeft") {
            ballCoordsX -= 5;
            ballSpeed++;

        }
        if (ballMovingState === "toRight") {
            ballCoordsX += 5;
            ballSpeed++;
        }
        collisionChecker();
    }
    function collisionChecker() {
        if (ballCoordsX > 970 - ballWidth && ballCoordsY >= rightCoorsY + 20 && rightCoorsY <= leftCoorsY + playerHeight - 40) {
            ballMovingState = "toLeft"; 
            score++;
        } 
        if (ballCoordsX < 20 + playerWidth && ballCoordsY >= leftCoorsY + 20 && ballCoordsY <= leftCoorsY + playerHeight - 40) {
            ballMovingState = "toRight"; 
            score++;
        }   
        
        if (ballCoordsX < 0) {
            health--;
            ballCoordsX = canvasWidth / 2 - 25;
        } else if (ballCoordsX > canvasWidth) {
            health--;
            ballCoordsX = canvasWidth / 2 - 25;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Score: ", 10, 40);
        ctx.fillText("Health: ", 10, 70);
        if (health === 3) { 
        ctx.drawImage(heartImage, 110, 48, 30, 30);
        ctx.drawImage(heartImage, 140, 48, 30, 30);
        ctx.drawImage(heartImage, 170, 48, 30, 30);
        }   else if (health === 2) {
        ctx.drawImage(heartImage, 110, 48, 30, 30);
        ctx.drawImage(heartImage, 140, 48, 30, 30);
        }   else if (health === 1) {
        ctx.drawImage(heartImage, 110, 48, 30, 30);
        }
        
        ctx.fillText(score, 100, 42);
        ctx.fillRect(20, leftCoorsY, playerWidth, playerHeight);
        ctx.fillRect(970, rightCoorsY, playerWidth, playerHeight);
        ctx.fillRect(canvasWidth/2, 50, 1, 500);
        ctx.drawImage(ball, ballCoordsX, ballCoordsY, ballWidth, ballHeight);
        requestAnimationFrame(animate);
    }
    animate();
    movingBallInterval = setInterval(moveTheball, ballSpeed);
})