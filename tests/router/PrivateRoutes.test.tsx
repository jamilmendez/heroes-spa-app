import React from 'react';
import { describe, jest, expect, test } from "@jest/globals";
import { screen, render } from '@testing-library/react';

import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute />', () => {

  test('debe de mostrar el children si está autenticado', () => {

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {id: 'asdad', name: 'Juan Carlos'},
      login: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1> Página o ruta privada test</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    
    expect( localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    // screen.debug();
  });

});