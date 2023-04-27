import React from 'react';
import '../tictactoe.css';

interface checkerboardCellProp{
    modifyTictactoeCurrentState: (props:any)=>void;
    cellsValue: null|string;
    rowIndex: number;
    columIndex: number;
}

interface modifyCurrentStatesProps{
    cellsValue: null|string;
    rowIndex: number;
    columIndex: number;
}
/**
 * @desc 井字棋单元格组件
 * @returns jsx
 */
function checkerboardCell (props: checkerboardCellProp): JSX.Element {
    /**
     * @desc 用于透传参数给modifyTictactoeCurrentState函数
     */
    function TransparentParameter () {
        const modifyCurrentStatesProps: modifyCurrentStatesProps = {
            cellsValue: props.cellsValue,
            rowIndex: props.rowIndex,
            columIndex: props.columIndex,
        };
        props.modifyTictactoeCurrentState(modifyCurrentStatesProps);
    }

    return (<>
        <button className="square"  onClick={TransparentParameter}>{props.cellsValue}</button>
    </>);
}
export default React.memo(checkerboardCell);
