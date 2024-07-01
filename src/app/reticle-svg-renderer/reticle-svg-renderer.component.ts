import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AxisMarkerType, AxisType, ReticleType } from '../reticle.types';

type MarkerLine = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  textX: number;
  textY: number;
  stokeWidth: number;
  color: string;
  renderNumber: string;
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

  getAxisMarkerLines(reticle: ReticleType, axis: AxisType, marker: AxisMarkerType): MarkerLineId[] {
    const center = reticle.size / 2;

    if (!marker.enabled || !marker.gap) {
      return [];
    }

    const textOffset = 6;
    const isVertical = axis.angle === 90 || axis.angle === 270;

    const textAdjust = isVertical ? textOffset : -textOffset;

    const lines: MarkerLine[] = [];

    const line = {
      y1: center + marker.length + marker.offset,
      y2: center + marker.offset,
      stokeWidth: marker.strokeWidth,
      color: marker.color,
    };

    let index = 1;
    let curDistance = center + marker.gap;
    while (curDistance <= reticle.size - axis.offsetEnd && (marker.maxCount === 0 || index < marker.maxCount + 1)) {
      lines.push({
        ...line,
        x1: curDistance,
        x2: curDistance,
        textX: curDistance + textAdjust,
        textY: line.y1,
        renderNumber: index ? `${index}` : '',
      });
      curDistance += marker.gap;
      index++;
    }

    curDistance = center;
    index = 0;
    while (curDistance >= axis.offsetStart && (marker.maxCount === 0 || index < marker.maxCount + 1)) {
      lines.push({
        ...line,
        x1: curDistance,
        x2: curDistance,
        textX: curDistance + textAdjust,
        textY: line.y1,
        renderNumber: index ? `${index}` : '',
      });
      curDistance -= marker.gap;
      index++;
    }

    return lines.map((line, i) => ({
      ...line,
      id: `axis-${axis.angle}-marker-${i}-line-${line.x1}-${line.y1}-${line.x2}-${line.y2}`,
    }));
  }
}
