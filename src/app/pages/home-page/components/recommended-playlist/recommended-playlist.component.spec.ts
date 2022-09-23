import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendedPlaylistComponent } from './recommended-playlist.component';

describe('RecommendedPlaylistComponent', () => {
  let component: RecommendedPlaylistComponent;
  let fixture: ComponentFixture<RecommendedPlaylistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedPlaylistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
