import { Component, OnInit } from '@angular/core';
import {PlattformService} from '../../_services/plattform.service';
import {PlattformModel} from '../../_models/plattformModel';

@Component({
  selector: 'app-console-home',
  templateUrl: './console-home.component.html',
  styleUrls: ['./console-home.component.css']
})
export class ConsoleHomeComponent implements OnInit {

  plattforms: PlattformModel[];
  plattform: PlattformModel;

  constructor(private plattformService: PlattformService) { }

  ngOnInit(): void {
    this.getPlattforms();
  }

  getPlattforms(): void {
    this.plattformService.getPlattforms().subscribe(
      (response) => {
        this.plattforms = response;
      }
    );
  }
}
