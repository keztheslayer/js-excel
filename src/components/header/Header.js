import { ExcelStateComponent } from '@core/ExcelStateComponent';
import * as actions from '@/redux/actions';
import { DEFAULT_TITLE } from '@/core/constants';
import { ActiveRoute } from '@/core/routes/ActiveRoute';
import { $ } from '@/core/dom';

export class Header extends ExcelStateComponent {
    static className = 'excel__header'

    constructor( $root, options ) {
        super( $root, {
            name      : 'Header',
            listeners : ['input', 'click'],
            ...options,
        } );
    }

    toHTML() {
        const title = this.store.getState().title || DEFAULT_TITLE;

        return `
            <input type="text" class="input" value="${title}" />
            <div>
                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>
                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>
        `;
    }

    onInput( event ) {
        const $target = event.target;

        this.$dispatch( actions.changeTitle( $target.value ) );
    }

    onClick( event ) {
        const $target = $( event.target );

        if ( $target.data.button === 'remove' ) {
            const decision = confirm('Are you sure?');

            if ( decision ) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`);
                ActiveRoute.navigate('');
            }
        }
        else if ( $target.data.button === 'exit' ) {
            ActiveRoute.navigate('');
        }
    }
}