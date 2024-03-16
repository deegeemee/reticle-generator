import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReticleSvgRendererComponent } from './reticle-svg-renderer.component';

describe('ReticleSvgRendererComponent', () => {
  let component: ReticleSvgRendererComponent;
  let fixture: ComponentFixture<ReticleSvgRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReticleSvgRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReticleSvgRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
