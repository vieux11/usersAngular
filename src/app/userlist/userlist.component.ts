import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


declare var bootstrap: any; // Declare Bootstrap for TypeScript

@Component({
  selector: 'app-userlist',
  imports: [NgFor, RouterLink],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  users: User[] = [];
  selectedUser: User | null = null;
  service: UserService = inject(UserService);

  async ngOnInit(): Promise<void> {
    // Récupération des utilisateurs au démarrage
    this.service.all().then((userApi:User[])=>{
      this.service.users=userApi
      this.users = this.service.users
    })
    //this.users = await this.service.all();
  }

  async onDeleteUser(id: number): Promise<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      await this.service.destroyApi(id);
      this.users = this.users.filter(user => user.id !== id);
    }
  }

 
}
