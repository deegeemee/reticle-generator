import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AxisMarkerType, AxisType, ReticleType } from '../reticle.types';
import { CommonModule } from '@angular/common';

type MarkerLine = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  stokeWidth: number;
  stroke: string;
};

type MarkerLineId = MarkerLine & {
  id: string;
};

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

  constructor(readonly elementRef: ElementRef) {}

  get svgMarkup() {
    return this.elementRef.nativeElement.firstChild?.outerHTML;
  }

  getAxisMarkers(reticle: ReticleType, axis: AxisType, marker: AxisMarkerType): MarkerLineId[] {
    const center = reticle.size / 2;

    marker.gap = marker.gap ?? 0;

    if (!marker.enabled || !marker.gap) {
      return [];
    }

    const lines: MarkerLine[] = [];

    const line = {
      y1: center + marker.length + marker.offset,
      y2: center + marker.offset,
      stokeWidth: marker.strokeWidth,
      stroke: 'black',
    };

    let curDistance = center;
    while (curDistance <= center + axis.offsetEnd) {
      lines.push({
        ...line,
        x1: curDistance,
        x2: curDistance,
      });
      curDistance += marker.gap;
    }

    curDistance = center;
    while (curDistance >= center - axis.offsetStart) {
      lines.push({
        ...line,
        x1: curDistance,
        x2: curDistance,
      });
      curDistance -= marker.gap;
    }
    return lines.map((line, i) => ({
      ...line,
      id: `axis-${axis.angle}-marker-${i}-line-${line.x1}-${line.y1}-${line.x2}-${line.y2}`,
    }));
  }
}
