import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import { auth } from "../firebase/firebase-utils";
import { RootStoreContext } from "../App";

export function RestrictedRoute({ children }) {
  const { userStore } = useContext(RootStoreContext)

  if (!userStore.userID) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}


export function PrivateRoute({ children }) {
  const { userStore } = useContext(RootStoreContext)

  if (userStore.userID) {
    return children;
  } else {
    return <Navigate to="/signin" replace />;
  }
}
