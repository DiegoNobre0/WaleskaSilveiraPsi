import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBloggerComponent } from './post-blogger.component';

describe('PostBloggerComponent', () => {
  let component: PostBloggerComponent;
  let fixture: ComponentFixture<PostBloggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostBloggerComponent]
    });
    fixture = TestBed.createComponent(PostBloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
