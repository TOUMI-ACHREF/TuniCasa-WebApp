import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy{

  idUser!: number;
  user: User | undefined;
  private routeSub!: Subscription;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private router:Router,
              @Inject('BaseURL') public baseUrl: string){}

  ngOnInit(): void {
     
      this.routeSub = this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) { // Check if 'id' is not null
          this.idUser = +id; // Convert 'id' from string to number
          this.profileService.getProfileById(this.idUser).subscribe({ next: (user) => this.user = user });
        }
      });
  }
  
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();   // Unsubscribe to avoid memory leaks
    }
  }
  OnUsers(){
    this.router.navigateByUrl('/admin/users');
  }

}