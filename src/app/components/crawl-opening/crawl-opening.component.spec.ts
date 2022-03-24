import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlOpeningComponent } from './crawl-opening.component';

describe('CrawlOpeningComponent', () => {
  let component: CrawlOpeningComponent;
  let fixture: ComponentFixture<CrawlOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrawlOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
