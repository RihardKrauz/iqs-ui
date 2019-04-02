import React from 'react';
import './profile-card.scss';
import http from '../../../../common/services/axios-http';
import { STORAGE_KEYS } from '../../../../common/services/storage';
import GradeGroupChart from '../grade-group-chart/grade-group-chart';
import { sortByParent, appendChildrenToParent } from '../../../../common/services/arrays';

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personData: { department: {}, qualification: [], specialization: {} },
            grades: []
        };

        this.setPersonData = this.setPersonData.bind(this);
        this.setGrades = this.setGrades.bind(this);
        this.setObtainedItems = this.setObtainedItems.bind(this);
    }

    setPersonData(value) {
        this.setState({ personData: value });
    }

    setGrades(value) {
        this.setState({ grades: value });
    }

    setObtainedItems(grades) {
        let obtainedIndex = -1;
        return grades
            .reverse()
            .map((grade, idx) => {
                grade.description = '';
                const qualGrades = this.state.personData.qualification.filter(q => q.grade.id === grade.id);

                if (qualGrades.length > 0) {
                    if (obtainedIndex === -1) {
                        obtainedIndex = idx;
                    }

                    grade.obtainedDate = qualGrades[0].qualifiedDate;
                }
                if ((obtainedIndex !== -1 && obtainedIndex < idx) || qualGrades.length > 0) {
                    grade.isObtained = true;
                    return grade;
                }
                return grade;
            })
            .reverse();
    }

    componentDidMount() {
        http.get(`${http.getApiUri()}/users/${localStorage.getItem(STORAGE_KEYS.CURRENT_USER)}`)
            .then(personData => {
                this.setPersonData(personData);
                return personData.specializationId;
            })
            .then(specId => {
                http.get(`${http.getApiUri()}/specializations/${specId}/grades`)
                    .then(sortByParent)
                    .then(this.setObtainedItems)
                    .then(appendChildrenToParent)
                    .then(this.setGrades);
            });
    }

    render() {
        return (
            <div className="profile-card">
                <div className="person-general">
                    <div className="person-general__content-wrapper">
                        <div className="person-general__photo">{this.state.personData.name}</div>
                        <div className="person-general__name">{this.state.personData.specialization.name}</div>
                        <div className="person-general__department">{this.state.personData.department.name}</div>
                    </div>
                </div>
                <div className="grade-panel">
                    <div className="grade-panel__overview">
                        <GradeGroupChart
                            specializationName={this.state.personData.specialization.name}
                            items={this.state.grades}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCard;
