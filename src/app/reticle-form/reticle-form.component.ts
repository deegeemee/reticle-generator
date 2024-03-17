import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, debounceTime, filter, map, startWith } from 'rxjs';
import { AutoForm } from '../form.types';
import { MaterialModule } from '../material.module';
import { AxisMarkerType, AxisType, ReticleType } from '../reticle.types';

export type NumberFormElementSettings<T> = {
  [P in keyof T]: {
    default: number;
    min: number;
    max: number;
  };
};

@Component({
  selector: 'app-reticle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './reticle-form.component.html',
  styleUrl: './reticle-form.component.css',
})
export class ReticleFormComponent {
  readonly axisFormSettings: NumberFormElementSettings<Omit<AxisType, 'markers' | 'enabled'>> = {
    angle: { default: 0, min: 0, max: 360 },
    offsetStart: { default: 256, min: 0, max: 512 },
    offsetEnd: { default: 256, min: 0, max: 512 },
    strokeWidth: { default: 3, min: 1, max: 20 },
  };

  readonly axisMarkerFormSettings: NumberFormElementSettings<Omit<AxisMarkerType, 'enabled'>> = {
    count: { default: 0, min: 0, max: 10 },
    gap: { default: 20, min: 1, max: 100 },
    offset: { default: -10, min: -100, max: 100 },
    length: { default: 20, min: 0, max: 200 },
    strokeWidth: { default: 1, min: 1, max: 20 },
  };

  readonly form: AutoForm<ReticleType> = new FormGroup({
    size: new FormControl<number>(1024, {
      validators: [Validators.min(512), Validators.max(4096)],
      nonNullable: true,
    }),
    axis: new FormArray<AutoForm<AxisType>>([]),
  });

  readonly valueChanges: Observable<ReticleType> = this.form.valueChanges.pipe(
    filter(() => this.form.valid),
    debounceTime(100),
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
      angle: new FormControl<number>(this.axisFormSettings.angle.default, {
        validators: [Validators.min(this.axisFormSettings.angle.min), Validators.max(this.axisFormSettings.angle.max)],
        nonNullable: true,
      }),
      offsetStart: new FormControl<number>(this.axisFormSettings.offsetStart.default, {
        validators: [
          Validators.min(this.axisFormSettings.offsetStart.min),
          Validators.max(this.axisFormSettings.offsetStart.max),
        ],
        nonNullable: true,
      }),
      offsetEnd: new FormControl<number>(this.axisFormSettings.offsetStart.default, {
        validators: [
          Validators.min(this.axisFormSettings.offsetStart.min),
          Validators.max(this.axisFormSettings.offsetStart.max),
        ],
        nonNullable: true,
      }),
      strokeWidth: new FormControl<number>(this.axisFormSettings.strokeWidth.default, {
        validators: [
          Validators.min(this.axisFormSettings.strokeWidth.min),
          Validators.max(this.axisFormSettings.strokeWidth.max),
        ],
        nonNullable: true,
      }),
      markers: new FormArray(value?.markers ? value.markers.map(marker => this.getAxisMarkerForm(marker)) : []),
    });

    if (value) {
      fg.patchValue(value);
    }

    return fg;
  }

  /**
   * Return for group for an axis marker
   * @returns FormGroup<AxisMarkerFormType>
   */
  getAxisMarkerForm(value?: AxisMarkerType): AutoForm<AxisMarkerType> {
    const fg: AutoForm<AxisMarkerType> = new FormGroup({
      enabled: new FormControl<boolean>(true, { nonNullable: true }),
      count: new FormControl<number>(this.axisMarkerFormSettings.count.default, {
        validators: [
          Validators.min(this.axisMarkerFormSettings.count.min),
          Validators.max(this.axisMarkerFormSettings.count.max),
        ],
        nonNullable: true,
      }),
      gap: new FormControl<number>(this.axisMarkerFormSettings.gap.default, {
        validators: [
          Validators.min(this.axisMarkerFormSettings.gap.min),
          Validators.max(this.axisMarkerFormSettings.gap.max),
        ],
        nonNullable: true,
      }),
      offset: new FormControl<number>(this.axisMarkerFormSettings.offset.default, {
        validators: [
          Validators.min(this.axisMarkerFormSettings.offset.min),
          Validators.max(this.axisMarkerFormSettings.offset.max),
        ],
        nonNullable: true,
      }),
      length: new FormControl<number>(this.axisMarkerFormSettings.length.default, {
        validators: [
          Validators.min(this.axisMarkerFormSettings.length.min),
          Validators.max(this.axisMarkerFormSettings.length.max),
        ],
        nonNullable: true,
      }),
      strokeWidth: new FormControl<number>(this.axisMarkerFormSettings.strokeWidth.default, {
        validators: [
          Validators.min(this.axisMarkerFormSettings.strokeWidth.min),
          Validators.max(this.axisMarkerFormSettings.strokeWidth.max),
        ],
        nonNullable: true,
      }),
    });

    if (value) {
      fg.patchValue(value);
    }

    return fg;
  }
}
