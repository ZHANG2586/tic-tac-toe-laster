/**
 * @desc 发布器
 * @param state
 * @param action
 * @returns
 */
export function reducer (state: storesDate, action: storesDate) {
    if (action.actionType === 'ADD') {
        state.tictactoeScale = state.tictactoeScale + 1;
        state.actionType = null;
        return { ...state };
    } else if (action.actionType === 'PULL') {
        if (state.tictactoeScale === 3) {
            state.actionType = null;
            return { ...state };
        }
        state.tictactoeScale = state.tictactoeScale - 1;
        state.actionType = null;
        return { ...state };
    }
    state.actionType = null;
    return { ...action };
}
