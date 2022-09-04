import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IntroPageRoutingModule } from '../pages/login/intro-routing.module';
import { GoBackButtonComponent } from './go-back-button/go-back-button.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [InputComponent, HeaderComponent, GoBackButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [InputComponent, HeaderComponent, GoBackButtonComponent],
})
export class SharedModule {}
