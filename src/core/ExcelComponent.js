import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor( $root, options = {} ) {
        super( $root, options.listeners );
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.prepare();
        this.unsubscribers = [];
    }

    // Sets up the component before an initialiation
    prepare() {
        
    }

    // Returns component's template
    toHTML() {
        return '';
    }

    // Initializes the component
    // Adds DOM listeners
    init() {
        this.initDOMListeners();
    }


    // Removes the component
    // Clears DOM listeners
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach( unsub => unsub() );
    }

    // Notifies listeners about event
    $emit( event, ...args ) {
        this.emitter.emit( event, ...args );
    }

    // Subscribes to an event
    $on( event, fn ) {
        const unsub = this.emitter.subscribe( event, fn );

        this.unsubscribers.push( unsub );
    }
}