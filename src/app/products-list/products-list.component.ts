import { HttpClient } from '@angular/common/http';
import {
    Component,
    inject,
    OnInit,
    signal,
    WritableSignal,
} from '@angular/core';
import { Producto } from './interfaces/producto/Producto.interface';
import { GetProductsResponse } from './interfaces/api/GetProductsResponse.interface';
import { BaseApiResponse } from '../../shared/interfaces/BaseApiResponse.interface';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'products-list',
    standalone: true,
    imports: [
        NgClass,
        CommonModule,
        RouterLink
    ],
    templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
    private httpClient: HttpClient = inject(HttpClient);

    public ngOnInit(): void {
        this.getProducts();
    }

    public productos: WritableSignal<Producto[]> = signal<Producto[]>([]);

    
    public async deleteProduct(productId: number ) {
        this.httpClient
            .delete(`https://localhost:7126/api/producto/${productId}`)
            .subscribe({
                next: () => {
                    this.productos.update(previousProductos => previousProductos.filter(producto => producto.productoId !== productId ) )
                }
            })
    }

    public async getProducts() {
        this.httpClient
            .get<BaseApiResponse<GetProductsResponse>>('https://localhost:7126/api/producto')
            .subscribe({
                next: (data: BaseApiResponse<GetProductsResponse>) => {
                    this.productos.set(data.payload?.items);
                },
            });
    }
}
