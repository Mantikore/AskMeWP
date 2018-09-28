import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostActiveAuthorsComponent } from './most-active-authors.component';

describe('MostActiveAuthorsComponent', () => {
  let component: MostActiveAuthorsComponent;
  let fixture: ComponentFixture<MostActiveAuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostActiveAuthorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostActiveAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
