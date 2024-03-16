import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReticleFormComponent } from './reticle-form.component';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AxisType } from '../reticle.types';

describe('ReticleFormComponent', () => {
  let component: ReticleFormComponent;
  let fixture: ComponentFixture<ReticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReticleFormComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ReticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be defined as a FormGroup`, () => {
    expect(component.form).toBeInstanceOf(FormGroup);
  });

  it(`should have a size FormControl`, () => {
    expect(component.form.controls.size).toBeInstanceOf(FormControl);
  });

  it(`should have a paddingX FormControl`, () => {
    expect(component.form.controls.axis).toBeInstanceOf(FormArray);
  });

  describe('getAxisForm & getAxisSectionForm', () => {
    it(`should return a FormGroup`, () => {
      expect(component.getAxisForm()).toBeInstanceOf(FormGroup);
    });

    it(`should return a FormGroup with data`, () => {
      const testData: AxisType = {
        enabled: true,
        angle: 0,
        offsetStart: 256,
        offsetEnd: 256,
        lineWidth: 3,
        sections: [
          {
            enabled: true,
            count: 4,
            width: 2,
            offset: 0,
            size: 10,
          },
        ],
      };
      const axis = component.getAxisForm(testData);
      expect(axis.value).toEqual(testData);
    });
  });
});
