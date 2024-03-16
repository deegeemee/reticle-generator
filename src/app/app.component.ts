import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';

type ReticleType = {
  size: number;
  axis: AxisType[];
};

type AxisSectionType = {
  enabled: boolean;
  count: number;
  width: number;
  offset: number;
  size: number;
};

type AxisType = {
  enabled: boolean;
  angle: number;
  lineWidth: number;
  offsetStart: number;
  offsetEnd: number;
  sections: AxisSectionType[];
};

type Controls<T> = { [k in keyof T]: Form<T[k]> };
type Form<T> = [T] extends [boolean | number | string | null | undefined]
  ? FormControl<T>
  : [T] extends [(infer U)[]]
  ? FormArray<Form<U>>
  : FormGroup<Controls<T>>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reticle-generator';

  form: Form<ReticleType> = new FormGroup({
    size: new FormControl<number>(1024, {
      validators: [Validators.min(512), Validators.max(4096)],
      nonNullable: true,
    }),
    axis: new FormArray<Form<AxisType>>([this.getAxisForm()]),
  });

  /**
   * Return for group for an axis
   * @returns FormGroup<AxisFormType>
   */
  getAxisForm(value?: AxisType): Form<AxisType> {
    const fg: Form<AxisType> = new FormGroup({
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
      sections: new FormArray(value?.sections.length ? value.sections.map(this.getAxisSectionForm) : []),
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
  getAxisSectionForm(value: AxisSectionType): Form<AxisSectionType> {
    const fg: Form<AxisSectionType> = new FormGroup({
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
