import React from "react";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";

const UserProfile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            {isAuthenticated && (
                <div>
                    <img src={user.picture} alt={user.name}/>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )}
            {!isAuthenticated && (
                <h3>Error - failed to authenticate</h3>
            )}
        </>
    );
};

export default connect()(UserProfile);