/* eslint-disable react/jsx-key */
import React from "react";
import {calculateWinner} from "../../algorithm/ticTacToeAlgorithm"
// import {Square} from "./square"

export function Board(props: { xIsNext: boolean, squares: (null | string)[], onPlay: (nextSquares:(null | string)[])=>void , rules: number}) {
    const array: number[] = new Array(props.rules).fill(1);
    
    function handleClick(i: number):void {
      const winner = calculateWinner(props.squares, props.rules);
      // console.log('每次结果：'+winner)
      if( winner === 'X' || winner === 'O' || props.squares[i]){
        return;
      }
      const nextSquares:(null|string)[] = props.squares.slice();
      if (props.xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      props.onPlay(nextSquares);
    }
    let status;
    const winner = calculateWinner(props.squares, props.rules);
    if(winner === 'Pending'){
      status = 'Next player: ' + (props.xIsNext ? 'X' : 'O');
    }else if(winner === 'Draw'){
      status = 'Draw';
    }else if(winner === 'X'){
      status = 'Winner: ' + winner;
    }else if(winner === 'O'){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (props.xIsNext ? 'X' : 'O');
    }
    
    return (
      <>
        <div className="status">{status}</div>
        {
          array.map((val,index)=>{
            let sum=2;
            const key1 = val+' '+sum+''+index;
            sum++;
            return (
              <div className="board-row" key={key1} >
                {
                  array.map((val2,index2)=>{
                    const key2 =  val2+' '+sum+''+index+'-'+index2;
                    sum++
                    return (
                    <>
                      <button className="square" key={key2}  onClick={()=>handleClick(index*props.rules+index2)}>{props.squares[index*props.rules+index2]}</button>
                    </>
                    );
                  })
                }
              </div>
            )
         })
        }
      </>
    );
  }