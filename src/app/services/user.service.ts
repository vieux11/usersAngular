import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[] = []

  async all():Promise<User[]>{
    let rep = await fetch('https://fakestoreapi.com/users').then(res => res.json());
    return rep;
  }
  async getUser(id: number): Promise<User> {
    const rep = await fetch(`https://fakestoreapi.com/users/${id}`);
    const user: User = await rep.json();
    return user;
  }
  async storeApi(
    email: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    city: string,
    street: string,
    number: number,
    zipcode: string,
    lat: string,
    long: string,
    phone: string
  ): Promise<User> {
    // Construction de l'objet utilisateur
    const user = {
      email,
      username,
      password,
      name: {
        firstname,
        lastname
      },
      address: {
        city,
        street,
        number,
        zipcode,
        geolocation: {
          lat,
          long
        }
      },
      phone
    };

    // Envoi de la requête POST pour créer un nouvel utilisateur
    const rep = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const createdUser: User = await rep.json();
    return createdUser;
  }
  async updateApi(
    id: number,
    email: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    city: string,
    street: string,
    number: number,
    zipcode: string,
    lat: string,
    long: string,
    phone: string
  ): Promise<User> {
    // Construction de l'objet utilisateur à mettre à jour
    const user = {
      email,
      username,
      password,
      name: {
        firstname,
        lastname
      },
      address: {
        city,
        street,
        number,
        zipcode,
        geolocation: {
          lat,
          long
        }
      },
      phone
    };

    // Envoi de la requête PUT pour mettre à jour l'utilisateur
    const rep = await fetch(`https://fakestoreapi.com/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const updatedUser: User = await rep.json();
    return updatedUser;
  }

  /**
   * Supprime un utilisateur par son id.
   * @param id L'identifiant de l'utilisateur à supprimer.
   */
  async destroyApi(id: number): Promise<{ id: number }> {
    const rep = await fetch(`https://fakestoreapi.com/users/${id}`, {
      method: 'DELETE'
    });
    const result = await rep.json();
    return result;
  }
}
