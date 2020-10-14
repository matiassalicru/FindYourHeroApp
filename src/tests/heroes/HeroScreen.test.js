import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../components/heroes/HeroScreen";

const { mount } = require("enzyme");

describe("Pruebas sobre HeroScreen", () => {
    const historyMock = {
      length: 10,
      goBack: jest.fn(),
      push: jest.fn(),
    };
 

  test("Debe de mostrar el componente Redirect si no hay argumentos en el url", () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("Debe renderizar el componente heroScreen", () => {
      
    const wrapper = mount(
        <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
            <Route path='/hero/:heroeId' component={HeroScreen}/>
        </MemoryRouter>
      );

        expect( wrapper ).toMatchSnapshot();

        expect(wrapper.find('.row').exists()).toBe(true);

  });

  test('debe de regresar a la pantalla anterior con PUSH', () => {
    
     const historyMock = {
       length: 1,
       goBack: jest.fn(),
       push: jest.fn(),
     };

     const wrapper = mount(
       <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
         <Route 
            path="/hero/:heroeId" 
            component={ () => <HeroScreen history={historyMock}/> } 
        />
       </MemoryRouter>
     );

     wrapper.find('button').prop('onClick')();

     expect( historyMock.push ).toHaveBeenCalledWith('/')
     expect( historyMock.goBack ).not.toHaveBeenCalled();


  })

  test('History mayor a 2 goBack se haya llamado y no el push', () => {
    
     

     const wrapper = mount(
       <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
         <Route
           path="/hero/:heroeId"
           component={() => <HeroScreen history={historyMock} />}
         />
       </MemoryRouter>
     );

     wrapper.find("button").prop("onClick")();

     expect(historyMock.goBack).toHaveBeenCalled();
     expect(historyMock.push).not.toHaveBeenCalled();

    
  });
  
  test('Debe de llamar el Redirect si el heroe no existe', () => {
      
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider123123"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect( wrapper.text() ).toBe('') 

  })
  
  
});
