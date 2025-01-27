// 初始化 Canvas
const canvas = document.getElementById('snake-preview');
const ctx = canvas.getContext('2d');
let width, height;

// 动态调整画布尺寸
function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 迷你蛇动画参数
const gridSize = 15;
let snake = [{x: 3, y: 1}];
let food = {x: 7, y: 5};
let direction = 'right';

// 绘制函数
function draw() {
    // 清空画布
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, 0, width, height);

    // 绘制蛇
    ctx.fillStyle = '#2c3e50';
    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });

    // 绘制食物
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2,
        gridSize/2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// 运动逻辑
function move() {
    const head = {...snake[0]};
    
    // 移动方向
    switch(direction) {
        case 'right': head.x++; break;
        case 'left':  head.x--; break;
        case 'up':    head.y--; break;
        case 'down':  head.y++; break;
    }

    // 边界检测
    if (head.x >= Math.floor(width / gridSize)) direction = 'down';
    if (head.y >= Math.floor(height / gridSize)) direction = 'left';
    if (head.x < 0) direction = 'up';
    if (head.y < 0) direction = 'right';

    snake.unshift(head);
    
    // 随机生成新食物
    if (Math.random() < 0.1) {
        food = {
            x: Math.floor(Math.random() * (width / gridSize)),
            y: Math.floor(Math.random() * (height / gridSize))
        };
    }

    // 保持蛇的长度
    if (snake.length > 5) snake.pop();
}

// 动画循环
function animate() {
    move();
    draw();
    requestAnimationFrame(animate);
}

// 启动动画
animate();
