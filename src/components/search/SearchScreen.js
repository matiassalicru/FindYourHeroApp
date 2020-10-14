import React, { useMemo } from "react";
import queryString from "query-string";

import { useLocation } from "react-router-dom";
import { useForm } from "../../Hooks/useForm/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroByName } from "../selectors/getHeroByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const initialState = {
    search: q,
  };

  const [formValues, handleInputChange] = useForm(initialState);

  const { search } = formValues;

  const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();

    history.push(`?q=${search}`);

    // reset();
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              name="search"
              type="text"
              placeholder="Find your hero"
              className="form-control"
              value={search}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <button
              type="submit"
              className="mt-2 btn btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4> Results </h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a hero</div>}

          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">There is no hero with {q}</div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard
              
              key={hero.id}
              {...hero}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
