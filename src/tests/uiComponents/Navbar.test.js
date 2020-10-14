import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { authContext } from "../../auth/authContext";
import { types } from "../../types/types";
import "@testing-library/jest-dom";

const { mount } = require("enzyme");
const { Navbar } = require("../../components/ui/Navbar");

describe("Pruebas sobre el Navbar", () => {
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Matt",
    },
  };

  const wrapper = mount(
    <authContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </authContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe hacer match con el snapshot", () => {

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Matt");
    
  });

  test("Debe de llamar el logout y usar el history", () => {
    wrapper.find("button").simulate("click");

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/login");
    
  });

});
