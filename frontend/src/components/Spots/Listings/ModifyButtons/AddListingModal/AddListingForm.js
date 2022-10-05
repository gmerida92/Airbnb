import React, { useState } from 'react';
// import * as sessionActions from '../../../../../store/session';
import * as spotActions from '../../../../../store/spots';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { Modal } from '../../../../../context/Modal';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';


function AddListingForm({ onSubmit }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state?.session?.user);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLatitude] = useState('');
    const [lng, setLongitude] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to='/api/users/myaccount/spots' />;



    const handleSubmit = (e) => {
        e.preventDefault();
        let newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }
        setErrors([]);
        return dispatch(spotActions.createSpot(newSpot))
            .then(() => {
                setAddress('');
                setCity('');
                setState('');
                setCountry('');
                setLatitude('');
                setLongitude('');
                setName('');
                setDescription('');
                setPrice('');
                setPreviewImage('');
                onSubmit();
                // return <Redirect to='/api/users/myaccount/spots' />
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                } else { setErrors([data.message]) };
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {Object.keys(errors).length > 0 && Object.keys(errors).map((errorKey, idx) =>
                    <li key={idx}>{errors[errorKey]}</li>
                )}
            </ul>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                // required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                // required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                // required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                // required
                />
            </label>
            <label>
                Latitude
                <input
                    type="number"
                    step=".000001"
                    value={lat}
                    onChange={(e) => setLatitude(e.target.value)}
                // required
                />
            </label>
            <label>
                Longitude
                <input
                    type="number"
                    step=".000001"
                    value={lng}
                    onChange={(e) => setLongitude(e.target.value)}
                // required
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                // required
                />
            </label>
            <label>
                Description
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                // required
                />
            </label>
            <label>
                Price
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                // required
                />
            </label>
            <label>
                Preview Image
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                // required
                />
            </label>
            <button type="submit">Create Listing</button>
        </form>
    );
}

export default AddListingForm;