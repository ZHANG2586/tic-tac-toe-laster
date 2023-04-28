import React, { Fragment, useCallback, useContext } from 'react';
import TictactoeHistoryStateMangementCells from './tictactoe-historyState-mangement-cells/tictactoe-historyState-mangement-cells';
import { HookContent } from '../hook-state-mangement/context/hookContext';

/**
 * @desc 管理井字棋历史记录组件
 * @returns jsx
 */
function tictactoeHistoryStateMangement (): JSX.Element {
    const { storesDate, dispatch } = useContext(HookContent);
    let description = '';
    const { tictactoeHistoryState } = storesDate;

    /** 跳转到指定历史记录
     * @param {number} historyStateIndex 井字棋历史记录数组中TictactoeHistoryStateMangementCells组件对应的索引值
     */
    const jumpToSpecificHistoryStates = (historyStateIndex:number) => {
        if (storesDate.jumpToSpecificHistoryState === historyStateIndex) return;
        const jumpToTargetHistoryStates = storesDate.tictactoeHistoryState.slice(0, historyStateIndex + 1);
        const tictactoeCurrentStateLength = storesDate.tictactoeCurrentState.length;
        const initTictactoeCurrentState = Array(tictactoeCurrentStateLength);
        for (let rowIndex = 0; rowIndex < tictactoeCurrentStateLength; ++rowIndex) {
            initTictactoeCurrentState[rowIndex] = Array(tictactoeCurrentStateLength).fill(null);
        }
        for (const historyStatesValue of jumpToTargetHistoryStates) {
            if (historyStatesValue.tictactoeCellrowIndex !== -1) {
                initTictactoeCurrentState[historyStatesValue.tictactoeCellrowIndex][historyStatesValue.tictactoeCellcolumnIndex] = historyStatesValue.tictactoeCellValue;
            }
        }
        storesDate.tictactoeCurrentState = initTictactoeCurrentState;
        storesDate.jumpToSpecificHistoryState = historyStateIndex;
        dispatch(storesDate);
    };
    const jumpToSpecificHistoryState = useCallback(jumpToSpecificHistoryStates, [storesDate.tictactoeScale]);
    return (<>
        <ol>
            <div className="game-info">
                <ol>
                    {
                        tictactoeHistoryState.map((tictactoeHistoryStateValue: tictactoeHistoryUnit, tictactoeHistoryStateIndex: number) => {
                            if (tictactoeHistoryStateIndex ===  0) {
                                description = 'Go to game start';
                            } else {
                                description = `Go to move #${tictactoeHistoryStateIndex}`;
                            }
                            const { historyStateIndex, tictactoeCellrowIndex, tictactoeCellcolumnIndex } = tictactoeHistoryStateValue;
                            return (
                                // 此处给Fragment组件添加key值，来充分利用diff来优化处理列表组件的删除/修改/排序等操作。
                                <Fragment key={`${tictactoeCellrowIndex}-${tictactoeCellcolumnIndex}`}>
                                    <TictactoeHistoryStateMangementCells jumpToSpecificHistoryState = {jumpToSpecificHistoryState}  historyStateIndex = {historyStateIndex} description = {description} />
                                </Fragment>);
                        })
                    }
                </ol>
            </div>
        </ol>
    </>);
}
export default React.memo(tictactoeHistoryStateMangement);
