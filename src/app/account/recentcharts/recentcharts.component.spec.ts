import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentchartsComponent } from './recentcharts.component';

describe('RecentchartsComponent', () => {
  let component: RecentchartsComponent;
  let fixture: ComponentFixture<RecentchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
