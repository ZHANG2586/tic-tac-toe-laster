import React from 'react';
import './homePage.css';
import { TictactoeScaleManagement } from '../../components/tictactoe-scale-management/tictactoe-scale-management';
import { TictactoeGame } from '../../components/tictactoe/tictactoe';

/**
 * @desc  首页函數組件
 * @returns jsx
 */
export default function homePage (): JSX.Element {
    return (<>
        <div className="contain">
            <TictactoeScaleManagement/>
            <TictactoeGame/>
        </div>
    </>);
}
