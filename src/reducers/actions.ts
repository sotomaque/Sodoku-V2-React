import { Action, AnyAction } from 'redux';

import { BLOCK_COORDS, NUMBERS } from 'typings';

import * as types from './types';

export const createGrid = (): Action => ({
    type: types.CREATE_GRID
});

export const selectBlock = (coords: BLOCK_COORDS): AnyAction => ({
    type: types.SELECT_BLOCK, 
    coords
});

export const fillBlock = (value: NUMBERS, coords: BLOCK_COORDS): AnyAction => ({
    type: types.FILL_BLOCK,
    coords,
    value
});