import { Component } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReticleFormComponent } from './reticle-form/reticle-form.component';
import { ReticleSvgRendererComponent } from './reticle-svg-renderer/reticle-svg-renderer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, ReticleFormComponent, ReticleSvgRendererComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reticle-generator';
}
