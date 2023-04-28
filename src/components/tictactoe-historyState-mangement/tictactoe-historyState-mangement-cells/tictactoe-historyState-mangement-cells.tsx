import React, { Fragment } from 'react';

interface tictactoeHistoryStateMangementCellsProp{
    jumpToSpecificHistoryState: (historyStateIndex: number)=>void;
    historyStateIndex: number;
    description : string;
}
/**
 * @desc 井字棋历史记录单元组件
 * @returns jsx
 */
function tictactoeHistoryStateMangementCells (props: tictactoeHistoryStateMangementCellsProp): JSX.Element {
    const { description, jumpToSpecificHistoryState, historyStateIndex } = props;
    /**
     *@desc 用于处理井字棋历史记录button的点击事件
     */
    function clickHistoryStateMangementCellsHandle () {
        jumpToSpecificHistoryState(historyStateIndex);
    }
    return (
        <Fragment>
            <li>
                <button onClick={clickHistoryStateMangementCellsHandle}>{description}</button>
            </li>
        </Fragment>);
}
export default React.memo(tictactoeHistoryStateMangementCells);
