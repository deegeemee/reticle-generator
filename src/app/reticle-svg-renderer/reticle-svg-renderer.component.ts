import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReticleType } from '../reticle.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reticle-svg-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reticle-svg-renderer.component.html',
  styleUrl: './reticle-svg-renderer.component.css',
})
export class ReticleSvgRendererComponent {
  @Input({ required: true })
  reticle$!: Observable<ReticleType>;
}
