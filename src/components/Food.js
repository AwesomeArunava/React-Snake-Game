const Food = (snake, min, max) => {

    const rowIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const colIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const isSnake = snake.some((snakeBody) => snakeBody[0] === rowIndex && snakeBody[1] === colIndex)
    if (isSnake) {
        return Food(snake, min, max)
    } else {
        return [[rowIndex, colIndex]]
    }

}

export default Food