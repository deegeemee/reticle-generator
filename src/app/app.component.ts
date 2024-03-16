import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';

type AxisSectionFormType = {
  angle: FormControl<number | null>;
  enabled: FormControl<boolean | null>;
  count: FormControl<number | null>;
  width: FormControl<number | null>;
  offset: FormControl<number | null>;
  size: FormControl<number | null>;
};

type AxisFormType = {
  enabled: FormControl<boolean | null>;
  line: FormControl<boolean | null>;
  sections: FormArray<FormGroup<AxisSectionFormType>>;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reticle-generator';

  form = new FormGroup({
    size: new FormControl<number>(1024, {
      validators: [Validators.min(512), Validators.max(4096)],
    }),
    lineWidth: new FormControl<number>(1, {
      validators: [Validators.min(512), Validators.max(4096)],
    }),
    offsetLeft: new FormControl<number>(0, {
      validators: [Validators.min(512), Validators.max(4096)],
    }),
    offsetRight: new FormControl<number>(0, {
      validators: [Validators.min(512), Validators.max(4096)],
    }),
    offsetTop: new FormControl<number>(0, {
      validators: [Validators.min(512), Validators.max(4096)],
    }),
    offsetBottom: new FormControl<number>(0, {
      validators: [Validators.min(512), Validators.max(4096)],
    }),
    axis: new FormArray<FormGroup<AxisFormType>>([]),
  });

  /**
   * Return for group for an axis
   * @returns FormGroup<AxisFormType>
   */
  private getAxisForm(): FormGroup<AxisFormType> {
    return new FormGroup({
      enabled: new FormControl<boolean>(true),
      line: new FormControl<boolean>(true),
      sections: new FormArray([
        this.getAxisSectionForm(),
      ]),
    });
  }

  /**
   * Return for group for an axis section
   * @returns FormGroup<AxisSectionFormType>
   */
  private getAxisSectionForm(): FormGroup<AxisSectionFormType> {
    return new FormGroup<AxisSectionFormType>({
      angle: new FormControl<number>(0, { validators: [Validators.min(0), Validators.max(360)] }),
      enabled: new FormControl<boolean>(true),
      count: new FormControl<number>(0, {
        validators: [Validators.min(0), Validators.max(10)],
      }),
      width: new FormControl<number>(1, {
        validators: [Validators.min(1), Validators.max(10)],
      }),
      offset: new FormControl<number>(5, {
        validators: [Validators.min(0), Validators.max(10)],
      }),
      size: new FormControl<number>(10, {
        validators: [Validators.min(0), Validators.max(10)],
      }),
    });
  }
}
