/* eslint-disable @regru/prefer-early-return/prefer-early-return */
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { initResize } from '@/components/table/table.resize';
import { shouldResize, isCell } from '@/components/table/table.functions';
import { TableSelection } from './TableSelection';
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

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');

        this.selection.select( $cell );
    }
    
    onMousedown( event ) {
        if ( shouldResize( event ) ) {
            initResize( this.$root, event );
        }
        else if ( isCell( event ) ) {
            const $target = $( event.target );

            this.selection.select( $target );
        }
    }
}