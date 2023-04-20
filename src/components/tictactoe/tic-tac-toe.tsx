import React,{useEffect, useState} from "react";
import '../../styles/tic-tac-toe.css';
import {Board} from "./board";

interface ChildProps{
  rule: number
}

export function print(value: string) {
  console.log('自定义井字棋规模：'+value);
}

export const Game: React.FC<ChildProps> = (props) => {
  const [rule,setRule] = useState<number>(3);
  const [history, setHistory] = useState<(null|string)[][]>([Array(rule*rule).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext:boolean = currentMove % 2 === 0;
  const currentSquares: (null|string)[] = history[currentMove];

  useEffect(()=>{
    console.log('hahah')
    console.log(props);
    setRule(()=>{
      return 3+props.rule;
    });
    setHistory([Array(rule*rule).fill(null)]);
    setCurrentMove(0);

    //此处用asyn实现usestate的同步更新会引起bug
    // async function syunc(){

    //   await setRule((preval)=>{
    //      return 3+props.rule;
    //    });
    //   await setHistory([Array(rule*rule).fill(null)]);
    //   await setCurrentMove(0);
    // }
    // syunc();
    
  },[props.rule])

  function handlePlay(nextSquares: (null | string)[]):void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares: (null|string)[], move: number) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} rules={rule}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}