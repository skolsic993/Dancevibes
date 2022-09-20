import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IntroPageRoutingModule } from '../pages/home-page/intro-routing.module';
import { HeaderComponent } from './header/header.component';
import { MiniHeaderComponent } from './mini-header/mini-header.component';

@NgModule({
  declarations: [HeaderComponent, MiniHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, MiniHeaderComponent],
})
export class SharedModule {}
