import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models';

@Component({
  selector: 'app-crawl-opening',
  templateUrl: './crawl-opening.component.html',
  styleUrls: ['./crawl-opening.component.scss']
})
export class CrawlOpeningComponent implements OnInit {

  @Input() film: Film;

  constructor() { }

  ngOnInit(): void {
  }

}
