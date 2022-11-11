import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SearchPageComponent } from './search-page.component';

import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [SearchPageComponent],
})
export class SearchPageModule {}
