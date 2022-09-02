import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherPlaylistSwiperComponent } from './other-playlist-swiper.component';

describe('OtherPlaylistSwiperComponent', () => {
  let component: OtherPlaylistSwiperComponent;
  let fixture: ComponentFixture<OtherPlaylistSwiperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OtherPlaylistSwiperComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherPlaylistSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
