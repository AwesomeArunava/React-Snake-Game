import React, { useEffect, useState, useRef } from 'react'
import Food from './Food';
import Controler from './Controler'

// import Snake from './Snake';
const Canvas = ({ setScore, score, highScore, setHighScore, setGameOver }) => {
    // this state store the score
    const intervalRef = useRef(null)

    const [wallHit, setWallHit] = useState(false)
    let interval;
    const { DirectionControll, snake, setSnake, setDirection, direction, isPaused, setIsPaused, mirrorDirection } = Controler();
    const [firstFood, setFirstFood] = useState(Food(snake, 0, 19))

   // logic of game over

    useEffect(() => {
        // if snake hit wall
        if (snake[0][0] < 0 || snake[0][0] > 19 || snake[0][1] < 0 || snake[0][1] > 19) {
            // console.log("hit wall");
            setGameOver(true)
            clearInterval(intervalRef.current)
            setWallHit(true)
            console.log(wallHit)
        }
        // if snake eat himself
        if (snake.slice(1).some((snakeBody) => snakeBody[0] === snake[0][0] && snakeBody[1] === snake[0][1])) {
            setGameOver(true)
            clearInterval(intervalRef.current)
            setWallHit(true)
            
        }

    }, [snake])

    useEffect(() => {

        if (score > highScore) {
            setHighScore(score)
            localStorage.setItem("highScore", score)
        }
    }, [score])
    // }
    // if snake eat the food
    if (snake[0][0] === firstFood[0][0] && snake[0][1] === firstFood[0][1]) {
        // increase score if snake eat the food
        setScore((prevScore) => prevScore + 5);

        // genarate new food
        setFirstFood(Food(snake, 0, 19));
        // If snake eat the food add a tail to the end of the new snake
        // newTail is the array that we add into the last of the snake
        let newTail;
        // in which drection we need to add tail this is the logic below
        if (snake.at(-1)[0] === snake.at(-2)[0]) {
            // Moving horizontally
            if (snake.at(-1)[1] < snake.at(-2)[1]) {
                newTail = [snake.at(-1)[0], snake.at(-1)[1] - 1]; // Left
            } else {
                newTail = [snake.at(-1)[0], snake.at(-1)[1] + 1]; // Right
            }
        } else {
            // Moving vertically
            if (snake.at(-1)[0] < snake.at(-2)[0]) {
                newTail = [snake.at(-1)[0] - 1, snake.at(-1)[1]]; // Up
            } else {
                newTail = [snake.at(-1)[0] + 1, snake.at(-1)[1]]; // Down
            }
        }

        // Correctly update state by creating a **new** array
        setSnake((prevSnake) => [...prevSnake, newTail]);
    }




    // create the canvas array
    const canvas = Array.from({ length: 20 }, () => Array(20).fill(0));

    // this function handle key press
    const handleKeyPress = (event) => {
        if (isPaused) {
            setIsPaused(false)
            if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown") {
     
          
                setDirection(event.key)
                

            }
        }
        else
            if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown") {
                    setDirection(event.key)
                
            }
    }

    // it initialize the add event listner and call handleKeyPress if keydown event occure
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        // Cleanup: Remove event listener when component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [])

    // it is for continuously snake movement and paused and resume the snake
    useEffect(() => {

        if (!isPaused && !wallHit) {
            intervalRef.current = setInterval(() => { 
                const tempDir = DirectionControll() 
                if(tempDir != null) {
            
                    setDirection(tempDir)
                }
            }, 200);
            //   setPrevDirection(direction)

        }
        // Cleanup when the component unmounts
        return () => clearInterval(intervalRef.current);

    }, [direction, isPaused])






    return (
        <div className='grid grid-flow-col grid-rows-20  w-100 h-90 bg-[#37474F]'>
            {canvas.map((row, colIndex) => (
                row.map((cell, rowIndex) => {
                    const isSnake = snake.some((snakeBody) => snakeBody[0] === rowIndex && snakeBody[1] === colIndex)
                    const isFruit = firstFood.some((firstFruit) => firstFruit[0] === rowIndex && firstFruit[1] === colIndex)

                    if (isSnake) {
                        return <div key={`${rowIndex}-${colIndex}`} id={`${rowIndex}${colIndex}`} className="border-[1px] border-[#41545E] bg-green-400"></div>
                    }
                    else if (isFruit) {
                        return <div key={`${rowIndex}-${colIndex}`} id={`${rowIndex}${colIndex}`} className="border-[1px] border-[#41545E] bg-red-600"></div>
                    } else {
                        return <div key={`${rowIndex}-${colIndex}`} id={`${rowIndex}${colIndex}`} className={`border-[1px] border-[#41545E]`}></div>
                    }

                })

            ))}
        </div>
    )

}

export default Canvas