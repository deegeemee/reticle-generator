import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReticleSvgRendererComponent } from './reticle-svg-renderer.component';
import { AxisMarkerType, AxisType, ReticleType } from '../reticle.types';
import { of } from 'rxjs';

describe('ReticleSvgRendererComponent', () => {
  let component: ReticleSvgRendererComponent;
  let fixture: ComponentFixture<ReticleSvgRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReticleSvgRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReticleSvgRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAxisMarkers', () => {
    it('should return an empty array if the marker is not enabled', () => {
      const reticle = { size: 1024 } as ReticleType;
      const axis = { offsetStart: 0, offsetEnd: 0 } as AxisType;
      const marker = { enabled: false, gap: 0, length: 0, offset: 0, strokeWidth: 0 } as AxisMarkerType;
      expect(component.getAxisMarkers(reticle, axis, marker)).toEqual([]);
    });

    it('should return an empty array if the marker gap is 0', () => {
      const reticle = { size: 1024 } as ReticleType;
      const axis = { offsetStart: 0, offsetEnd: 0 } as AxisType;
      const marker = { enabled: true, gap: 0, length: 0, offset: 0, strokeWidth: 0 } as AxisMarkerType;
      expect(component.getAxisMarkers(reticle, axis, marker)).toEqual([]);
    });

    it('should return an array of marker lines', () => {
      const reticle = { size: 1024 } as ReticleType;
      const axis = { offsetStart: 0, offsetEnd: 0, angle: 0 } as AxisType;
      const marker = { enabled: true, gap: 100, length: 20, offset: -10, strokeWidth: 1 } as AxisMarkerType;
      expect(component.getAxisMarkers(reticle, axis, marker)).toEqual([
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 612,
          x2: 612,
          id: 'axis-0-marker-0-line-612-522-612-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 712,
          x2: 712,
          id: 'axis-0-marker-1-line-712-522-712-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 812,
          x2: 812,
          id: 'axis-0-marker-2-line-812-522-812-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 912,
          x2: 912,
          id: 'axis-0-marker-3-line-912-522-912-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 1012,
          x2: 1012,
          id: 'axis-0-marker-4-line-1012-522-1012-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 512,
          x2: 512,
          id: 'axis-0-marker-5-line-512-522-512-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 412,
          x2: 412,
          id: 'axis-0-marker-6-line-412-522-412-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 312,
          x2: 312,
          id: 'axis-0-marker-7-line-312-522-312-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 212,
          x2: 212,
          id: 'axis-0-marker-8-line-212-522-212-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 112,
          x2: 112,
          id: 'axis-0-marker-9-line-112-522-112-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          stroke: 'black',
          x1: 12,
          x2: 12,
          id: 'axis-0-marker-10-line-12-522-12-502',
        },
      ]);
    });
  });

  describe('svgMarkup', () => {
    it('should return the outerHTML of the first child of the elementRef', () => {
      component.reticle$ = of({ size: 1024, axis: [], circles: [] } as ReticleType);
      fixture.detectChanges();
      expect(component.svgMarkup).toEqual(
        '<svg id="reticleSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><!--container--><!--container--></svg>'
      );
    });
  });
});
