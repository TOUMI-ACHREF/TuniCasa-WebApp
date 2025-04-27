import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Shared/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit  {
  users: User[]=[];
  errMsg:string="";
  isWaiting:boolean=true;
  public constructor(private router: Router, private userService: UserService) { }
  //Quand le composant démarre : il fait un appel HTTP pour charger tous les contacts.
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe({
        next: (users) => {
          setTimeout(() => { // Simuler 2 secondes d'attente
            this.users = users;
            this.isWaiting = false;
          }, 2000); // 2000 ms = 2 secondes
        },
        error: (errmess) => {
          this.users = [];
          this.errMsg = <any>errmess;
          this.isWaiting = false;
        },
      });
  }
  

 onDeleteUser(id: number) {
    // this.contactService.deleteContactById(id);
    this.userService.deleteUser(id).subscribe(
      {
          next: result => {
          console.log("user deleted!");
          let index = this.users.findIndex(user => user.id == id)
          this.users.splice(index, 1);
        }
      }
    );

  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }
  onAdduser(){
    this.router.navigate(["/users/edit/-1"]);
  }
}
