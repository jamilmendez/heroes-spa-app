import React from 'react';
import { describe, jest, expect, test } from "@jest/globals";
import { screen, render } from '@testing-library/react';

import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext, LoginPage } from '../../src/auth';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRoute/>', () => {

  test('debe de mostrar el children si no está autenticado', () => {

    const contextValue = {
      logged: false,
      user: null || undefined,
      login: jest.fn(),
      logout: jest.fn(),
    }

    render( 
    <AuthContext.Provider value={contextValue}>
      <PublicRoute>
        <h1>Public page test</h1>
      </PublicRoute>
    </AuthContext.Provider> );
    
    expect( screen.getByText('Public page test')).toBeTruthy();
    // screen.debug();
  });

  test('debe de navegar si está autenticado', () => { 

    const contextValue = {
      logged: true,
      user: {id: 'rewfvb', name: 'Strider'},
      login: jest.fn(),
      logout: jest.fn(),
    }

    render( 
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/login']}>

        <Routes>
          <Route path='login' element={
            <PublicRoute>
              <h1>Public page test</h1>
            </PublicRoute>
          } />
          <Route path='marvel' element={ <h1>Página Marvel</h1> } />
        </Routes>

      </MemoryRouter>
    </AuthContext.Provider> );

    expect( screen.getByText('Página Marvel') ).toBeTruthy();
    // screen.debug();

  });
});