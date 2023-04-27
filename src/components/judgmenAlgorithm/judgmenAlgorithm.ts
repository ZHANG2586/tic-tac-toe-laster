/**
 * 井字棋判断输赢算法
 * @param props
 * @returns string
 */
export function judgmenAlgorithm (tictactoeCurrentState: (null|string[])[]) {
    const whetherWinOrLose = false;
    const rowArrayLength = tictactoeCurrentState.length;
    let midNonRecursiveResult = dfsNonRecursive(tictactoeCurrentState, 0, 0, [1, 1]);
    if (midNonRecursiveResult !== 'No winner') {
        return midNonRecursiveResult;
    }
    midNonRecursiveResult = dfsNonRecursive(tictactoeCurrentState, 0, rowArrayLength - 1, [1, -1]);
    if (midNonRecursiveResult !== 'No winner') {
        return midNonRecursiveResult;
    }
    for (let rowOrcolumIndex = 0; rowOrcolumIndex < rowArrayLength; ++rowOrcolumIndex) {
        midNonRecursiveResult = dfsNonRecursive(tictactoeCurrentState, rowOrcolumIndex, 0, [0, 1]);
        if (midNonRecursiveResult !== 'No winner') {
            return midNonRecursiveResult;
        }
        midNonRecursiveResult = dfsNonRecursive(tictactoeCurrentState, 0, rowOrcolumIndex, [1, 0]);
        if (midNonRecursiveResult !== 'No winner') {
            return midNonRecursiveResult;
        }
    }
    return whetherWinOrLose;
}
/**
 *@desc 用于判断给定一维数组输赢算法（此处通过已知数组首元素坐标以及元素运动方向和边界，来确定一个一维数组）
 * @param dfsNonRecursiveProps
 */
function dfsNonRecursive (tictactoeCurrentState: (null|string[])[], rowIndex: number, columIndex: number, step: number[]):string {
    const ranksLen = tictactoeCurrentState[0].length;
    const firstRowValue = tictactoeCurrentState[rowIndex][columIndex];
    if (!firstRowValue) return 'No winner';
    while ((rowIndex < ranksLen) && (columIndex <  ranksLen) && (columIndex >= 0) && (rowIndex >= 0)) {
        if ((firstRowValue !== tictactoeCurrentState[rowIndex][columIndex])) {
            return 'No winner';
        }
        rowIndex = rowIndex + step[0];
        columIndex = columIndex + step[1];
    }
    return firstRowValue;
}
