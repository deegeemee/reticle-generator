import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reticle-generator';

  form = new FormGroup({
    size: new FormControl<number>(1024, { validators: [Validators.min(512), Validators.max(4096)] }),
    lineWidth: new FormControl<number>(1, { validators: [Validators.min(512), Validators.max(4096)] }),
    offsetLeft: new FormControl<number>(0, { validators: [Validators.min(512), Validators.max(4096)] }),
    offsetRight: new FormControl<number>(0, { validators: [Validators.min(512), Validators.max(4096)] }),
    offsetTop: new FormControl<number>(0, { validators: [Validators.min(512), Validators.max(4096)] }),
    offsetBottom: new FormControl<number>(0, { validators: [Validators.min(512), Validators.max(4096)] }),
    horEndingSize: new FormControl<number>(0, { validators: [Validators.min(512), Validators.max(4096)] }),
    vertEndingSize: new FormControl<number>(0, { validators: [Validators.min(512), Validators.max(4096)] }),
  });

}
