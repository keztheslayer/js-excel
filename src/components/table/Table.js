/* eslint-disable @regru/prefer-early-return/prefer-early-return */
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { initResize } from '@/components/table/table.resize';
import { shouldResize, isCell, matrix, nextSelector } from '@/components/table/table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor( $root ) {
        super( $root, {

            listeners : ['mousedown', 'keydown'],
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

            if ( event.shiftKey ) {
                const $cells = matrix( $target, this.selection.current )
                    .map( id => this.$root.find(`[data-id="${id}"]`) );

                this.selection.selectGroup( $cells );
            }

            else {
                this.selection.select( $target );

            }
        }
    }

    onKeydown( event ) {
        const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
        const { key } = event;

        if ( keys.includes( key ) && !event.shiftKey ) {
            event.preventDefault();
            const id = this.selection.current.id( true );
            
            const $next = this.$root.find( nextSelector( key, id ) );
            
            this.selection.select( $next );
        }

    }
}