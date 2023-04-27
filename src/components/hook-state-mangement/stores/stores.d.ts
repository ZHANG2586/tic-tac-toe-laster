/**
  * @desc 共享数据仓库
  * @param {string | null} actionType  触发活动类型
  * @param {number} tictactoeScale  井字棋规模
  * @param {(tictactoeHistoryUnit|null)[]} tictactoeHistoryState  井字棋历史状态记录数组
  * @param {(null|string[])[]} tictactoeCurrentState 井字棋现阶段数状态记录数组
  * @param {number|null} jumpToSpecificHistoryState 跳转到指定井字棋历史状态位置
  * @return {void}
 */
interface storesDate{
    actionType:string | null;
    tictactoeScale: number;
    tictactoeHistoryState: (tictactoeHistoryUnit|null)[];
    tictactoeCurrentState: ((null|string)[])[];
    jumpToSpecificHistoryState: number|null;
}

/**
 * @desc 井字棋历史记录单元数据结构类型
 * @param {string} tictactoeCellValue 井字棋当前单元格内容数值
 * @param {number} tictactoeCellIndex 井字棋当前单元格位置索引
 * @param {number} historyStateIndex   井字棋历史记录单元的索引位置
 */
interface tictactoeHistoryUnit{
    tictactoeCellValue: string;
    tictactoeCellrowIndex: number;
    tictactoeCellcolumnIndex: number;
    historyStateIndex: number;
}
