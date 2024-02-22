import React from "react";


const AuthContext = React.createContext({
    token: null,
    pilotId: null,
    login: (token, pilotId, tokenExpiration) => {},
    logout: () => {},
    });

export default AuthContext;