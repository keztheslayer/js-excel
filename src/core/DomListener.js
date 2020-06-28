export class DomListener {
    constructor( $root, listeners = [] ) {
        if ( !$root ) {
            throw new Error('No $root provided for DOM Listener');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        
    }

    removeDOMListeners() {

    }
}