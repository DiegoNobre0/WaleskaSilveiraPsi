import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCommentComponent } from './reject-comment.component';

describe('RejectCommentComponent', () => {
  let component: RejectCommentComponent;
  let fixture: ComponentFixture<RejectCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectCommentComponent]
    });
    fixture = TestBed.createComponent(RejectCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
