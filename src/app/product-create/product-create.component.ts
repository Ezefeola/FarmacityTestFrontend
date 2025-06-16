import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    inject,
    Output,
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
import { Producto } from '../products-list/interfaces/producto/Producto.interface';
import { BaseApiResponse } from '../../shared/interfaces/BaseApiResponse.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'product-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-create.component.html',
})
export class ProductCreateComponent {
    private httpClient: HttpClient = inject(HttpClient);
    private formBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    public createProductoForm: FormGroup = this.formBuilder.group({
        nombre: ['', Validators.required],
        precio: [0, Validators.required],
        cantidadEnStock: [0, Validators.required],
        codigosBarras: this.formBuilder.array([], Validators.required),
    });

    get codigosBarras(): FormArray<FormControl<string>> {
        return this.createProductoForm.get('codigosBarras') as FormArray<
            FormControl<string>
        >;
    }

    public addCodigoBarra(): void {
        this.codigosBarras.push(
            this.formBuilder.control<string>('', {
                nonNullable: true,
                validators: [Validators.required],
            })
        );
    }

    public onSubmit() {
        const mappedCodigosBarras: {codigo: string}[] = this.codigosBarras.controls.map((value) => ({ codigo: value.value })) 
        this.httpClient
            .post<BaseApiResponse<Producto>>('https://localhost:7126/api/producto', {...this.createProductoForm.value, codigosBarras: mappedCodigosBarras})
            .subscribe({
                next: () => {
                    this.router.navigate([""])
                    
                },
            });
    }
}
