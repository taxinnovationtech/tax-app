import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { BasetesesComponent } from './pages/baseteses/baseteses.component';
import { EditarTeseComponent } from './pages/editar-tese/editar-tese.component';
import { CriarTeseComponent } from './pages/criar-tese/criar-tese.component';
import { VisualizarTeseComponent } from './pages/visualizar-tese/visualizar-tese.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: 'full'
    },

    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "baseteses",
        component: BasetesesComponent
    },

    {
        path: "baseteses/editar/:id",
        component: EditarTeseComponent
    },

    {
        path: "baseteses/cadastrar",
        component: CriarTeseComponent
    },

    {
        path: "baseteses/visualizar/:id",
        component: VisualizarTeseComponent
    },
    
    
    
];
