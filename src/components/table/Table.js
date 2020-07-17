import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { initResize } from '@/components/table/table.resize';

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
            const element = event.target;

            initResize( this.$root, element );
        }
    }
}