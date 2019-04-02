import React from 'react';
import { PropTypes } from 'prop-types';
import './grade-group-chart.scss';
import dayjs from 'dayjs';

const GradeItemDetails = ({ name, description, obtainedDate, isObtained }) => {
    const qualifiedDesc = isObtained === true ? <div>Passed</div> : <div>Not planned yet</div>;
    return (
        <div className="grade-item-details__panel">
            <div className="grade-item-details__field">
                <div className="grade-item-details__title">Name:</div>
                <div className="grade-item-details__value">{name}</div>
            </div>
            <div className="grade-item-details__field">
                <div className="grade-item-details__title">Description:</div>
                <div className="grade-item-details__value">{description}</div>
            </div>
            <div className="grade-item-details__field">
                <div className="grade-item-details__title">Date:</div>
                <div className="grade-item-details__value">
                    {obtainedDate ? <div>{dayjs(obtainedDate).format('DDMMYYYY')}</div> : qualifiedDesc}
                </div>
            </div>
        </div>
    );
};

GradeItemDetails.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    obtainedDate: PropTypes.string,
    isObtained: PropTypes.bool
};

const GradeGroupChart = ({ items, specializationName }) => {
    const [selectedGrade, setSelectedGrade] = React.useState(null);

    let levelPrefix = 'root-';

    const groupTemplate = (groupItem, childrenContainerClass) => {
        levelPrefix += 'sub-';
        return groupItem.map((item, idx) => (
            <div key={levelPrefix + idx} className="grade-group__wrapper">
                <div
                    className={`grade-group__title ${selectedGrade === item ? 'active' : ''} ${
                        item.isObtained === true ? 'obtained' : ''
                    }`}
                    onClick={() => {
                        setSelectedGrade(item);
                    }}
                >
                    {item.name}
                </div>
                <div className={`grade-group__children ${childrenContainerClass}`}>
                    {item.children.length > 0 &&
                        groupTemplate(item.children, item.children.length > 1 ? 'multiple' : '')}
                </div>
            </div>
        ));
    };

    return (
        <div>
            <div className="grade-group__layout">{groupTemplate(items, 'multiple')}</div>
            <div className="grade-panel__popup">{selectedGrade && <GradeItemDetails {...selectedGrade} />}</div>{' '}
        </div>
    );
};

GradeGroupChart.propTypes = {
    items: PropTypes.array,
    specializationName: PropTypes.string
};

export default GradeGroupChart;
