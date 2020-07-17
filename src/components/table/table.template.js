const charA = 65;
const charZ = 90;
const baseRowsCount = 4;

function toCell() {
    return `
        <div class="cell" contenteditable=""></div>
    `;
}

function toColumn( column ) {
    return `
        <div class="column">
            ${column}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow( content, index ) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';

    return `
        <div class="row">
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
        .map( toColumn )
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