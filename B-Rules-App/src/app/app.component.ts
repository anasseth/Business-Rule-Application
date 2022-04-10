import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Business-Rule-Application';
  constructor(private spinner: NgxSpinnerService, public _Global: GlobalService) {
  }
  ngOnInit() {
  }
}
