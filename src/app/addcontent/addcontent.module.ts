import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcontentPageRoutingModule } from './addcontent-routing.module';

import { AddcontentPage } from './addcontent.page';
import { ComponentsModule } from '../components/components.module';
import { FormatFileSizePipePipe } from './format-file-size-pipe.pipe'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AddcontentPageRoutingModule,
    
  ],
  declarations: [AddcontentPage, FormatFileSizePipePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AddcontentPageModule {}
