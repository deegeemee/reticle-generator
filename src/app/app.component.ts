import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('canvas', { static: true })
  readonly canvas!: ElementRef<HTMLCanvasElement>;

  version$ = this.http.request('GET', '/assets/version', { responseType: 'text' }).pipe(
    catchError(() => of('unknown')),
    map(version => version.trim())
  );

  constructor(readonly http: HttpClient) {}

  onDownload(ev: Event) {
    const canvas = this.canvas.nativeElement;
    const svgElem = document.getElementById('reticleSvg');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get 2d context');
      return;
    }

    ev.stopImmediatePropagation();

    const DOMURL = window.URL || window.webkitURL || window;

    const img = new Image(1024, 1024);
    const svg = new Blob([svgElem!.outerHTML], { type: 'image/svg+xml' });
    const url = DOMURL.createObjectURL(svg);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/png');
      const linkElem = (ev.target as HTMLElement).parentElement as HTMLLinkElement;
      linkElem.href = dataUrl;
      
    };


    img.src = url;
  }
}
