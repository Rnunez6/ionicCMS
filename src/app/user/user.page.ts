import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user:User;

  constructor(
    private usersService:UsersService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>
    this.getUser(params['userId']));
  }

  getUser(id:string): void{
    this.usersService.getUser(id).subscribe(
      (response:any) => {
        this.user = response.user;
      }
    );
  }

  deleteUser(id:string): void {
    if (confirm("Are you sure to delete " + this.user.username)) {
      this.usersService.deleteUser(id).subscribe(
        () => { this.router.navigate(['/users']) }
      );
    }
  }

}