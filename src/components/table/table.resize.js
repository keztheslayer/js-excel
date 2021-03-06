import { $ } from '@core/dom';
export function initResize( $root, event ) {
    return new Promise( resolve => {
        const $resizer = $( event.target );
        const resizeType = $resizer.data.resize;
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        const sideProp = resizeType === 'col' ? 'bottom' : 'right';

        let value;

        let col;

        event.preventDefault();

        document.onmousemove = e => {
            if ( resizeType === 'col' ) {
                col = $parent.data.col;

                const delta = e.pageX - coords.right;
                
                value = coords.width + delta;
                $resizer.css( {
                    right : -delta + 'px',
                } );
            }
            else {
                const delta = e.pageY - coords.bottom;

                value = coords.height + delta;
                $resizer.css( {
                    bottom : -delta + 'px',
                } );
            }

            $resizer.css( {
                [sideProp] : '-5000px',
                opacity    : 1,
            } );
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            value = Math.round( value );

            if ( resizeType === 'col' ) {
                $parent.css( { width: `${value}px` } );
                $root.findAll(`[data-col="${col}"]`)
                    .forEach( cell => {
                        cell.style.width = `${value}px`;
                    } );
            }
            else {
                $parent.css( { height: `${value}px` } );
            }
            resolve( {
                value,
                resizeType,
                id : $parent.data[resizeType],
            } );

            $resizer.css( {
                opacity : 0,
                bottom  : 0,
                right   : 0,
            } );
        };
    } );

}