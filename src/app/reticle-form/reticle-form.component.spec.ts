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

  describe('getAxisForm & getAxisMarkerForm', () => {
    it(`should return a FormGroup`, () => {
      expect(component.getAxisForm()).toBeInstanceOf(FormGroup);
    });

    it(`should return a FormGroup with data`, () => {
      const testData: AxisType = {
        enabled: true,
        angle: 0,
        offsetStart: 256,
        offsetEnd: 256,
        strokeWidth: 3,
        markers: [
          {
            enabled: true,
            count: 4,
            gap: 2,
            offset: 0,
            strokeWidth: 10,
            length: 20,
          },
        ],
      };
      const axis = component.getAxisForm(testData);
      expect(axis.value).toEqual(testData);
    });
  });
});
