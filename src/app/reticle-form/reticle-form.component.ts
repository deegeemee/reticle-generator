import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, debounceTime, filter, map, share, startWith } from 'rxjs';
import { AutoForm, FormSettings } from '../form.types';
import { MaterialModule } from '../material.module';
import { AxisMarkerType, AxisType, CircleType, ReticleType } from '../reticle.types';

@Component({
  selector: 'app-reticle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './reticle-form.component.html',
  styleUrl: './reticle-form.component.css',
})
export class ReticleFormComponent implements OnInit {
  @Output()
  readonly downloadButtonClicked = new EventEmitter<ReticleType>();

  readonly axisFormSettings: FormSettings<Omit<AxisType, 'markers' | 'enabled'>> = {
    angle: { default: 0, min: 0, max: 360 },
    offsetStart: { default: 10, min: 0, max: 1024 },
    offsetEnd: { default: 10, min: 0, max: 1024 },
    strokeWidth: { default: 3, min: 1, max: 20 },
    color: { default: '#000000' },
  };

  readonly circleFormSettings: FormSettings<Omit<CircleType, 'enabled'>> = {
    radius: { default: 500, min: 0, max: 1000 },
    strokeWidth: { default: 3, min: 1, max: 20 },
    color: { default: '#000000' },
  };

  readonly axisMarkerFormSettings: FormSettings<Omit<AxisMarkerType, 'enabled'>> = {
    maxCount: { default: 4, min: 0, max: 10 },
    gap: { default: 100, min: 1, max: 1024 },
    offset: { default: -20, min: -1024, max: 1024 },
    length: { default: 40, min: 0, max: 200 },
    strokeWidth: { default: 1, min: 1, max: 20 },
    numbered: { default: true },
    color: { default: '#000000' },
  };

  readonly form: AutoForm<ReticleType> = new FormGroup({
    size: new FormControl<number>(1024, {
      validators: [Validators.min(512), Validators.max(4096)],
      nonNullable: true,
    }),
    axis: new FormArray<AutoForm<AxisType>>([]),
    circles: new FormArray<AutoForm<CircleType>>([]),
  });

  reticleHasContent$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    debounceTime(100),
    map(
      () => this.form.value.axis?.some(axis => axis.enabled) || this.form.value.circles?.some(circle => circle.enabled)
    ),
    share()
  );

  readonly validValueChanges: Observable<ReticleType> = this.form.valueChanges.pipe(
    filter(() => this.form.valid),
    debounceTime(50),
    startWith(this.form.value),
    // Always map to raw value to ensure full object is emitted
    map(() => this.form.getRawValue() as ReticleType)
  );

  ngOnInit(): void {
    this.form.controls.axis.setControl(0, this.getAxisForm());
    this.form.controls.axis.at(0).controls.markers.setControl(0, this.getAxisMarkerForm());
    this.form.controls.axis.setControl(1, this.getAxisForm({ angle: 90 }));
    this.form.controls.axis.at(1).controls.markers.setControl(0, this.getAxisMarkerForm());
    this.form.controls.circles.setControl(0, this.getCircleForm());
  }

  /**
   * Return for group for an axis
   * @returns FormGroup<AxisFormType>
   */
  getAxisForm(value?: Partial<AxisType>): AutoForm<AxisType> {
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
      color: new FormControl<string>(this.axisFormSettings.color.default, { nonNullable: true }),
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
  getAxisMarkerForm(value?: Partial<AxisMarkerType>): AutoForm<AxisMarkerType> {
    const fg: AutoForm<AxisMarkerType> = new FormGroup({
      enabled: new FormControl<boolean>(true, { nonNullable: true }),
      maxCount: new FormControl<number>(this.axisMarkerFormSettings.maxCount.default, {
        validators: [
          Validators.min(this.axisMarkerFormSettings.maxCount.min),
          Validators.max(this.axisMarkerFormSettings.maxCount.max),
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
      numbered: new FormControl<boolean>(this.axisMarkerFormSettings.numbered.default, { nonNullable: true }),
      color: new FormControl<string>(this.axisFormSettings.color.default, { nonNullable: true }),
    });

    if (value) {
      fg.patchValue(value);
    }

    return fg;
  }

  getCircleForm(value?: Partial<CircleType>): AutoForm<CircleType> {
    const fg: AutoForm<CircleType> = new FormGroup({
      enabled: new FormControl<boolean>(true, { nonNullable: true }),
      radius: new FormControl<number>(this.circleFormSettings.radius.default, {
        validators: [
          Validators.min(this.circleFormSettings.radius.min),
          Validators.max(this.circleFormSettings.radius.max),
        ],
        nonNullable: true,
      }),
      strokeWidth: new FormControl<number>(this.circleFormSettings.strokeWidth.default, {
        validators: [
          Validators.min(this.circleFormSettings.strokeWidth.min),
          Validators.max(this.circleFormSettings.strokeWidth.max),
        ],
        nonNullable: true,
      }),
      color: new FormControl<string>(this.axisFormSettings.color.default, { nonNullable: true }),
    });

    if (value) {
      fg.patchValue(value);
    }

    return fg;
  }
}
