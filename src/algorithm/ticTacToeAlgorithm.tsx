/** 
N x N 规模井字棋判断胜负算法(非递归、递归混用算法) 
**/
export function calculateWinner(squares: (null | string)[], rules: number):(boolean | string) {
    const newarr:(undefined|null|string)[][] = [];
    for(let i=0; i < rules; ++i){ 
      newarr.push(new Array(rules).fill(null));
    }
  
    for(let i=0; i < squares.length; ++i){
      newarr[Math.floor(i/rules)][i%rules] = squares[i];
    }
  
    const tictactoe = function (board: (undefined|null|string)[][]) {
      let hasBlank
      board = board.map((item) => {
        // 遍历，转换字符串成数组，如果有空位，记录
        if (item.includes(null)) {
          hasBlank = true
        }
        return item;
      })
      const len = board.length;
      let result;
      // 第一行的元素只能向下行动
      // 第一列的元素只能向右行动
      for (let i = 0; i < len; ++i) {
        dfsRecursive(0, i, 1, board[0][i], [1, 0]);
        const mark = dfsNonRecursive(i);
        if(mark){
          return mark;
        }
      }
      
      // 特殊处理，[0, 0]可以向右下，[0, len - 1]可以向走下
      dfsRecursive(0, 0, 1, board[0][0], [1, 1])
      dfsRecursive(0, len - 1, 1, board[0][len - 1], [1, -1])
      return result ? result : hasBlank ? 'Pending' : 'Draw';
      /**
      @param {Number} row 行坐标
      **/
      function dfsNonRecursive(row: number){
        const i = row;
        let j=1,sum=1;
        const head=board[i][0];
        while(j<len){
          const temp = board[i][j++];
          if(temp === null){
             break;
          }else if(temp !== head ){
             break;
          }else{
            sum++;
          }
        }
        if(sum === len){
          return head;
        }
        return false;
      }
  
      /**
      * @desc: 
      * @param {Number} row  行坐标
      * @param {Number} col  列坐标
      * @param {Number} index  统计一样的棋子数量
      * @param {String} target 上一步的棋子（X、O）
      * @param {Array} step  棋子移动方向
      * @return {voild}
      */
      function dfsRecursive(row: number, col: number, index: number, target: string, step: number[] ) {
        if (target === null) {
            return;
        } 
        if (index === len) {
           result = target
           return;
        }
        const [r, c] = step;
        const nextRow = row + r;
        const nextCol = col + c;
        if (nextRow < len && nextCol < len&& nextCol > -1 && nextRow > -1 && board[nextRow][nextCol] === target) {
          dfsRecursive(nextRow, nextCol, index+1, target, step);
        }
      }
    };
    return tictactoe(newarr);
  }