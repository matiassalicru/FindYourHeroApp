import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Pruebas sobre el Search", () => {
  const historyMock = {
    push: jest.fn(),
  };

  test("Debe de mostrarse con valores por default", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("Debe de mostrar a Batman y el input con el valor del querystring", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");

    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de mostrar un mensaje de error", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman123123"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").exists()).toBe(true);
  });

  test("debe funcionar bien el submit y llamar el push del history", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "search",
        value: "batman",
      },
    });

    const formSubmit = wrapper.find("form").prop("onSubmit");

    formSubmit({ preventDefault() {} });

    expect(historyMock.push).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledWith('?q=batman');

  });
});
