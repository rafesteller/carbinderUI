import { Component, OnInit } from '@angular/core';
import { UserMangService } from './user-mang.service';

import { UserMangDataSource } from './user-mang.datasource'
import { User } from '../user';


@Component({
  selector: 'app-user-mang',
  templateUrl: './user-mang.component.html',
  styleUrls: ['./user-mang.component.css']
})
export class UserMangComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'email', 'role', 'edit', 'remove'];
  public dataSource: UserMangDataSource

  public roles: string[] = ['user', 'admin']

  public newUser: User = new User('', '', '', '', null)

  public userToEdit: User = null

  constructor(private userMangService: UserMangService ) { }

  ngOnInit() {
    this.dataSource = new UserMangDataSource(this.userMangService);
    this.dataSource.loadUsers(); 
  }

  addUser() {
    console.log("adding user")
    console.log(this.newUser)
    this.userMangService.addUser(this.newUser).subscribe( response => 
      {this.newUser = new User('','','','',null);
       this.dataSource.loadUsers();
       console.log(response)
      }
    )

  }

  removeUser(user: User) {
    console.log("remove user")
    console.log(user)
    this.userMangService.removeUser(user).subscribe( response => {
      console.log(response)
      this.dataSource.loadUsers();
    })
  }

  setUserToEdit(user: User) {
    console.log('setUserToEdit')
    console.log(user)
    this.userToEdit = user
  }

  editUser() {
    console.log("edit user")
    console.log(this.userToEdit)

    this.userMangService.editUser(this.userToEdit).subscribe( response => 
      {this.userToEdit = null;
       this.dataSource.loadUsers();
       console.log(response)
      }
    )

  }

}
