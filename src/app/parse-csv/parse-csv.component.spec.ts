import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseCsvComponent } from './parse-csv.component';

describe('ParseCsvComponent', () => {
  let component: ParseCsvComponent;
  let fixture: ComponentFixture<ParseCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParseCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
