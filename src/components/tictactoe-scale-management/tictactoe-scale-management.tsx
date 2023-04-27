import React, { useContext } from 'react';
import { HookContent } from '../hook-state-mangement/context/hookContext';

/**
 * @desc 井字棋状态管理组件
 * @returns jsx
 */
export function TictactoeScaleManagement (): JSX.Element {
    /**
     * @storesDate Hookredux 共享数据仓库数据
     * @dispatch Hookredux 状态处理函数
    */
    const { storesDate, dispatch } = useContext(HookContent);
    /**
     *增加井字棋规模
     */
    function clickAdd () {
        storesDate.actionType = 'ADD';
        dispatch(storesDate);
    }
    /**
   *减小井字棋规模
   */
    function clickFall () {
        storesDate.actionType = 'PULL';
        dispatch(storesDate);
    }
    return (<>
        <div className="right">
       自定义井字棋规模: {storesDate.tictactoeScale}x{storesDate.tictactoeScale}
            <button className="button-add" onClick={clickAdd}>
                      add
            </button>
            <button className='button-fall'onClick={clickFall} >
                      fall
            </button>
        </div>
    </>);
}
