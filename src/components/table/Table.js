import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor( $root ) {
        super( $root, {

            listeners : ['mousedown'],
        } );
    }

    toHTML() {
        return createTable( );
    }
    
    // eslint-disable-next-line @regru/prefer-early-return/prefer-early-return
    onMousedown( event ) {
        if ( event.target.dataset.resize ) {
            const resizeType = event.target.dataset.resize;
            const $resizer = $( event.target );
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();

            if ( resizeType === 'col' ) {
                const colIndex = $parent.data.colIndex;
                const cells = this.$root.findAll(`[data-cell-index="${colIndex}"]`);

                document.onmousemove = e => {
                    const delta = e.pageX - coords.right;
                    const value = coords.width + delta;

                    $parent.css( {
                        width : `${value}px`,
                    } );
                    cells.forEach( cell => {
                        cell.style.width = `${value}px`;
                    } );
                };
            }
            else {
                document.onmousemove = e => {
                    const delta = e.pageY - coords.bottom;
                    const value = coords.height + delta;
    
                    $parent.css( {
                        height : `${value}px`,
                    } );
                };
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        };
    }
}