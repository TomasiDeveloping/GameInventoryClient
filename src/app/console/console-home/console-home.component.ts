import { Component, OnInit } from '@angular/core';
import {PlattformService} from '../../_services/plattform.service';
import {PlattformModel} from '../../_models/plattformModel';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {ConsoleEditComponent} from '../console-edit/console-edit.component';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-console-home',
  templateUrl: './console-home.component.html',
  styleUrls: ['./console-home.component.css']
})
export class ConsoleHomeComponent implements OnInit {

  plattforms: PlattformModel[];
  plattform: PlattformModel;
  currentPlattform: PlattformModel;

  constructor(private plattformService: PlattformService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const plattform = this.route.snapshot.paramMap.get('plattform');

    if (plattform) {
      this.getPlattformByName(plattform);
    } else {
      this.getPlattforms();
    }
  }

  getPlattforms(): void {
    this.plattformService.getPlattforms().subscribe(
      (response) => {
        this.plattforms = response;
      }
    );
  }

  getPlattformByName(plattformName: string): void {
    this.plattformService.getPlatfformByName(plattformName).subscribe(
      (response) => {
        this.currentPlattform = response;
      }
    );
  }

  onDelete(plattform: PlattformModel): void {
    Swal.fire({
      title: plattform.name + ' löschen ?',
      text: 'Genre ' + plattform.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePlattform(plattform.plattformId);
      }
    });
  }

  onUpdate(plattform: PlattformModel): void {
    const dialogRef = this.dialog.open(ConsoleEditComponent, {
      width: '60%',
      data: plattform
    });

    dialogRef.afterClosed().subscribe(
      reload => {
        if (reload) {
          this.getPlattforms();
        }
      }
    );
  }

  addPlattform(): void {
    // tslint:disable-next-line:new-parens
    this.plattform = new class implements PlattformModel {
      description = '';
      name = '';
      photoUrl = '';
      plattformId = 0;
      producer = '';
      release: Date;
    };
    this.onUpdate(this.plattform);
  }

  deletePlattform(plattformId: number): void {
    this.spinnerService.show();
    this.plattformService.deletePlattform(plattformId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.getPlattforms();
          this.toastr.success('Konsole erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
}
