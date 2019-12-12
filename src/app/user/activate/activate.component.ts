import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  isCompleted: boolean = false;
  isFailed: boolean = false;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  get isLoading(): boolean {
    return !this.isCompleted && !this.isFailed;
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = +params.get('id');
        return this.userService.activate(id);
      })).subscribe(
        _ => this.isCompleted = true,
        _ => this.isFailed = true
      );
  }

}
