import { storage } from '@core/utils';
import { STORAGE_KEY, defaultStyles, DEFAULT_TITLE } from '@core/constants';

const defaultState = {
    currentStyles : defaultStyles,
    rowState      : {},
    colState      : {},
    dataState     : {},
    stylesState   : {},
    currentText   : '',
    title         : DEFAULT_TITLE,
};

const normalize = state => ( {
    ...state,
    currentStyles : defaultStyles,
    currentText   : '',
} );

export const initialState = storage( STORAGE_KEY ) ? normalize( storage( STORAGE_KEY ) ) : defaultState;