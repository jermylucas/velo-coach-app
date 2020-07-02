// @Angular imports
import { NgModule } from '@angular/core';

// Components
import { DashboardComponent } from '../dashboard/dashboard.component';

// Modules
import { MaterialModule } from '../../../app/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  providers: [],
})
export class DashboardModule {}
