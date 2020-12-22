import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PublisherModels} from '../../_models/publisherModels';
import {PublisherService} from '../../_services/publisher.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit {

  @ViewChild('editForm') private editForm: NgForm;
  currentPublisher: PublisherModels;

  constructor(private dialogRef: MatDialogRef<PublisherEditComponent>,
              private publisherService: PublisherService,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA)public data: any) {
    this.currentPublisher = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdatePublisher(): void {
    this.currentPublisher.country = this.editForm.value.country;
    this.currentPublisher.name = this.editForm.value.name;
    this.currentPublisher.description = this.editForm.value.description;

    if (this.currentPublisher.publisherId > 0) {
      this.updatePublisher(this.currentPublisher);
    }
    else {
      this.insertPublisher(this.currentPublisher);
    }
  }

  updatePublisher(publisher: PublisherModels): void {
    this.spinnerService.show();
    this.publisherService.updatePublisher(publisher.publisherId, publisher).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.success('Publisher ' + response.name + ' erfolgreich geändert');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  insertPublisher(publisher: PublisherModels): void {
    this.spinnerService.show();
    this.publisherService.insertPublisher(publisher).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Publisher ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
