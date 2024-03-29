import React from 'react';
import { PropTypes } from 'prop-types';
import './grade-chart.scss';
import dayjs from 'dayjs';
import { useOutsideClickEvent } from '../../../../common/services/hooks';

const GradeItem = ({ isObtained, name }) => {
    return <div className={`grade-panel__grade-item ${isObtained === true ? 'obtained' : ''}`}>{name}</div>;
};

GradeItem.propTypes = {
    isObtained: PropTypes.bool,
    name: PropTypes.string
};

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

const GradeChart = ({ items }) => {
    const [selectedGrade, setSelectedGrade] = React.useState(null);
    const wrapperRef = useOutsideClickEvent(() => {
        setSelectedGrade(null);
    });
    return (
        <div className="grade-panel__content-wrapper" ref={wrapperRef}>
            <div className="grade-panel__chart">
                <div className="grade-panel__range">
                    {items.map(item => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setSelectedGrade(item);
                            }}
                            className={`grade-panel__item-wrapper ${selectedGrade === item ? 'active' : ''}`}
                        >
                            <GradeItem {...item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="grade-panel__popup">{selectedGrade && <GradeItemDetails {...selectedGrade} />}</div>
        </div>
    );
};

GradeChart.propTypes = {
    items: PropTypes.array,
    specializationId: PropTypes.string
};

export default GradeChart;
