import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image',  'url(https://www.loudwallpapers.com/wp-content/uploads/2018/12/stylish-black-car-wallpaper-1920.jpg)' );
   }

  ngOnInit() {
  }

}
