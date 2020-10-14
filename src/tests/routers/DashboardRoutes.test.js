import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { authContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Pruebas sobre DashboardRoutes", () => {
  const contextValue = { user: { logged: false }, dispatch: jest.fn() };

  test("debe de mostrarse correctamente ", () => {
    const wrapper = mount(
      <authContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </authContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('')

  });
});
