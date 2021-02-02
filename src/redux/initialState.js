import { storage } from '@core/utils';
import { STORAGE_KEY, defaultStyles } from '@core/constants';

const defaultState = {
    rowState      : {},
    colState      : {},
    dataState     : {},
    stylesState   : {},
    currentText   : '',
    currentStyles : defaultStyles,
};

const normalize = state => ( {
    ...state,
    currentStyles : defaultStyles,
    currentText   : '',
} );

export const initialState = storage( STORAGE_KEY ) ? normalize( storage( STORAGE_KEY ) ) : defaultState;