import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerComponent } from './internal-server/internal-server.component';
import { UnexpectedErrorComponent } from './unexpected-error/unexpected-error.component';



@NgModule({
  declarations: [NotFoundComponent, InternalServerComponent, UnexpectedErrorComponent],
  imports: [
      CommonModule,
      RouterModule
  ]
})
export class ErrorModule { }
