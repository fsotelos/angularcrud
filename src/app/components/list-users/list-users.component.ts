import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service'
import { MatTableDataSource } from '@angular/material/table'
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'secondName', 'lastFirstName', 'lastSecondName', 'birthDayDate', 'nickName', 'email', 'gender', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserServiceService, private _snackBar : MatSnackBar) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data.result;
    });
  }
  deleteUser(idUser : number){
    this.userService
    .deleteUser(idUser)
    .subscribe({
      next: (data) =>{
        this._snackBar.open("User Deleted Successfully","OK!");
        this.dataSource.data = this.dataSource.data.filter(x => x.id !== idUser)
      }
    })
  }
}
