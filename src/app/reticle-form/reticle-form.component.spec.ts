import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AxisMarkerType, AxisType, CircleType } from '../reticle.types';
import { ReticleFormComponent } from './reticle-form.component';

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

  describe('getAxisForm', () => {
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
        color: '#000000',
        markers: [
          {
            enabled: true,
            maxCount: 4,
            gap: 2,
            offset: 0,
            strokeWidth: 10,
            length: 20,
            numbered: true,
            color: '#000000',
          },
        ],
      };
      const axis = component.getAxisForm(testData);
      expect(axis.value).toEqual(testData);
    });
  });

  describe('getAxisMarkerForm', () => {
    it(`should return a FormGroup`, () => {
      expect(component.getAxisMarkerForm()).toBeInstanceOf(FormGroup);
    });

    it(`should return a FormGroup with data`, () => {
      const testData: AxisMarkerType = {
        enabled: true,
        maxCount: 4,
        gap: 2,
        offset: 0,
        length: 20,
        strokeWidth: 10,
        numbered: true,
        color: '#000000',
      };
      const axisMarker = component.getAxisMarkerForm(testData);
      expect(axisMarker.value).toEqual(testData);
    });
  });

  describe('getCircleForm', () => {
    it(`should return a FormGroup`, () => {
      expect(component.getCircleForm()).toBeInstanceOf(FormGroup);
    });

    it(`should return a FormGroup with data`, () => {
      const testData: CircleType = {
        enabled: true,
        radius: 200,
        strokeWidth: 3,
        color: '#000000',
      };
      const circle = component.getCircleForm(testData);
      expect(circle.value).toEqual(testData);
    });
  });
});
