export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
    }

    // $el is instanceof DOM
    select( $el ) {
        this.clear();
        this.group.push( $el );
        $el.addClass( TableSelection.className );
    }

    clear() {
        this.group.forEach( $el => {
            $el.removeClass( TableSelection.className );
        } );
        this.group = [];
    }

    selectGroup() {

    }
} 