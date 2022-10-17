import React from 'react';
import { describe, jest, expect, test } from "@jest/globals";
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {

  test('debe de mostrar el login si no está autenticado', () => {

    const contextValue = {
      logged: false,
      user: null || undefined,
      login: jest.fn(),
      logout: jest.fn(),
    }

    render( 
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter> 
    )

    expect( screen.getAllByText('Login').length ).toBe(2);

  });

  test('debe de mostrar el componente de marvel si está autenticado', () => {

    const contextValue = {
      logged: true,
      user: {id: '23243d', name: 'José Carlos'},
      login: jest.fn(),
      logout: jest.fn(),
    }

    render( 
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter> 
    )

    expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);

  });

});