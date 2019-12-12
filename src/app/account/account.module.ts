import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class AccountModule { }
