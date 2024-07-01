import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReticleFormComponent } from './reticle-form/reticle-form.component';
import { ReticleSvgRendererComponent } from './reticle-svg-renderer/reticle-svg-renderer.component';
import { ReticleType } from './reticle.types';

describe('AppComponent', () => {
  // The fixture of the component
  // Gets set after the component is created
  let fix: ComponentFixture<AppComponent>;

  // The instance of the component
  // Gets set after the component is created
  let ci: AppComponent;

  // The debugElement of the component
  // Gets set after the component is created
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fix = TestBed.createComponent(AppComponent);
    ci = fix.componentInstance;
    de = fix.debugElement;
  });

  it('should create the app', () => {
    expect(ci).toBeTruthy();
  });

  it(`should have the 'reticle-generator' title`, () => {
    expect(ci.title).toEqual('reticle-generator');
  });

  it(`should have a ReticleSvgRendererComponent component`, () => {
    expect(de.query(By.directive(ReticleSvgRendererComponent))).toBeTruthy();
  });

  it(`should have a header`, () => {
    expect(de.query(By.css('header'))).toBeTruthy();
  });

  it(`should have a ReticleFormComponent`, () => {
    expect(de.query(By.directive(ReticleFormComponent))).toBeTruthy();
  });

  describe('onDownloadReticle', () => {
    beforeEach(async () => {
      const fakeContext2d = {
        drawImage: jest.fn(),
      };

      window.OffscreenCanvas = jest.fn().mockImplementation((width: number, height: number) => {
        return {
          height,
          width,
          oncontextlost: jest.fn(),
          oncontextrestored: jest.fn(),
          getContext: jest.fn(() => fakeContext2d),
          convertToBlob: jest.fn(),
          transferToImageBitmap: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        } as unknown as OffscreenCanvas;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).URL = {
        createObjectURL: jest.fn(),
        revokeObjectURL: jest.fn(),
      } as unknown as URL;
    });
    it('should render the svg and trigger the download', done => {
      jest.spyOn(ci.svgRenderer, 'svgMarkup', 'get').mockReturnValue('<svg></svg>');
      ci.onDownloadReticle({ size: 1024 } as ReticleType, ci.svgRenderer);
      expect(window.URL.createObjectURL).toHaveBeenCalled();
      done();
    });
  });
});
