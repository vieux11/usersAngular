import { Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { UserSingleComponent } from './user-single/user-single.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


export const routes: Routes = [
    {
        path: '',
        component: UserlistComponent
    },
    { 
        path: 'user/create',
        component: CreateUserComponent 
    },
    { 
        path: 'users/:id',
        component: UserSingleComponent 
    },
    { 
        path: 'edit-user/:id',
        component: EditUserComponent 
    }
];
