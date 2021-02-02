import { storage } from '@core/utils';
import { STORAGE_KEY, defaultStyles } from '@core/constants';

const defaultState = {
    rowState      : {},
    colState      : {},
    currentText   : '',
    dataState     : {},
    currentStyles : defaultStyles,
};

export const initialState = storage( STORAGE_KEY ) || defaultState;