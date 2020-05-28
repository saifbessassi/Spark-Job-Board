import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class SidebarService {

    isClose = false;

    @Output() outputChange: EventEmitter<boolean> = new EventEmitter();

    toggle() {
        this.isClose = !this.isClose;
        this.outputChange.emit(this.isClose);
    }
  }
