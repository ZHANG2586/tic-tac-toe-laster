import React from 'react';

interface tictactoeStatusShowProps{
    statusShow: string;  // 井字棋输赢状态
}

/**
 *井字棋输赢状态展示组件
 * @param props
 * @returns JSX
 */
function  TictactoeStatusShow (props: tictactoeStatusShowProps): JSX.Element {
    /**
   * @storesDate Hookredux 共享数据仓库数据
   * @dispatch Hookredux 状态处理函数
  */
    const { statusShow } = props;
    return (<>

        <div className="status">{statusShow}</div>

    </>);
}
export default React.memo(TictactoeStatusShow);
