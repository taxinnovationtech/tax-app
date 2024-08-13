import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { BasetesesComponent } from './pages/baseteses/baseteses.component';
import { EditarTeseComponent } from './pages/editar-tese/editar-tese.component';
import { CriarTeseComponent } from './pages/criar-tese/criar-tese.component';
import { VisualizarTeseComponent } from './pages/visualizar-tese/visualizar-tese.component';
import { ClassificacaoComponent } from './pages/classificacao/classificacao.component';
import { EditarProcessoComponent } from './pages/editar-processo/editar-processo.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { VisualizarEmpresaComponent } from './pages/visualizar-empresa/visualizar-empresa.component';

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

    {
        path: "classificacao",
        component: ClassificacaoComponent
    },

    {
        path: "classificacao/:cnpj",
        component: ClassificacaoComponent
    },

    {
        path: "processo/editar",
        component: EditarProcessoComponent
    },

    {
        path: "processo/editar/:id",
        component: EditarProcessoComponent
    },

    {
        path: "empresas",
        component: EmpresasComponent
    },

    {
        path: "empresas/visualizar/:id",
        component: VisualizarEmpresaComponent
    },
    
    {
        path: "empresas/visualizar",
        component: VisualizarEmpresaComponent
    },
    
    
    
];
