import { HttpClient } from '@angular/common/http';
import {
    Component,
    inject,
    OnInit,
    signal,
    WritableSignal,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseApiResponse } from '../../shared/interfaces/BaseApiResponse.interface';
import { Producto } from '../products-list/interfaces/producto/Producto.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CodigoBarraUpdate } from './interfaces/CodigoBarraUpdate.interface';

type CodigoBarraFormGroup = FormGroup<{
    codigo: FormControl<string>;
    codigoBarraId: FormControl<number | null>;
}>;

@Component({
    selector: 'app-product-update',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
    public producto: WritableSignal<Producto | null> = signal(null);
    private httpClient: HttpClient = inject(HttpClient);
    private formBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route = inject(ActivatedRoute);
    productoId = toSignal(
        this.route.params.pipe(map((params) => Number(params['productoId']))),
        { initialValue: null }
    );

    public updateProductoForm: FormGroup = this.formBuilder.group({
        nombre: ['', Validators.required],
        precio: [0, Validators.required],
        cantidadEnStock: [0, Validators.required],
        codigosBarras: this.formBuilder.array<CodigoBarraFormGroup>(
            [],
        ),
    });

    get codigosBarras(): FormArray<CodigoBarraFormGroup> {
        return this.updateProductoForm.get(
            'codigosBarras'
        ) as FormArray<CodigoBarraFormGroup>;
    }

    public addCodigoBarra(): void {
        this.codigosBarras.push(
            this.formBuilder.group({
                codigo: this.formBuilder.control<string>('', {
                    nonNullable: true,
                    validators: [Validators.required],
                }),
                codigoBarraId: this.formBuilder.control<number | null>(null),
            }) as CodigoBarraFormGroup
        );
    }

    getChangedFields<T>(original: T, updated: Partial<T>): Partial<T> {
        const changes: Partial<T> = {};

        for (const key in updated) {
            if (!Object.prototype.hasOwnProperty.call(updated, key)) continue;

            const originalValue = (original as any)[key];
            const updatedValue = (updated as any)[key];

            if (originalValue !== updatedValue) {
                changes[key] = updatedValue;
            }
        }

        return changes;
    }

    public deleteCodigoBarra(index: number, codigoBarraId?: number) {
        if (!codigoBarraId) {
            this.codigosBarras.removeAt(index);
        }
        if (codigoBarraId) {
            this.httpClient
                .delete(
                    `https://localhost:7126/api/producto/${this.productoId()}/codigos-barras?codigoBarraIds=${codigoBarraId}`
                )
                .subscribe({
                    next: () => {
                        this.codigosBarras.removeAt(index);
                    },
                });
        }
    }

    public onSubmit() {
        const data = this.updateProductoForm.value;
        const original = this.producto();

        const patchedData = this.getChangedFields(original, data);

        this.httpClient
            .patch<BaseApiResponse<Producto>>(
                `https://localhost:7126/api/producto/${this.productoId()}`,
                patchedData
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['']);
                },
            });
    }

    ngOnInit(): void {
        this.httpClient
            .get<BaseApiResponse<Producto>>(
                `https://localhost:7126/api/producto/${this.productoId()}`
            )
            .subscribe({
                next: (data) => {
                    const producto = data.payload;
                    this.producto.set(producto);

                    this.updateProductoForm.patchValue({
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidadEnStock: producto.cantidadEnStock,
                    });

                    for (const codigo of producto.codigosBarras) {
                        this.codigosBarras.push(
                            this.formBuilder.group(
                                {
                                    codigo: this.formBuilder.control<string>(
                                        codigo.codigo,
                                        {
                                            nonNullable: true,
                                            validators: [Validators.required],
                                        }
                                    ),
                                    codigoBarraId: this.formBuilder.control<
                                        number | null
                                    >(codigo.codigoBarraId),
                                },
                                {
                                    nonNullable: true,
                                    validators: [Validators.required],
                                }
                            )
                        );
                    }
                },
            });
    }
}
