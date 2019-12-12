import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: MatTableDataSource<User>;
  selectedUserId: string;
  searchForm: FormGroup = this.formBuilder.group({
    "searchTerm": ""
  });

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'dateOfBirth', 'edit', 'adddelete'];

  constructor(private userService: UserService, private errorHandlerService: ErrorHandlerService, private formBuilder: FormBuilder) { }

  get isEditorOpen(): boolean {
    return this.selectedUserId !== undefined;
  }

  ngOnInit() {
    this.getUsers();
    this.userService.databaseUpdated.subscribe(
      () => this.getUsers()
    );
  }

  delete(id: string) {
    this.userService.delete(id).subscribe(
      _ => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  openEditor(user: User) {
    this.selectedUserId = user ? user.id : ' ';
  }

  closeEditor() {
    this.selectedUserId = undefined;
  }

  dateOfBirthString(user: User) {
    return new Date(user.dateOfBirth).toDateString();
  }

  search() {
    let searchTerm = this.searchForm.get('searchTerm').value;
    this.userService.searchByUsernameOrEmail(searchTerm).subscribe(
      (data: User[]) => this.setDatasource(data),
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  reset() {
    this.searchForm.setValue({ 'searchTerm': '' });
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAll()
      .subscribe(
        (data: User[]) => this.setDatasource(data),
        (error: any) => this.errorHandlerService.handleError(error)
      );
  }

  private setDatasource(users: User[]) {
    this.users = new MatTableDataSource(users);
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }
}
