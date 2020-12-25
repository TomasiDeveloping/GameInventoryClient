import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EngineService} from '../../_services/engine.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {GameEngineModel} from '../../_models/gameEngineModel';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-engine-edit',
  templateUrl: './engine-edit.component.html',
  styleUrls: ['./engine-edit.component.css']
})
export class EngineEditComponent implements OnInit {

  @ViewChild('editForm') public editForm: NgForm;
  currentEngine: GameEngineModel;

  constructor(private dialogRef: MatDialogRef<EngineEditComponent>,
              private engineService: EngineService,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentEngine = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdateEngine(): void{
    this.currentEngine.name = this.editForm.value.name;
    if (this.currentEngine.gameEngineId > 0) {
      this.updateEngine(this.currentEngine);
    } else {
      this.insertEngine(this.currentEngine);
    }
  }

  insertEngine(engine: GameEngineModel): void {
    this.spinnerService.show();
    this.engineService.insertEngine(engine).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Game Engine ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  updateEngine(engine: GameEngineModel): void {
    this.spinnerService.show();
    this.engineService.updateEngine(engine.gameEngineId, engine).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Game Engine ' + engine.name + ' erfolgreich geändert');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
