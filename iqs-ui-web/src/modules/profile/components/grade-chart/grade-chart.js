import React from 'react';
import { PropTypes } from 'prop-types';
import './grade-chart.scss';

const GradeItem = ({ isObtained, name }) => {
    return <div className={`grade-panel__grade-item ${isObtained === true ? 'obtained' : ''}`}>{name}</div>;
};

GradeItem.propTypes = {
    isObtained: PropTypes.bool,
    name: PropTypes.string
};

class GradeChart extends React.Component {
    render() {
        return (
            <div className="grade-panel__chart">
                <div className="grade-panel__range">
                    {this.props.items.map(i => (
                        <GradeItem key={i.id} isObtained={i.isObtained} name={i.name} />
                    ))}
                </div>
            </div>
        );
    }
}

GradeChart.propTypes = {
    items: PropTypes.array,
    specializationId: PropTypes.string
};

export default GradeChart;
