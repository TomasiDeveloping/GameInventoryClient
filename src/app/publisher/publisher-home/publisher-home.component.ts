import { Component, OnInit } from '@angular/core';
import {PublisherModels} from '../../_models/publisherModels';
import {PublisherService} from '../../_services/publisher.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {PublisherEditComponent} from '../publisher-edit/publisher-edit.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-publisher-home',
  templateUrl: './publisher-home.component.html',
  styleUrls: ['./publisher-home.component.css']
})
export class PublisherHomeComponent implements OnInit {

  publishers: PublisherModels[];
  publisher: PublisherModels;
  currentPublisher: PublisherModels;

  constructor(private publisherService: PublisherService,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    const publisherName = this.route.snapshot.paramMap.get('publisher');
    if (publisherName) {
      this.getPublisherByName(publisherName);
    } else {
      this.getPublishers();
    }
  }

  getPublishers(): void {
    this.publisherService.getPublishers().subscribe(
      (response) => {
        this.publishers = response;
      }
    );
  }

  getPublisherByName(publisherName: string): void {
    this.publisherService.getPublisherByName(publisherName).subscribe(
      (response) => {
        this.currentPublisher = response;
      }
    );
  }

  onDelete(publisher: PublisherModels): void {
    Swal.fire({
      title: publisher.name + ' löschen ?',
      text: 'Genre ' + publisher.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePublisher(publisher.publisherId);
      }
    });
  }

  deletePublisher(publisherId: number): void {
    this.spinnerService.show();
    this.publisherService.deletePublisher(publisherId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.getPublishers();
          this.toastr.success('Publisher erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }

  onAddPublisher(): void {
    // tslint:disable-next-line:new-parens
    this.publisher = new class implements PublisherModels {
      country = '';
      description = '';
      name = '';
      publisherId = 0;
    };
    this.onEditPublisher(this.publisher);
  }

  onEditPublisher(publisher: PublisherModels): void {
   const dialogRef = this.dialog.open(PublisherEditComponent, {
      width: '60%',
      data: publisher
    });

   dialogRef.afterClosed().subscribe(
     reload => {
       if (reload) {
         this.getPublishers();
       }
     }
   );
  }
}
