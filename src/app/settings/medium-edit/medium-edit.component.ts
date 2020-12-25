import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {MediumService} from '../../_services/medium.service';
import {MediumModel} from '../../_models/mediumModel';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-medium-edit',
  templateUrl: './medium-edit.component.html',
  styleUrls: ['./medium-edit.component.css']
})
export class MediumEditComponent implements OnInit {

  @ViewChild('editForm') public editForm: NgForm;
  currentMedium: MediumModel;

  constructor(private dialogRef: MatDialogRef<MediumEditComponent>,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              private mediumService: MediumService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentMedium = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdateMedium(): void {
    this.currentMedium.name = this.editForm.value.name;
    if (this.currentMedium.mediumId > 0) {
      this.updateMedium(this.currentMedium);
    } else {
      this.insertMedium(this.currentMedium);
    }
  }

  updateMedium(medium: MediumModel): void {
    this.spinnerService.show();
    this.mediumService.updateMedium(medium.mediumId, medium).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Medium ' + response.name + ' erfolgreich bearbeitet');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  insertMedium(medium: MediumModel): void {
    this.spinnerService.show();
    this.mediumService.insertMedium(medium).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Medium ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
