import { describe, expect, test } from "@jest/globals";

import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("Pruebas en authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, { type: "" });
    expect(state).toEqual({ logged: false });
  });

  test("debe de (login) llamar el login autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        id: "234",
        name: "Juan Perez",
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("debe de (logout) borrar el name del usuario y logged en falso", () => {
    const state = {
      logged: true,
      user: { id: "2ewrf", name: "Juan el mecánico" },
    };

    const action = { type: types.logout }

    const newState = authReducer({ logged: false }, action);
    expect( newState ).toEqual({
      logged: false,
    });
  });
});
