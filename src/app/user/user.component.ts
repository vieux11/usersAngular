import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input() user!: User;
  // Index optionnel pour afficher le numéro de ligne
  @Input() index: number = 0;
}
