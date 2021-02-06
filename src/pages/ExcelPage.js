import { Page } from '@/core/Page';
import { createStore } from '@/core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { initialState } from '@/redux/initialState';
import { debounce, storage } from '@/core/utils';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';

const debounceTimeout = 300;

export class ExcelPage extends Page {
    getRoot() {
        const store = createStore( rootReducer, initialState );

        const stateListener = debounce( state => {
            storage( 'excel-state', state );
        }, debounceTimeout );

        store.subscribe( stateListener );

        this.excel = new Excel( {
            components : [Header, Toolbar, Formula, Table],
            store,
        } );

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
