import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';
import {
  EditService,
  FilterService,
  GridModule,
  GroupService,
  PageService,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatePickerModule,
    GridModule,
  ],
  exports: [
    DatePickerModule,
    GridModule,
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    EditService,
    ToolbarService, ],
})
export class SyncfusionModule { }
