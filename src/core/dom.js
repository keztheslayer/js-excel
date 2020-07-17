class Dom {
    constructor( selector ) {
        this.$el = typeof selector === 'string' 
            ? document.querySelector( selector )
            : selector;
    }

    html( html = '' ) {
        if ( typeof html === 'string' ) {
            this.$el.innerHTML = html;
            
            return this;
        }
        
        return this.$el.outerHTML.trim();
    }
    
    clear() {
        this.html('');

        return this;
    }

    append( node ) {
        let nodeElement = node;

        if ( node instanceof Dom ) {
            nodeElement = node.$el;
        }
        if ( Element.prototype.append ) {
            this.$el.append( nodeElement );
        }
        else {
            this.$el.appendChild( nodeElement );
        }

        return this;
    }

    on( eventType, callback ) {
        this.$el.addEventListener( eventType, callback );
    }

    off( eventType, callback ) {
        this.$el.removeEventListener( eventType, callback );
    }

    getCoords( ) {
        return this.$el.getBoundingClientRect();
    }

    closest( selector ) {
        return $( this.$el.closest( selector ) );
    }

    get data() {
        return this.$el.dataset;
    }

    findAll( selector ) {
        return this.$el.querySelectorAll( selector );
    }
    
    css( styles = {} ) {
        Object.keys( styles ).forEach( rule => {
            this.$el.style[rule] = styles[rule];
        } );
    }
}

export function $( selector ) {
    return new Dom( selector );
}

$.create = ( tagName, classes = '' ) => {
    const el = document.createElement( tagName );

    if ( classes ) {
        el.classList.add( classes );
    }

    return $( el );
};