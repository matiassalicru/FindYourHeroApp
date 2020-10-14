import React from "react";
import { Route } from "react-router-dom";
import { LoginScreen } from "../../components/login/LoginScreen";
import { types } from "../../types/types";

const { mount } = require("enzyme");
const { authContext } = require("../../auth/authContext");

describe("Pruebas sobre le LoginScreen", () => {
  const contextValue = { dispatch: jest.fn() };

  const historyMock = {
    replace: jest.fn(),
  };

  const wrapper = mount(
    <authContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </authContext.Provider>
  );

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar el dispatch y hacer la navegación", () => {
    wrapper.find("button").simulate("click");

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Matias",
      },
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/");

    localStorage.setItem("lastPath", "/marvel");

    wrapper.find("button").simulate("click");

    expect(historyMock.replace).toHaveBeenCalledWith("/dc");
  });

});
