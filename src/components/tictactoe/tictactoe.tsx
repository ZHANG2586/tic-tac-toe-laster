import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import { HookContent } from '../hook-state-mangement/context/hookContext';
import TictactoeStatusShow from '../tictactoe-statusShow/tictactoe-statusShow';
import CheckerboardCell from './checkerboard-cell/checkerboard-cell';
import './tictactoe.css';
import { judgmenAlgorithm } from '../judgmenAlgorithm/judgmenAlgorithm';
import TictactoeHistoryStateMangement from '../tictactoe-historyState-mangement/tictactoe-historyState-mangement';


/**
 * cellsValue 井字棋对应单元格值
 */
interface modifyCurrentStatesProps{
    cellsValue: null|string;
    rowIndex: number;
    columIndex: number;
}
/**
 *井首页字棋游戏组件
 * @param ChildProps
 * @returns JSX
 */
export function TictactoeGame (): JSX.Element {
    /**
   * @storesDate Hookredux 共享数据仓库数据
   * @dispatch Hookredux 状态处理函数
  */
    const { storesDate, dispatch } = useContext(HookContent);
    const { tictactoeScale, jumpToSpecificHistoryState } = storesDate;
    const jumpTotTctactoeCurrentState = storesDate.tictactoeCurrentState;
    // 井字棋规模发生改变立刻初始化tictactoeCurrentState
    const tictactoeCurrentState = useMemo(() => {
        const arr = [];
        for (let index = 0; index < tictactoeScale; ++index) {
            arr.push(Array(tictactoeScale).fill(null));
        }
        // console.log(`测试规模修改师傅生效：${arr}`);
        return arr;
    }, [tictactoeScale]);

    // 此处当井字棋规模发生变化时，同步更新tictactoeCurrentState的规模大小，使得modifyCurrentStates和statusShow在操作CurrentState时保持一致。
    useEffect(() => {
        // 由于hooks缓存，在重渲染时如果不调用自身提供的setCurrentState更新函数的话，视图层渲染的是脏数据，而不是想要的最新数据。即数据数据因为hooks的缓存没能驱动UI视图的更新。
        setCurrentState(() => {
            return [...tictactoeCurrentState];
        });
        // 此处用于同步更新tictactoeCurrentState，使得modifyCurrentStates和statusShow在操作CurrentState时保持一致。
        storesDate.tictactoeCurrentState = [...tictactoeCurrentState];

        // 用于初始化tictactoeHistoryState井字棋历史记录
        const resetHistoryState: tictactoeHistoryUnit = {
            tictactoeCellValue: 'resetValue',
            tictactoeCellrowIndex: -1,
            tictactoeCellcolumnIndex: -1,
            historyStateIndex: 0,
        };

        // 每次井字棋规模发生改变时，重置tictactoeHistoryState。
        storesDate.tictactoeHistoryState = [resetHistoryState];
        dispatch(storesDate);
    }, [tictactoeCurrentState]);

    // 更新UI，使之渲染->跳转到指定历史记录jumpToSpecificHistoryState的CurrentState
    useEffect(() => {
        if (jumpToSpecificHistoryState === null) {
            return;
        }
        setCurrentState(() => {
            return [...jumpTotTctactoeCurrentState];
        });
    }, [jumpToSpecificHistoryState]);


    const [CurrentState, setCurrentState] = useState<(null|string[])[]>(tictactoeCurrentState);
    /**
     * @desc 修改tictactoeCurrentState
     */
    const modifyCurrentStates = (props:modifyCurrentStatesProps) => {
        const CurrentState = storesDate.tictactoeCurrentState;

        const { cellsValue, rowIndex, columIndex } = props;

        // 当格子非空时不进行操作
        if (cellsValue !== null) {
            return;
        }
        // 此处添加井字棋判断输赢算法,用于判断输赢。如果有输赢了，此次点击无效及之后点击cells都无效。
        if (judgmenAlgorithm(CurrentState)) {
            return;
        }
        // 统计当前井字棋数组中非空格子数量
        let sum = 0;
        for (const rowArrayValue of CurrentState) {
            for (const cellsValue of rowArrayValue) {
                if (cellsValue !== null) {
                    sum++;
                }
            }
        }
        // 用于处理回溯历史后，重新开始逻辑。
        if (storesDate.jumpToSpecificHistoryState !== null) {
            storesDate.tictactoeHistoryState = storesDate.tictactoeHistoryState.slice(0, storesDate.jumpToSpecificHistoryState + 1);
            storesDate.jumpToSpecificHistoryState = null;
        }
        setCurrentState((preCurrentState) => {
            if (!(sum % 2)) {
                preCurrentState[rowIndex][columIndex] = 'X';
                // 此处dispatch用于同步更新tictactoeCurrentState，使得modifyCurrentStates和statusShow在操作CurrentState时保持一致。
                storesDate.tictactoeCurrentState = preCurrentState;
                let WhetherToPush = true;
                for (const HistoryStateCellsValue of storesDate.tictactoeHistoryState) {
                    if (HistoryStateCellsValue.tictactoeCellrowIndex === rowIndex && HistoryStateCellsValue.tictactoeCellcolumnIndex === columIndex) {
                        WhetherToPush = false;
                    }
                }
                // 此处用于阻止react18以来在更新组件时，组件会进行一次加载一次卸载再次加载。防止给tictactoeHistoryState中重复添加元素。
                if (WhetherToPush) {
                    storesDate.tictactoeHistoryState.push({ tictactoeCellValue: 'X', tictactoeCellrowIndex: rowIndex, tictactoeCellcolumnIndex: columIndex, historyStateIndex: sum + 1 });
                }
                dispatch(storesDate);
                return [...preCurrentState];
            }
            preCurrentState[rowIndex][columIndex] = 'O';
            // 此处dispatch用于同步更新tictactoeCurrentState，使得modifyCurrentStates和statusShow在操作CurrentState时保持一致，不出现操作脏数据的情况。
            storesDate.tictactoeCurrentState = preCurrentState;
            let WhetherToPush = true;
            for (const HistoryStateCellsValue of storesDate.tictactoeHistoryState) {
                if (HistoryStateCellsValue.tictactoeCellrowIndex === rowIndex && HistoryStateCellsValue.tictactoeCellcolumnIndex === columIndex) {
                    WhetherToPush = false;
                }
            }
            // 此处用于阻止react在18以来在更新组件时，组件会进行一次加载一次卸载再次加载。防止给tictactoeHistoryState中重复添加元素。
            if (WhetherToPush) {
                storesDate.tictactoeHistoryState.push({ tictactoeCellValue: 'O', tictactoeCellrowIndex: rowIndex, tictactoeCellcolumnIndex: columIndex, historyStateIndex: sum + 1 });
            }
            dispatch(storesDate);
            return [...preCurrentState];
        });
    };

    // 此处因为缓存callback问题，需要在每次变更井字棋规模时同步更新缓存的callback。否则会导致拿到脏数据问题，排查起来比较麻烦。
    const modifyCurrentState = useCallback(modifyCurrentStates, [tictactoeScale]);
    /**
     * statusShow自执行函数
     * @desc 计算井字棋输赢函数
     */
    const  statusShow = (() => {
        // 此处添加井字棋判断输赢算法,用于判断输赢。如果有输赢了，此次点击无效及之后点击cells都无效。
        const CurrentState = storesDate.tictactoeCurrentState;
        const whetherWinOrLose = judgmenAlgorithm(CurrentState);
        if (whetherWinOrLose) {
            return `The winner is ${whetherWinOrLose}`;
        }
        let CellsValueNoEmptyLen = 0;
        for (const rowArrayValue of CurrentState) {
            for (const cellsValue of rowArrayValue) {
                if (cellsValue !== null) {
                    CellsValueNoEmptyLen++;
                }
            }
        }
        if (CellsValueNoEmptyLen === (tictactoeScale * tictactoeScale)) {
            return 'draw';
        }
        if (!(CellsValueNoEmptyLen % 2)) {
            return 'next player: X';
        }
        return 'next player: O';
    })();
    return (<>
        <div className="game">
            <div className="game-board">
                <TictactoeStatusShow statusShow = { statusShow }/>
                {CurrentState.map((rowArrayValue, rowIndex) => {
                    return (
                        <div className="board-row" key={rowIndex} >
                            {
                                rowArrayValue.map((cellsValue, columIndex) => {
                                    return <CheckerboardCell key={`${rowIndex}-${columIndex}`}  modifyTictactoeCurrentState={modifyCurrentState} cellsValue={cellsValue} rowIndex={rowIndex} columIndex={columIndex}/>;
                                })
                            }
                        </div>
                    );
                })}
            </div>
            <div className="game-info">
                <TictactoeHistoryStateMangement  />
            </div>
        </div>
    </>);
}
