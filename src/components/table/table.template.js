const charA = 65;
const charZ = 90;
const baseRowsCount = 15;
const DEFAULT_WIDTH = 120;

function getWidth( state, index ) {
    if ( state && state[index] ) {
        return state[index] + 'px';
    }
    
    return DEFAULT_WIDTH + 'px';
}

function toCell( state, row ) {
    return function( _, col ) {
        const width = getWidth( state.colState, col );
  
        return `
            <div 
                data-type="cell"
                class="cell"
                contenteditable=""
                data-col="${col}"
                data-id="${row}:${col}"
                style="width: ${width} "
            ></div>
        `;        
    };
}

function toColumn( { column, index, width } ) {
    return `
        <div class="column" data-type="resizable" data-col-index="${index}" style="width: ${width}">
            ${column}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow( content, index ) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';

    return `
        <div class="row" data-type="resizable">
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

    rows.push( createRow( firstRowColumns, null ) );

    for ( let row = 0; row < rowsCount; row++ ) {
        const cells = new Array( colsCount )
            .fill()
            .map( toCell( state, row ) )
            .join('');
            
        rows.push( createRow( cells, row + 1 ) );
    }

    return rows.join('');
}