import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/homePage/homePage';
import { reducer } from '../components/hook-state-mangement/reducers/reducer';
import { HookContent } from '../components/hook-state-mangement/context/hookContext';
/**
 * @desc 共享数据顶级容器
 * @param props
 * @returns jsx
 */
function HookRedux (props: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal }) {
    const CurrentState = [];
    for (let indexfill = 0; indexfill < 3; ++indexfill) {
        CurrentState.push(Array(3).fill(null));
    }
    const resetHistoryState: tictactoeHistoryUnit = {
        tictactoeCellValue: 'resetValue',
        tictactoeCellrowIndex: -1,
        tictactoeCellcolumnIndex: -1,
        historyStateIndex: 0,
    };
    const initStoresDate: storesDate = {
        actionType: null,
        tictactoeScale: 3,
        tictactoeHistoryState: [resetHistoryState],
        tictactoeCurrentState: CurrentState,
        jumpToSpecificHistoryState: null,
    };
    const [storesDate, dispatch] = useReducer(reducer, initStoresDate);
    return (<>
        <HookContent.Provider value={{ storesDate, dispatch }}>
            {props.children}
        </HookContent.Provider>
    </>);
}

/**
 *@desc 項目路由組件
 * @returns jsx
 */
function routes (): JSX.Element {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <HookRedux>
                        <Route path='/' component={Home} />
                    </HookRedux>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default routes;
