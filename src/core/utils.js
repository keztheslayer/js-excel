// Pure functions
export function capitalize( string ) {
    if ( typeof string !== 'string' ) {
        return '';
    }

    return string.charAt( 0 ).toUpperCase() + string.slice( 1 ).toLowerCase();
}

export function range( start, end ) {
    if ( start > end ) {

        // es6 hack to swap variables' values
        // eslint-disable-next-line no-param-reassign
        [end,start] = [start, end]; 
    }
    
    return new Array( end - start + 1 )
        .fill('')
        .map( ( _, index ) => start + index );
}

export function storage( key, data = null ) {
    if ( !data ) {
        return JSON.parse( localStorage.getItem( key ) );
    }
    
    localStorage.setItem( key, JSON.stringify( data ) );
}

export function isEqual( a,b ) {
    if ( typeof a === 'object' && typeof b === 'object' ) {
        return JSON.stringify( a ) === JSON.stringify( b );
    }
    
    return a === b;
}