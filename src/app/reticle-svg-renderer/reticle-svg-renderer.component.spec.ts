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
      expect(component.getAxisMarkerLines(reticle, axis, marker)).toEqual([]);
    });

    it('should return an empty array if the marker gap is 0', () => {
      const reticle = { size: 1024 } as ReticleType;
      const axis = { offsetStart: 0, offsetEnd: 0 } as AxisType;
      const marker = { enabled: true, gap: 0, length: 0, offset: 0, strokeWidth: 0 } as AxisMarkerType;
      expect(component.getAxisMarkerLines(reticle, axis, marker)).toEqual([]);
    });

    it('should return an array of marker lines', () => {
      const reticle = { size: 1024 } as ReticleType;
      const axis = { offsetStart: 0, offsetEnd: 0, angle: 0 } as AxisType;
      const marker = {
        enabled: true,
        gap: 100,
        maxCount: 4,
        length: 20,
        offset: -10,
        strokeWidth: 1,
        color: '#000000',
      } as AxisMarkerType;

      const result = component.getAxisMarkerLines(reticle, axis, marker);
      expect(result).toEqual([
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 612,
          x2: 612,
          textX: 606,
          textY: 522,
          renderNumber: '1',
          id: 'axis-0-marker-0-line-612-522-612-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 712,
          x2: 712,
          textX: 706,
          textY: 522,
          renderNumber: '2',
          id: 'axis-0-marker-1-line-712-522-712-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 812,
          x2: 812,
          textX: 806,
          textY: 522,
          renderNumber: '3',
          id: 'axis-0-marker-2-line-812-522-812-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 912,
          x2: 912,
          textX: 906,
          textY: 522,
          renderNumber: '4',
          id: 'axis-0-marker-3-line-912-522-912-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 512,
          x2: 512,
          textX: 506,
          textY: 522,
          renderNumber: '',
          id: 'axis-0-marker-4-line-512-522-512-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 412,
          x2: 412,
          textX: 406,
          textY: 522,
          renderNumber: '1',
          id: 'axis-0-marker-5-line-412-522-412-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 312,
          x2: 312,
          textX: 306,
          textY: 522,
          renderNumber: '2',
          id: 'axis-0-marker-6-line-312-522-312-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 212,
          x2: 212,
          textX: 206,
          textY: 522,
          renderNumber: '3',
          id: 'axis-0-marker-7-line-212-522-212-502',
        },
        {
          y1: 522,
          y2: 502,
          stokeWidth: 1,
          color: '#000000',
          x1: 112,
          x2: 112,
          textX: 106,
          textY: 522,
          renderNumber: '4',
          id: 'axis-0-marker-8-line-112-522-112-502',
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
