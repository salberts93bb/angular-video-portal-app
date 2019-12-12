import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainMenuComponent, ToolbarComponent],
  imports: [
      CommonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      RouterModule
    ],
    exports: [
        MainMenuComponent,
        ToolbarComponent
    ]

})
export class NavigationModule { }
