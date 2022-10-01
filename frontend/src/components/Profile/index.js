import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux'
import ReviewsByUser from '../Reviews/ReviewsByUser';


function Profile({ sessionUser }) {
    // if(!sessionUser) <Redirect to="/" />

    // const history = useHistory();

    // useEffect(() => {
    //     if(!sessionUser) history.push("/")
    //  }, [sessionUser, history])

    return (
        <div>
            <div>
                <h2>{`Hi, I'm ${sessionUser?.firstName} ${sessionUser?.lastName.slice(0, 1)}.`}</h2>
                <h4>{`${sessionUser?.username}`}</h4>
                <h4>{`${sessionUser?.email}`}</h4>
            </div>
            <div>Review</div>
            <ReviewsByUser />
        </div>
    )
};

export default Profile;