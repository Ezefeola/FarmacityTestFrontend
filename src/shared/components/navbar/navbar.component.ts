import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
})

export class NavbarComponent {}