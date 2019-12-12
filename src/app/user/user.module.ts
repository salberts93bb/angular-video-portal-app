import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../material/material.module';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ActivateComponent } from './activate/activate.component';



@NgModule({
  declarations: [UserListComponent, UserEditorComponent, ActivateComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class UserModule { }
