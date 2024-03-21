import { FormControl, FormArray, FormGroup } from '@angular/forms';

export type AutoFormControls<T> = { [k in keyof T]: AutoForm<T[k]> };
export type AutoForm<T> = [T] extends [boolean | number | string | null | undefined]
  ? FormControl<T>
  : [T] extends [(infer U)[]]
  ? FormArray<AutoForm<U>>
  : FormGroup<AutoFormControls<T>>;

export type FormSettings<T> = {
  [P in keyof T]: T[P] extends number
    ? {
        default: T[P];
        min: number;
        max: number;
      }
    : {
        default: T[P];
      };
};
