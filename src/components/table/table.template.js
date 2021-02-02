import { defaultStyles } from '@/core/constants';
import { camelToDashCase } from '@/core/utils';

const charA = 65;
const charZ = 90;
const baseRowsCount = 15;
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth( state, index ) {
    return ( state[index] || DEFAULT_WIDTH ) + 'px';
}

function getHeight( state, index ) {
    return ( state[index] || DEFAULT_HEIGHT ) + 'px';
}

function toCell( state, row ) {
    return function( _, col ) {
        const width = getWidth( state.colState, col );
        const id = `${row}:${col}`;
        const data = state.dataState[id] || '';
        const styles = Object.keys( defaultStyles )
            .map( key => `${camelToDashCase( key )}: ${defaultStyles[key]}` )
            .join(';');
  
        return `
            <div 
                data-type="cell"
                class="cell"
                contenteditable=""
                data-col="${col}"
                data-id="${id}"
                style="${styles};width: ${width} "
            >
                ${data}
            </div>
        `;        
    };
}

function toColumn( { column, index, width } ) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${column}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow( content, index, rowState ) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    const height = getHeight( rowState, index );

    return `
        <div 
            class="row" 
            data-type="resizable"
            data-row="${Number( index )}"
            style="height: ${height}"
        >
            <div class="row-info">
                ${index || ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar( _, index ) {
    return String.fromCharCode( charA + index );
}

function withWidthFrom( state ) {
    return function( column, index ) {
        return {
            column,
            index,
            width : getWidth( state.colState, index ),
        };
    };
}

export function createTable( rowsCount = baseRowsCount, state = {} ) {
    const colsCount = charZ - charA + 1;
    const rows = [];
    const firstRowColumns = new Array( colsCount )
        .fill()
        .map( toChar )
        .map( withWidthFrom( state ) )
        .map( toColumn )
        .join('');

    rows.push( createRow( firstRowColumns, null, {} ) );

    for ( let row = 0; row < rowsCount; row++ ) {
        const cells = new Array( colsCount )
            .fill()
            .map( toCell( state, row ) )
            .join('');
            
        rows.push( createRow( cells, row + 1, state.rowState ) );
    }

    return rows.join('');
}