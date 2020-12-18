import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}
  public urlRoot = '';
  ngOnInit(): void {
    this.urlRoot = this.router.url;
  }

  routes(path: string) {
    this.router.navigateByUrl('feature/' + path);
  }
}
