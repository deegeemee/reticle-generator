import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

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

  it(`should a .svg div`, () => {
    expect(de.query(By.css('.svg'))).toBeTruthy();
  });

  it(`should a .form div`, () => {
    expect(de.query(By.css('.form'))).toBeTruthy();
  });


  describe('form', () => {
    it(`should be defined as a FormGroup`, () => {
      expect(ci.form).toBeInstanceOf(FormGroup);
    });

    it(`should have a size FormControl`, () => {
      expect(ci.form.controls.size).toBeInstanceOf(FormControl);
    });

    it(`should have a lineWidth FormControl`, () => {
      expect(ci.form.controls.lineWidth).toBeInstanceOf(FormControl);
    });

    it(`should have a offsetLeft FormControl`, () => {
      expect(ci.form.controls.offsetLeft).toBeInstanceOf(FormControl);
    });

    it(`should have a offsetRight FormControl`, () => {
      expect(ci.form.controls.offsetRight).toBeInstanceOf(FormControl);
    });

    it(`should have a offsetTop FormControl`, () => {
      expect(ci.form.controls.offsetTop).toBeInstanceOf(FormControl);
    });

    it(`should have a offsetBottom FormControl`, () => {
      expect(ci.form.controls.offsetBottom).toBeInstanceOf(FormControl);
    });

  });

});
