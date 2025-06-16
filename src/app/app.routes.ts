import { Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent
    },
    {
        path: 'producto/create',
        component: ProductCreateComponent,
    },
    {
        path: "producto/edit/:productoId",
        component: ProductUpdateComponent
    }
];
