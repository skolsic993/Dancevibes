import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherPlaylistsComponent } from './other-playlists.component';

describe('OtherPlaylistsComponent', () => {
  let component: OtherPlaylistsComponent;
  let fixture: ComponentFixture<OtherPlaylistsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPlaylistsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
