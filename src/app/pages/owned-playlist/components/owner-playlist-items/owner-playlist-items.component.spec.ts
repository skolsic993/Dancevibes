import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnerPlaylistItemsComponent } from './owner-playlist-items.component';

describe('OwnerPlaylistItemsComponent', () => {
  let component: OwnerPlaylistItemsComponent;
  let fixture: ComponentFixture<OwnerPlaylistItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerPlaylistItemsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerPlaylistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
