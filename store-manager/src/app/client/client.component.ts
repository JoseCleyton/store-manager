import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public id = '';
  constructor() {}

  ngOnInit(): void {}

  public changeIsActive(id: string) {
    this.id = id;
  }
}
