import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() selected: string = '';
  scrollToSection() {
    const element = document.getElementsByTagName('app-homefooter')[0];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
