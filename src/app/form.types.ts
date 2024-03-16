import { FormControl, FormArray, FormGroup } from '@angular/forms';

export type AutoFormControls<T> = { [k in keyof T]: AutoForm<T[k]> };
export type AutoForm<T> = [T] extends [boolean | number | string | null | undefined]
  ? FormControl<T>
  : [T] extends [(infer U)[]]
  ? FormArray<AutoForm<U>>
  : FormGroup<AutoFormControls<T>>;
