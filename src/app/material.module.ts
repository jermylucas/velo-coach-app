import { NgModule } from "@angular/core";
import { MatButtonModule, MatIconModule } from "@angular/material";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenavModule } from "@angular/material/sidenav";

import { MatToolbarModule } from "@angular/material/toolbar";

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatIconModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
