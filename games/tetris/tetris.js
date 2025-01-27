// 在Tetris类中添加移动端控制逻辑
class Tetris {
    constructor() {
        // ...原有代码...

        // 添加移动端控制
        this.initTouchControls();
    }

    initTouchControls() {
        const controls = {
            left: () => this.move(-1),
            right: () => this.move(1),
            rotate: () => this.rotate(),
            down: () => this.drop(),
            drop: () => this.hardDrop()
        };

        document.querySelectorAll('.control-btn').
