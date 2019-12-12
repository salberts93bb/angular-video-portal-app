import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnChanges {
  @Input() userId: string = undefined;
  @Output() editorClosed: EventEmitter<void> = new EventEmitter();
  userForm: FormGroup;

  constructor(private userService: UserService,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder) {
    this.setEmptyForm();
  }

  ngOnChanges() {
    this.setUser();
  }

  get pageHeader(): string {
    return this.isNewUser ? "Add user" : "Edit user";
  }

  get isNewUser() {
    return this.userId === ' ';
  }

  get feedbackUserName(): string {
    var name = this.userForm ? this.userForm.get('userName').value : undefined;
    return name === '' ? "Please enter a username" : "There already exists content with the username " + name;
  }

  onSubmit() {
    if (this.isNewUser) {
      this.save();
    }
    else {
      this.update();
    }
    this.closeEditor();
  }

  closeEditor() {
    this.editorClosed.emit();
  }

  isNameDuplicate() {
    var id = this.userForm.get("id").value;
    var userName = (<string>this.userForm.get("userName").value).trim();
    return this.userService.isUserNameUnique(id, userName).pipe(map(
      res => {
        return res ? null : { duplicate: true };
      })
    );
  }

  private save() {
    this.userService.save(this.userForm.value).subscribe(
      _ => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private update() {
    this.userService.update(this.userForm.value).subscribe(
      _ => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private setUser() {
    if (!this.isNewUser) {
      this.userService.get(this.userId).subscribe(
        (data: User) => this.setFormFromUser(data),
        (error: any) => this.errorHandlerService.handleError(error)
      );
    }
    else {
      this.setEmptyForm();
    }
  }

  private setFormFromUser(user: User) {
    let dateString = new Date(user.dateOfBirth).toISOString().split('T')[0];
    this.setForm(user.id,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password,
      dateString,
      false);
  }

  private setEmptyForm() {
    this.setForm('', '', '', '', '', '', new Date().toISOString().split('T')[0], false);
  }

  private setForm(id: string, firstName: string, lastName: string, userName: string, email: string, password: string, dateOfBirth: string, giveAdminRights: boolean) {
    this.userForm = this.formBuilder.group({
      id: id,
      firstName: firstName,
      lastName: lastName,
      userName: [userName, Validators.required, this.isNameDuplicate.bind(this)],
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      giveAdminRights: giveAdminRights
    });
  }
}
