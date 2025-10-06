import { useState } from 'react'
import Canvas from './components/Canvas'
import GameOver from './components/GameOver'
import './App.css'


function App() {
 const [score, setScore] = useState(0)
 const[gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore"))
  return (

    
    <div className='flex flex-col items-center justify-center h-[100vh] bg-[#263238]'>
      <div className='w-100 flex justify-end'>
      <h1 className='mx-6 text-white'>Score:{score}</h1>
      <h1 className='text-white'>High Score:{highScore}</h1>
      </div>
      
      <Canvas setScore={setScore} score={score} highScore={highScore} setHighScore={setHighScore} setGameOver={setGameOver}/>
      
        {gameOver && <GameOver/> }
   
    </div>




  )
}

export default App
