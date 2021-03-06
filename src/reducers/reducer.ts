import { AnyAction } from 'redux';
import { GRID } from 'typings'

import global from 'global';

import { createFullGrid, copyGrid, removeNumbers, compareArrays } from 'utils';

import { IReducer } from './interfaces';
import * as types from './types';

const initialState: IReducer = {}

function reducer(state = initialState, action: AnyAction): IReducer {

    switch(action.type) {

        case types.CREATE_GRID: {

            const solvedGrid = createFullGrid();
            const gridCopy = copyGrid(solvedGrid);
            const challengeGrid = removeNumbers(gridCopy, 8);

            const workingGrid = copyGrid(challengeGrid);

            return {
                ...state,
                challengeGrid,
                solvedGrid,
                workingGrid
            }
        }

        case types.SELECT_BLOCK: 
            return {
                ...state,
                selectedBlock: action.coords
            }

        case types.FILL_BLOCK: {

            if (state.workingGrid && state.solvedGrid) {
                if (state.solvedGrid[action.coords[0]][action.coords[1]] !== action.value) {
                    alert("Incorrect Options!");
                    return state;
                } 

                state.workingGrid[action.coords[0]][action.coords[1]] = action.value;
                if (compareArrays(state.workingGrid, state.solvedGrid)) {
                    global.hasWon = true;
                }
                
                return { ...state, workingGrid: [...state.workingGrid] as GRID}
            }

            return state; 
        }
            

        default:
            return state
    }
}

export default reducer;