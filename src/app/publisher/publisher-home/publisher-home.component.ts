import { Component, OnInit } from '@angular/core';
import {PublisherModels} from '../../_models/publisherModels';
import {PublisherService} from '../../_services/publisher.service';

@Component({
  selector: 'app-publisher-home',
  templateUrl: './publisher-home.component.html',
  styleUrls: ['./publisher-home.component.css']
})
export class PublisherHomeComponent implements OnInit {

  publishers: PublisherModels[];
  panelOpenState: false;

  constructor(private publisherService: PublisherService) { }

  ngOnInit(): void {
    this.getPublishers();
  }

  getPublishers(): void {
    this.publisherService.getPublishers().subscribe(
      (response) => {
        this.publishers = response;
      }
    );
  }

}
