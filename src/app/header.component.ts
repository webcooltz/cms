import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['app.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
