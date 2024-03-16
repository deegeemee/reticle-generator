import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AutoForm } from '../form.types';
import { MaterialModule } from '../material.module';
import { AxisSectionType, AxisType, ReticleType } from '../reticle.types';

@Component({
  selector: 'app-reticle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './reticle-form.component.html',
  styleUrl: './reticle-form.component.css',
})
export class ReticleFormComponent {
  readonly form: AutoForm<ReticleType> = new FormGroup({
    size: new FormControl<number>(1024, {
      validators: [Validators.min(512), Validators.max(4096)],
      nonNullable: true,
    }),
    axis: new FormArray<AutoForm<AxisType>>([this.getAxisForm()]),
  });

  readonly valueChanges: Observable<ReticleType> = this.form.valueChanges.pipe(
    startWith(this.form.value),
    // Always map to raw value to ensure full object is emitted
    map(() => this.form.getRawValue() as ReticleType)
  );

  /**
   * Return for group for an axis
   * @returns FormGroup<AxisFormType>
   */
  getAxisForm(value?: AxisType): AutoForm<AxisType> {
    const fg: AutoForm<AxisType> = new FormGroup({
      enabled: new FormControl<boolean>(true, { nonNullable: true }),
      angle: new FormControl<number>(0, {
        validators: [Validators.min(0), Validators.max(360)],
        nonNullable: true,
      }),
      offsetStart: new FormControl<number>(256, {
        validators: [Validators.min(0), Validators.max(360)],
        nonNullable: true,
      }),
      offsetEnd: new FormControl<number>(256, {
        validators: [Validators.min(0), Validators.max(360)],
        nonNullable: true,
      }),
      lineWidth: new FormControl<number>(3, {
        validators: [Validators.min(0), Validators.max(360)],
        nonNullable: true,
      }),
      sections: new FormArray(
        value?.sections.length
          ? value.sections.map(section => this.getAxisSectionForm(section))
          : [this.getAxisSectionForm()]
      ),
    });

    if (value) {
      fg.patchValue(value);
    }

    return fg;
  }

  /**
   * Return for group for an axis section
   * @returns FormGroup<AxisSectionFormType>
   */
  getAxisSectionForm(value?: AxisSectionType): AutoForm<AxisSectionType> {
    const fg: AutoForm<AxisSectionType> = new FormGroup({
      enabled: new FormControl<boolean>(true, { nonNullable: true }),
      count: new FormControl<number>(0, {
        validators: [Validators.min(0), Validators.max(10)],
        nonNullable: true,
      }),
      width: new FormControl<number>(1, {
        validators: [Validators.min(1), Validators.max(10)],
        nonNullable: true,
      }),
      offset: new FormControl<number>(5, {
        validators: [Validators.min(0), Validators.max(10)],
        nonNullable: true,
      }),
      size: new FormControl<number>(10, {
        validators: [Validators.min(0), Validators.max(10)],
        nonNullable: true,
      }),
    });

    if (value) {
      fg.patchValue(value);
    }

    return fg;
  }
}
