import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "@jest/globals";
import { screen, render, fireEvent } from "@testing-library/react";

import { SearchPage } from '../../../src/heroes/pages';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () =>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <SearchPage />", () => {

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrarse correctamente con los valores por defecto", () => {

    const {container} = render( 
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    expect( container ).toMatchSnapshot();
  });

  test("debe de mostrar a batman y el input con el valor del queryString", () => {

    render( 
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect( input.value ).toBe('batman');

    const img = screen.getByRole<HTMLImageElement>('img');
    expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

    const divAlert = screen.getByLabelText('alert-danger');
    expect( divAlert.style.display ).toBe('none');
  });

  test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {

    render( 
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    const divAlert = screen.getByLabelText('alert-danger');
    expect( divAlert.style.display ).toBe('');
    // screen.debug();

  });

  test('debe de llamar el navigate a la pantalla nueva', () => {

    const inputValue = 'superman';

    render( 
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole<HTMLImageElement>('textbox');
    fireEvent.change( input, { target: { name: 'searchText', value: inputValue}} );
    
    const form = screen.getByLabelText('form');
    fireEvent.submit(form);

    expect( mockedUseNavigate ).toHaveBeenLastCalledWith(`?q=${inputValue}`);

  });

});
