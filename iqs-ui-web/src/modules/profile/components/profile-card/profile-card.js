import React from 'react';
import './profile-card.scss';
import http from '../../../../common/services/axios-http';
import { STORAGE_KEYS } from '../../../../common/services/storage';
import GradeChart from '../grade-chart/grade-chart';

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personData: { department: {}, grade: {} },
            grades: []
        };

        this.setPersonData = this.setPersonData.bind(this);
        this.setGrades = this.setGrades.bind(this);
    }

    setPersonData(value) {
        this.setState({ personData: value });
    }

    setGrades(value) {
        this.setState([...value]);
    }

    componentDidMount() {
        http.get(`${http.getApiUri()}/users/${localStorage.getItem(STORAGE_KEYS.CURRENT_USER)}`)
            .then(response => {
                this.setPersonData({ ...response });
            })
            .then(() => {
                http.get(`${http.getApiUri()}/specializations/1/grades`).then(response => {
                    this.setGrades(response);
                });
            });
    }

    render() {
        return (
            <div className="profile-card">
                <div className="person-general">
                    <div className="person-general__photo">photo</div>
                    <div className="person-general__name">{this.state.personData.name}</div>
                    <div className="person-general__department">{this.state.personData.department.name}</div>
                </div>
                <div className="grade-panel">
                    <div className="grade-panel__overview">
                        <GradeChart
                            specializationId="1"
                            items={[
                                { id: 1, name: 'D0', isObtained: true },
                                { id: 2, name: 'D1' },
                                { id: 3, name: 'D2' }
                            ]}
                        />
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
    }
}

export default ProfileCard;
