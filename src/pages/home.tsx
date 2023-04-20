import React,{useEffect, useState} from "react";
import { print,Game } from "../components/tictactoe/tic-tac-toe";
import "../styles/home.css"

export default function App() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    print('---'+count);
  }, [count]);
  return (
    <>
     <div className="contain">
      <div className="right">
       自定义井字棋规模: {count+3}x{count+3}
       <button className="button"
         onClick={() => {
           setCount(count + 1);
         }}
       >
        add
       </button>
      </div>
        <Game rule={count}/>
      </div>
    </>
  );
}