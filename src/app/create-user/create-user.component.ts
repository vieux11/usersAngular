import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../models/user';

@Component({
  selector: 'app-create-user',
  // Utilisation de composants standalone si nécessaire (Angular 14+)
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  // Injection du service utilisateur
  service: UserService = inject(UserService);
  isOpen: boolean = false;

  // Définition du FormGroup pour la création d'un utilisateur
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

  // Méthode appelée lors de la soumission du formulaire
  save() {
    this.service.storeApi(
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
      // Ajout du nouvel utilisateur en tête de la liste
      this.service.users.unshift(userApi);
    });
    this.isOpen = true;
    // Réinitialisation du formulaire après soumission
    this.applyForm = new FormGroup({
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
  }

  // Méthode pour fermer le message de succès
  close() {
    this.isOpen = false;
  }
}

