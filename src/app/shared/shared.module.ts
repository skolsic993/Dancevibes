import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IntroPageRoutingModule } from '../pages/home-page/intro-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { MiniHeaderComponent } from './mini-header/mini-header.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MiniHeaderComponent,
    StatusBarComponent,
    HomeButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    MiniHeaderComponent,
    StatusBarComponent,
    HomeButtonComponent,
  ],
})
export class SharedModule {}
