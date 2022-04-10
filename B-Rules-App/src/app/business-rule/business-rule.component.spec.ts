import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRuleComponent } from './business-rule.component';

describe('BusinessRuleComponent', () => {
  let component: BusinessRuleComponent;
  let fixture: ComponentFixture<BusinessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
