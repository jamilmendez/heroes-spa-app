import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, expect, test } from "@jest/globals";
import { screen, render, fireEvent } from '@testing-library/react';

import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Navbar />', () => {
  
  const contextValue = {
    logged: true,
    user: {id: 'sdfc', name: 'Juan Carlos II'},
    login: jest.fn(),
    logout: jest.fn(),
  }

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el nombre de usuario', () => {

    render( 
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter> 
    )

    expect( screen.getByText('Juan Carlos II') ).toBeTruthy();
  });

  test('debe de llamar el logout y navegar a login cuando se hace click en en el botón', () => {

    render( 
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter> 
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn)

    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {"replace": true});
  });


});