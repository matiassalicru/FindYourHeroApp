import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { authContext } from "../auth/authContext";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";

import { PriverRoute } from "./PriverRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { user } = useContext(authContext);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={user.logged}
            exact
            path="/login"
            component={LoginScreen}
          />

          <PriverRoute
            isAuthenticated={user.logged}
            path="/"
            component={DashboardRoutes}
          />
        </Switch>
      </div>
    </Router>
  );
};
