import React from 'react';
import { configure, shallow } from 'enzyme';
import IqInput from '../../common/ui-kit/iq-input/iq-input';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<IqInput />', () => {
    let spy;

    afterEach(() => {
        if (spy && spy.mockClear instanceof Function) {
            spy.mockClear();
        }
    });

    it('should render correctly', () => {
        const component = shallow(
            <IqInput
                data-key="testField"
                title="Test label"
                validation={[{ type: 'required' }, { type: 'length', value: 18 }]}
            />
        );
        expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should check validity once on input', () => {
        spy = jest.spyOn(IqInput.prototype, 'checkValidity');

        const component = shallow(
            <IqInput data-key="testField" title="Test label" validation={[{ type: 'required' }]} />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: 'hello' } });

        expect(spy).toBeCalledTimes(1);
    });

    it('should be valid', () => {
        const component = shallow(
            <IqInput
                data-key="testField"
                title="Test label"
                validation={[{ type: 'required' }, { type: 'length', value: 5 }, { type: 'equal', value: '12345' }]}
            />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: '12345' } });

        const { errors } = component.state();

        expect(errors).toEqual([]);
    });

    it('should fail length validation (should be more or equal than 18 symbols)', () => {
        const component = shallow(
            <IqInput data-key="testField" title="Test label" validation={[{ type: 'length', value: 18 }]} />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: 'lessThan18Symbols' } });

        const { errors } = component.state();

        expect(errors).toContain("This value's length should be more than 18 chars");
    });

    it('should fail require validation', () => {
        const component = shallow(
            <IqInput data-key="testField" title="Test label" validation={[{ type: 'required' }]} />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: '' } });

        const { errors } = component.state();

        expect(errors).toContain('This value is required');
    });

    it('should fail equal validation', () => {
        const component = shallow(
            <IqInput data-key="testField" title="Test label" validation={[{ type: 'equal', value: '123' }]} />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: '321' } });

        const { errors } = component.state();

        expect(errors).toContain('Values should be equal');
    });

    it('should fail min range validation', () => {
        const component = shallow(
            <IqInput
                data-key="testField"
                title="Test label"
                data-type="number"
                validation={[{ type: 'range', valueFrom: 2, valueTo: 5 }]}
            />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: 1 } });

        const { errors } = component.state();

        expect(errors).toContain('Values should be in range from 2 to 5');
    });

    it('should fail max range validation', () => {
        const component = shallow(
            <IqInput
                data-key="testField"
                title="Test label"
                data-type="number"
                validation={[{ type: 'range', valueFrom: 2, valueTo: 5 }]}
            />
        );

        const input = component.find('input');

        input.simulate('change', { currentTarget: { value: 7 } });

        const { errors } = component.state();

        expect(errors).toContain('Values should be in range from 2 to 5');
    });
});
