import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {PlattformService} from '../../_services/plattform.service';
import {ToastrService} from 'ngx-toastr';
import {PlattformModel} from '../../_models/plattformModel';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-console-edit',
  templateUrl: './console-edit.component.html',
  styleUrls: ['./console-edit.component.css']
})
export class ConsoleEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  plattform: PlattformModel;


  constructor(private dialogRef: MatDialogRef<ConsoleEditComponent>,
              private spinnerService: NgxSpinnerService,
              private plattformService: PlattformService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.plattform = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdatePlattform(): void {
    this.plattform.name = this.editForm.value.name;
    this.plattform.release = this.editForm.value.release;
    this.plattform.photoUrl = this.editForm.value.photoUrl;
    this.plattform.producer = this.editForm.value.producer;
    this.plattform.description = this.editForm.value.description;

    if (this.plattform.plattformId > 0) {
      this.updatePlattform(this.plattform);
    } else {
      this.insertPlattform(this.plattform);
    }
  }

  updatePlattform(plattform: PlattformModel): void {
    this.spinnerService.show();
    this.plattformService.updatePlattform(plattform.plattformId, plattform).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.success('Konsole ' + response.name + ' erfolgreich geändert');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  insertPlattform(plattform: PlattformModel): void {
    this.spinnerService.show();
    this.plattformService.insertPlattform(plattform).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Konsole ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
