import { StateProcessor } from '@core/page/StateProcessor';
import { storage } from '@/core/utils';

function storageName( param ) {
    return `excel:${param}`;
}
export class LocalStorageClient extends StateProcessor {
    constructor( name ) {
        super();
        this.name = storageName( name );
    }

    save( state ) {
        storage( this.name, state );
        
        return Promise.resolve();
    }

    get() {
        const requestTimeoutMock = 1500;

        return new Promise( resolve => {
            const state = storage( this.name );

            setTimeout( () => {
                resolve( state );
            }, requestTimeoutMock );
        } );
    }
}