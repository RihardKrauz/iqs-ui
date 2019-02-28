import React, { useState, useEffect } from 'react';
import './profile-card.scss';
import http from '../../../../common/services/axios-http';
import { STORAGE_KEYS } from '../../../../common/services/storage';

export default () => {
    const [personData, setPersonData] = useState({ department: {}, grade: {} });

    useEffect(() => {
        http.get(`${http.getApiUri()}/user/${localStorage.getItem(STORAGE_KEYS.CURRENT_USER)}`).then(response => {
            setPersonData({ ...response });
        });
    }, []);

    return (
        <div className="profile-card">
            <div className="person-general">
                <div className="person-general__photo">photo</div>
                <div className="person-general__name">{personData.name}</div>
                <div className="person-general__department">{personData.department.name}</div>
            </div>
            <div className="grade-panel">
                <div className="grade-panel__overview">
                    <div className="grade-panel__chart">
                        <div className="grade-panel__range">
                            <div className="grade-panel__grade-item obtained">D0</div>
                            <div className="grade-panel__grade-item obtained">D1</div>
                            <div className="grade-panel__grade-item obtained">D2</div>
                            <div className="grade-panel__grade-item">D3</div>
                            <div className="grade-panel__grade-item">D4</div>
                            <div className="grade-panel__grade-item">D5</div>
                            <div className="grade-panel__grade-item">D6</div>
                            <div className="grade-panel__grade-item">D7</div>
                            <div className="grade-panel__grade-item">D8</div>
                        </div>
                    </div>
                </div>

                <div className="grade-requirements">
                    <ul>
                        <li>req</li>
                        <li>req</li>
                        <li>req</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
