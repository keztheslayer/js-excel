const charA = 65;
const charZ = 90;
const baseRowsCount = 4;

function toCell( _, index ) {
    return `
        <div class="cell" contenteditable="" data-cell-index="${index}"></div>
    `;
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

    for ( let i = 0; i < rowsCount; i++ ) {
        const cells = new Array( colsCount )
            .fill()
            .map( toCell )
            .join('');
            
        rows.push( createRow( cells, i + 1 ) );
    }

    /* rows.push( createRow(`<div class="cell selected">A1</div>
    <div class="cell">B2</div>
    <div class="cell" contenteditable="">C3</div>`) ); */

    return rows.join('');
}