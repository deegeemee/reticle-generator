import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AxisSectionType, AxisType, ReticleType } from '../reticle.types';
import { CommonModule } from '@angular/common';

type SectionLine = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  stokeWidth: number;
  stroke: string;
};

type SectionLineId = SectionLine & {
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

  getAxisSections(reticle: ReticleType, axis: AxisType, section: AxisSectionType): SectionLineId[] {
    const center = reticle.size / 2;

    section.gap = section.gap ?? 0;

    if (!section.enabled || !section.gap) {
      return [];
    }

    const lines: SectionLine[] = [];

    const line = {
      y1: center + section.length + section.offset,
      y2: center + section.offset,
      stokeWidth: section.strokeWidth,
      stroke: 'black',
    };

    let curDistance = center;
    while (curDistance <= center + axis.offsetEnd) {
      lines.push({
        ...line,
        x1: curDistance,
        x2: curDistance,
      });
      curDistance += section.gap;
    }

    curDistance = center;
    while (curDistance >= center - axis.offsetStart) {
      lines.push({
        ...line,
        x1: curDistance,
        x2: curDistance,
      });
      curDistance -= section.gap;
    }
    return lines.map((line, i) => ({
      ...line,
      id: `axis-${axis.angle}-section-${i}-line-${line.x1}-${line.y1}-${line.x2}-${line.y2}`,
    }));
  }
}
