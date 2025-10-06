
import { useEffect, useRef, useState } from "react"

const Controler = () => {

    const [snake, setSnake] = useState([[18, 12], [18, 13], [18, 14], [18, 15]])
    const [direction, setDirection] = useState("")
    const prevDirectionRef = useRef();

    const [isPaused, setIsPaused] = useState(true)
    const mirrorDirection = {
        'ArrowUp': 'ArrowDown',
        'ArrowDown': 'ArrowUp',
        'ArrowLeft': 'ArrowRight',
        'ArrowRight':'ArrowLeft'
    }


    useEffect(() => {
        prevDirectionRef.current = direction; // Update previous value *after* render
      });

    const prevDirection = prevDirectionRef.current; 



    useEffect(()=>{
        console.log('Direction =>>>', direction,);
        
    },[direction])

    // this direction controll function controll the direction 

    const DirectionControll = () => {

            // let dr = direction;
      
            if(direction == mirrorDirection[prevDirection]) {
                const pD = prevDirection;
                prevDirectionRef.current = '';
                moveSnakeByDirection(pD)
                return pD;
            }
        
          
            moveSnakeByDirection(direction)
            return null

            // }
        // }

    }

    const moveSnakeByDirection = (dir) => {
        setSnake((prevSnake) => prevSnake.map((snakeBody, i) => {

            if (i === 0) {

                switch (dir) {
                    case "ArrowUp":
                        console.log("Moving Up");
                        return [snakeBody[0] - 1, snakeBody[1]]

                    case "ArrowDown":
                        console.log("Moving Down");
                    
                        return [snakeBody[0] + 1, snakeBody[1]]

                    case "ArrowLeft":
                        console.log("Moving Left");
                        
                        return [snakeBody[0], snakeBody[1] - 1]

                    case "ArrowRight":
                        console.log("Moving Right");
                
                        return [snakeBody[0], snakeBody[1] + 1]

                    default:
                        console.log("Invalid Key");
                }

            } else
                return [prevSnake[i - 1][0], prevSnake[i - 1][1]]


        }))

    }
    // console.log(snake)
    return { snake, setSnake, setDirection, DirectionControll, direction, prevDirection,mirrorDirection, isPaused, setIsPaused}
}

export default Controler