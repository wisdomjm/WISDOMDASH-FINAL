import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common'

import { SideMenuComponent } from "./side-menu/side-menu.component";
import { ContentsComponent } from "./contents/contents.component";
import { CursosActivosComponent } from "./cursos-activos/cursos-activos.component";
import { AgregarcursosComponent } from "./agregarcursos/agregarcursos.component";
import { ChatsComponent } from "./chats/chats.component";
import { RegistrodepagosComponent } from "./registrodepagos/registrodepagos.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations:[
        SideMenuComponent,
        ContentsComponent,
        CursosActivosComponent,
        AgregarcursosComponent,
        ChatsComponent,
        RegistrodepagosComponent
    ],
    exports:[
        SideMenuComponent,
        ContentsComponent,
        CursosActivosComponent,
        AgregarcursosComponent,
        ChatsComponent,
        RegistrodepagosComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule{}

