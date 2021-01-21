import { storage } from '@core/utils';
import { STORAGE_KEY } from '@core/constants';

const defaultState = {
    rowState : {},
    colState : {},
};

export const initialState = storage( STORAGE_KEY ) || defaultState;