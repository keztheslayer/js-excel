import { Router } from './Router';
import { Page } from '../Page';

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement('div');

        root.innerHTML = 'dashboard';

        return root;
    }
}
class ExcelPage extends Page {}

describe( 'Router:', () => {
    let router;

    let selector;

    beforeEach( () => {
        selector = document.createElement('div'); 
        router = new Router( selector, {
            dashboard : DashboardPage,
            excel     : ExcelPage,
        } );
    } );

    it( 'should be defined', () => {
        expect( router ).toBeDefined();
    } );

    it( 'should render Dashboard Page', () => {
        router.changePageHandler();

        expect( selector.innerHTML ).toBe('<div>dashboard</div>');
    } );
} );