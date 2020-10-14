import React from "react";
import { authContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

const { mount } = require("enzyme");

describe("Pruebas en AppRouter", () => {
  const contextValue = { user: { logged: false }, dispatch: jest.fn() };

  test("debe de mostrar el login si no está autenticado", () => {
    const wrapper = mount(
      <authContext.Provider value={contextValue}>
        <AppRouter />
      </authContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar el componente de marvel si está autenticado.', () => {

  const contextValue2 = { user: { logged: true, name: 'Matt' }, dispatch: jest.fn() };


      const wrapper = mount(
      <authContext.Provider value={contextValue2}>
        <AppRouter />
      </authContext.Provider>
    );

    expect(wrapper.find('.navbar').exists()).toBe(true)
  });
  
});
