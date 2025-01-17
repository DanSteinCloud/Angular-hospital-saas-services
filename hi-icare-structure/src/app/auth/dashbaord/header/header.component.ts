import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  toggleNotification() {
    
  }
}
