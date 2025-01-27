// 初始化
const canvas = document.getElementById('snake-preview');
const ctx = canvas.getContext('2d');
let width, height;

// 配置参数
const config = {
    gridSize: 14,        // 网格尺寸
    frameInterval: 200,  // 更新间隔（毫秒）
    maxLength: 4,        // 蛇的最大长度
    colors: {
        background: '#2ecc71',
        snake: '#2c3e50',
        food: '#e74c3c'
    }
};

// 游戏状态
let snake = [{x: 3, y: 3}];
let food = {x: 7, y: 5};
let direction = 'right';
let lastUpdate = 0;
let isAnimating = true;

// 调整画布尺寸
function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

// 生成随机食物
function spawnFood() {
    const gridX = Math.floor(width / config.gridSize);
    const gridY = Math.floor(height / config.gridSize);
    
    food = {
        x: Math.floor(Math.random() * (gridX - 2)) + 1,
        y: Math.floor(Math.random() * (gridY - 2)) + 1
    };
}

// 绘制元素
function draw() {
    // 背景
    ctx.fillStyle = config.colors.background;
    ctx.fillRect(0, 0, width, height);

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

// 更新游戏状态
function update() {
    const head = {...snake[0]};

    // 自动转向逻辑
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

    // 食物碰撞检测
    if (head.x === food.x && head.y === food.y) {
        spawnFood();
    }
}

// 动画循环
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

// 启动系统
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
spawnFood();
animate(0);

// 悬停控制
canvas.parentElement.addEventListener('mouseenter', () => {
    isAnimating = false;
    setTimeout(() => isAnimating = true, 1000); // 暂停1秒后恢复
});
