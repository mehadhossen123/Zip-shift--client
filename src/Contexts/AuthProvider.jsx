import React, { Children } from 'react';

const AuthProvider = ({Children}) => {
    return (
        <AuthProvider>
            {Children}
        </AuthProvider>
    );
};

export default AuthProvider;