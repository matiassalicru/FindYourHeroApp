import React from "react";
import { PriverRoute } from "../../routers/PriverRoute";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

const { mount } = require("enzyme");

describe(" Pruebas en Private Routes", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };

  Storage.prototype.setItem = jest.fn();

  test("Debe de mostrar el componente si está autenticado y guardar localStorage.", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PriverRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    // console.log('====' + wrapper.html());
    expect(wrapper.find("span").exists()).toBe(true);
    // console.log(wrapper.find("span").exists().toBe(true));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      props.location.pathname
    );
  });

  test("debe de bloquear el componente si no está autenticado.", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PriverRoute
          isAuthenticated={false}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);

  });
});
