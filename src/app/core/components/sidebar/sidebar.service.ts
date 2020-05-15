import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class SidebarService {

    isClose = false;

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle() {
        this.isClose = !this.isClose;
        this.change.emit(this.isClose);
    }
  }