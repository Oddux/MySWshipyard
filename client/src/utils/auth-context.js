import React from "react";

export default React.createContext({
    token: null,
    pilotId: null,
    login: (token, pilotId, tokenExpiration) => {},
    logout: () => {},
    });
