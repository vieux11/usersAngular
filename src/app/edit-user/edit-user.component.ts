import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  service: UserService = inject(UserService);
  isOpen: boolean = false;
  userId: number = -1;
  user!: User | undefined;

  // Définition du FormGroup avec tous les contrôles nécessaires pour un utilisateur
  applyForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl(0),
    zipcode: new FormControl(''),
    lat: new FormControl(''),
    long: new FormControl(''),
    phone: new FormControl('')
  });

 async ngOnInit() {
    // Récupérer l'identifiant de l'utilisateur depuis l'URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    // Charger l'utilisateur existant (ici on suppose que getOne() renvoie l'utilisateur de manière synchrone)
    this.user = await this.service.getUser(this.userId);
    // Pré-remplir le formulaire avec les valeurs existantes
    this.applyForm = new FormGroup({
      email: new FormControl(this.user?.email || ''),
      username: new FormControl(this.user?.username || ''),
      password: new FormControl(this.user?.password || ''),
      firstname: new FormControl(this.user?.name.firstname || ''),
      lastname: new FormControl(this.user?.name.lastname || ''),
      city: new FormControl(this.user?.address.city || ''),
      street: new FormControl(this.user?.address.street || ''),
      number: new FormControl(this.user?.address.number || 0),
      zipcode: new FormControl(this.user?.address.zipcode || ''),
      lat: new FormControl(this.user?.address.geolocation.lat || ''),
      long: new FormControl(this.user?.address.geolocation.long || ''),
      phone: new FormControl(this.user?.phone || '')
    });
  }

  // Méthode appelée lors de la soumission du formulaire pour éditer l'utilisateur
  edit() {
    this.service.updateApi(
      this.userId,
      this.applyForm.value.email ?? "",
      this.applyForm.value.username ?? "",
      this.applyForm.value.password ?? "",
      this.applyForm.value.firstname ?? "",
      this.applyForm.value.lastname ?? "",
      this.applyForm.value.city ?? "",
      this.applyForm.value.street ?? "",
      this.applyForm.value.number ?? 0,
      this.applyForm.value.zipcode ?? "",
      this.applyForm.value.lat ?? "",
      this.applyForm.value.long ?? "",
      this.applyForm.value.phone ?? ""
    ).then((userApi: User) => {
      // Mettre à jour l'utilisateur dans la liste du service
      const index = this.service.users.findIndex(user => user.id == this.userId);
      if (index !== -1) {
        this.service.users[index].email = userApi.email;
        this.service.users[index].username = userApi.username;
        this.service.users[index].password = userApi.password;
        this.service.users[index].name.firstname = userApi.name.firstname;
        this.service.users[index].name.lastname = userApi.name.lastname;
        this.service.users[index].address.city = userApi.address.city;
        this.service.users[index].address.street = userApi.address.street;
        this.service.users[index].address.number = userApi.address.number;
        this.service.users[index].address.zipcode = userApi.address.zipcode;
        this.service.users[index].address.geolocation.lat = userApi.address.geolocation.lat;
        this.service.users[index].address.geolocation.long = userApi.address.geolocation.long;
        this.service.users[index].phone = userApi.phone;
      }
    });
    this.isOpen = true;
  }

  // Méthode pour fermer le message de succès
  close() {
    this.isOpen = false;
  }
}
