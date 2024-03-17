import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ReticleFormComponent } from './reticle-form/reticle-form.component';
import { ReticleSvgRendererComponent } from './reticle-svg-renderer/reticle-svg-renderer.component';
import { SocialBarComponent } from './social-bar/social-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, HttpClientModule, ReticleFormComponent, ReticleSvgRendererComponent, SocialBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reticle-generator';

  version$ = this.http.request('GET', '/assets/version', { responseType: 'text' }).pipe(
    catchError(() => of('unknown')),
    map(version => version.trim())
  );

  constructor(readonly http: HttpClient) {}
}
