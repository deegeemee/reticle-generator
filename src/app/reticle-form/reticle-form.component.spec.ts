import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReticleFormComponent } from './reticle-form.component';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
});
