import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {NgxScrollTopModule} from 'ngx-scrolltop';
import {NgxSpinnerModule} from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxScrollTopModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    ToastrModule,
    NgxScrollTopModule,
    NgxSpinnerModule,
  ]
})
export class ThirdPartyModule { }
