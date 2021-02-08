import { debounce } from '@core/utils';

const debounceTimeout = 300;

export class StateProcessor {
    constructor( saver, delay = debounceTimeout ) {
        this.client = saver;
        this.listen = debounce( this.listen.bind( this ), delay );
    }
    listen( state ) {
        this.client.save( state );
    }

    get() {
        return this.client.get();
    }
}