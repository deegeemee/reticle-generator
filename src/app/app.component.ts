import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ReticleFormComponent } from './reticle-form/reticle-form.component';
import { ReticleSvgRendererComponent } from './reticle-svg-renderer/reticle-svg-renderer.component';
import { SocialBarComponent } from './social-bar/social-bar.component';
import { ReticleType } from './reticle.types';
import posthog from 'posthog-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, ReticleFormComponent, ReticleSvgRendererComponent, SocialBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reticle-generator';

  @ViewChild('canvas', { static: true })
  readonly canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('svgRenderer', { static: true })
  readonly svgRenderer!: ReticleSvgRendererComponent;

  version$ = this.http.request('GET', '/assets/version', { responseType: 'text' }).pipe(
    catchError(() => of('unknown')),
    map(version => version.trim())
  );

  constructor(readonly http: HttpClient) {}

  /* istanbul ignore next */
  onDownloadReticle(reticle: ReticleType, svgRenderer: ReticleSvgRendererComponent) {
    const canvas = new OffscreenCanvas(reticle.size, reticle.size);
    const ctx = canvas.getContext('2d');

    /* istanbul ignore if */
    if (!ctx) {
      console.error('Failed to get 2d context');
      return;
    }

    const imageElement: HTMLImageElement = new Image(reticle.size, reticle.size);
    const svgBlob = new Blob([svgRenderer.svgMarkup], { type: 'image/svg+xml' });
    const svgBlobUrl = URL.createObjectURL(svgBlob);

    // When the image is loaded, draw it to the canvas
    imageElement.onload = () => {
      ctx.drawImage(imageElement, 0, 0);
      URL.revokeObjectURL(svgBlobUrl);

      // Convert the canvas to blob and download it via newly created link element
      canvas.convertToBlob({ type: 'image/png' }).then(canvasBlob => {
        const canvasBlobUrl = URL.createObjectURL(canvasBlob);

        const linkElement = document.createElement('a');
        linkElement.style.display = 'none';
        linkElement.href = canvasBlobUrl;
        linkElement.download = 'reticle.png';
        document.body.appendChild(linkElement);
        linkElement.click();

        // Clean up the link element and blob url
        setTimeout(() => {
          URL.revokeObjectURL(linkElement.href);
          document.body.removeChild(linkElement);
          posthog.capture('reticle downloaded', { size: reticle.size });
        });
      });
    };

    // Kick off the image loading
    imageElement.src = svgBlobUrl;
  }
}
