const charA = 65;
const charZ = 90;
const baseRowsCount = 15;

/* function toCell( row, index ) {
    return `
        <div class="cell" contenteditable="" data-row="${row}" data-col="${index}"></div>
    `;
} */

function toCell( row ) {
    return function( _, col ) {
        return `
            <div data-type="cell" class="cell" contenteditable="" data-col="${col}" data-id="${row}:${col}"></div>
        `;        
    };
}

function toColumn( column, index ) {
    return `
        <div class="column" data-type="resizable" data-col-index="${index}">
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

export function createTable( rowsCount = baseRowsCount ) {
    const colsCount = charZ - charA + 1;
    const rows = [];
    const firstRowColumns = new Array( colsCount )
        .fill()
        .map( toChar )
        .map( ( el, index ) => {
            return toColumn( el, index );
        } )
        .join('');

    rows.push( createRow( firstRowColumns, null ) );

    for ( let row = 0; row < rowsCount; row++ ) {
        const cells = new Array( colsCount )
            .fill()

            // .map( ( _, col ) => toCell( row,col ) )
            .map( toCell( row ) )
            .join('');
            
        rows.push( createRow( cells, row + 1 ) );
    }

    /* rows.push( createRow(`<div class="cell selected">A1</div>
    <div class="cell">B2</div>
    <div class="cell" contenteditable="">C3</div>`) ); */

    return rows.join('');
}