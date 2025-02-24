import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-user-single',
  imports: [NgIf],
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css'
})
export class UserSingleComponent {
  route:ActivatedRoute = inject(ActivatedRoute)
  service:UserService=inject(UserService)
  user!:User
  userid=-1
  async ngOnInit(): Promise<void> {
    this.userid = Number(this.route.snapshot.params['id']);
    this.user = await this.service.getUser(this.userid);
  }
  
}
