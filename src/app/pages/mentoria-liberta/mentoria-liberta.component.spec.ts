import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoriaLibertaComponent } from './mentoria-liberta.component';

describe('MentoriaLibertaComponent', () => {
  let component: MentoriaLibertaComponent;
  let fixture: ComponentFixture<MentoriaLibertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentoriaLibertaComponent]
    });
    fixture = TestBed.createComponent(MentoriaLibertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
