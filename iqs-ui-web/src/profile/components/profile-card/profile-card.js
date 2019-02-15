import React, { useState, useEffect } from 'react';
import './profile-card.scss';
import http from '../../../services/axios-http';
import { STORAGE_KEYS } from '../../../services/storage';

export default () => {
    const [ personData, setPersonData ] = useState({
        name: '',
        age: 0,
        role: ''
    });

    useEffect(() => {
        http.get(`${http.getApiUri()}/user/${localStorage.getItem(STORAGE_KEYS.CURRENT_USER)}`)
            .then((response) => {
                setPersonData({ ...response });
            });
    }, []);

    return (<div>This is your profile! {personData.name} {personData.age} {personData.role}</div>)
};
