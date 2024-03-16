import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReticleFormComponent } from './reticle-form/reticle-form.component';
import { ReticleSvgRendererComponent } from './reticle-svg-renderer/reticle-svg-renderer.component';

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

  it(`should a ReticleSvgRendererComponent component`, () => {
    expect(de.query(By.directive(ReticleSvgRendererComponent))).toBeTruthy();
  });

  it(`should have a header`, () => {
    expect(de.query(By.css('header'))).toBeTruthy();
  });

  it(`should have ReticleFormComponent`, () => {
    expect(de.query(By.directive(ReticleFormComponent))).toBeTruthy();
  });
});
