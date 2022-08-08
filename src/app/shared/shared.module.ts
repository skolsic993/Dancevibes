import { GoBackButtonComponent } from './go-back-button/go-back-button.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from '../pages/login/login-routing.module';

@NgModule({
  declarations: [InputComponent, HeaderComponent, GoBackButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [InputComponent, HeaderComponent, GoBackButtonComponent],
})
export class SharedModule {}
