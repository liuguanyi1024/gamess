const canvas = document.getElementById('snake-preview');
const ctx = canvas.getContext('2d');
let width, height;

// 加载背景图片（关键修改点）
const bgImage = new Image();
bgImage.src = 'assets/images/snake/snake-bg.png'; // 你的图片路径

// 配置参数
const config = {
    gridSize: 14,
    frameInterval: 200,
    maxLength: 4,
    colors: {
        snake: '#ffffff',  // 白色更显眼
        food: '#ffd700'    // 金色食物
    }
};

// 其余代码保持原样（以下代码片段请完整保留）
// -----------------------------------------------
let snake = [{x: 3, y: 3}];
let food = {x: 7, y: 5};
let direction = 'right';
let lastUpdate = 0;
let isAnimating = true;

function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

function spawnFood() {
    const gridX = Math.floor(width / config.gridSize);
    const gridY = Math.floor(height / config.gridSize);
    food = {
        x: Math.floor(Math.random() * (gridX - 2)) + 1,
        y: Math.floor(Math.random() * (gridY - 2)) + 1
    };
}

function draw() {
    // 绘制背景图片（关键修改点）
    if (bgImage.complete) {
        ctx.drawImage(bgImage, 0, 0, width, height);
    } else {
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(0, 0, width, height);
    }

    // 绘制蛇
    ctx.fillStyle = config.colors.snake;
    snake.forEach(segment => {
        ctx.beginPath();
        ctx.roundRect(
            segment.x * config.gridSize,
            segment.y * config.gridSize,
            config.gridSize - 2,
            config.gridSize - 2,
            4
        );
        ctx.fill();
    });

    // 绘制食物
    ctx.fillStyle = config.colors.food;
    ctx.beginPath();
    ctx.arc(
        food.x * config.gridSize + config.gridSize/2,
        food.y * config.gridSize + config.gridSize/2,
        config.gridSize/2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function update() {
    const head = {...snake[0]};
    const gridX = Math.floor(width / config.gridSize);
    const gridY = Math.floor(height / config.gridSize);
    
    if (direction === 'right') {
        if (head.x >= gridX - 2) direction = 'down';
        else head.x++;
    } else if (direction === 'down') {
        if (head.y >= gridY - 2) direction = 'left';
        else head.y++;
    } else if (direction === 'left') {
        if (head.x <= 1) direction = 'up';
        else head.x--;
    } else if (direction === 'up') {
        if (head.y <= 1) direction = 'right';
        else head.y--;
    }

    snake.unshift(head);
    if (snake.length > config.maxLength) snake.pop();

    if (head.x === food.x && head.y === food.y) {
        spawnFood();
    }
}

function animate(timestamp) {
    if (!isAnimating) return;
    resizeCanvas();
    
    if (timestamp - lastUpdate > config.frameInterval) {
        update();
        lastUpdate = timestamp;
    }
    
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
spawnFood();
animate(0);

canvas.parentElement.addEventListener('mouseenter', () => {
    isAnimating = false;
    setTimeout(() => isAnimating = true, 1000);
});
// -----------------------------------------------
