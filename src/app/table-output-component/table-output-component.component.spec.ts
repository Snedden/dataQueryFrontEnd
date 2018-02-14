import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOutputComponentComponent } from './table-output-component.component';

describe('TableOutputComponentComponent', () => {
  let component: TableOutputComponentComponent;
  let fixture: ComponentFixture<TableOutputComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOutputComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOutputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
