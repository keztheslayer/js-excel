import { defaultStyles, DEFAULT_TITLE } from '@core/constants';
import { clone } from '@core/utils';

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

export function normalizeInitialState( state ) {
    return state ? normalize( state ) : clone( defaultState );
}