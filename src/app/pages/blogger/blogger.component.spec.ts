import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerComponent } from './blogger.component';

describe('BloggerComponent', () => {
  let component: BloggerComponent;
  let fixture: ComponentFixture<BloggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloggerComponent]
    });
    fixture = TestBed.createComponent(BloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
