import { range } from '@core/utils';

export function shouldResize( event ) {
    return event.target.dataset.resize;
}

export function isCell( event ) {
    return event.target.dataset.type === 'cell';
}

export function matrix( $target, $current ) {
    const target = $target.id( true );
    const current = $current.id( true );
    const cols = range( current.col, target.col );
    const rows = range( current.row, target.row );

    
    return cols.reduce( ( acc, col ) => {
        rows.forEach( row => acc.push( `${row}:${col}` ) );
                        
        return acc;
    }, [] );
}

export function nextSelector( key, { col, row } ) {
    const MIN_VALUE = 0;

    let column = col;
    
    let line = row;

    switch ( key ) {
        case 'Enter':
        case 'ArrowDown':
            line++;
            break;
        case 'Tab':
        case 'ArrowRight':
            column++;
            break;
        case 'ArrowLeft':
            column = column - 1 < MIN_VALUE ? MIN_VALUE : column - 1;
            break;
        case 'ArrowUp':
            line = line - 1 < MIN_VALUE ? MIN_VALUE : line - 1;
            break;
    }

    return `[data-id="${line}:${column}"]`;
}