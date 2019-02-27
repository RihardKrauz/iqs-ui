import { useState } from 'react';

export class ValidatedField {
    constructor(name, initialValue, validationParams = []) {
        const [value, setValue] = useState(initialValue);
        const [events, setEvents] = useState({});

        this.name = name;
        this.value = value;
        this.onChange = setValue;
        this.bindEvents = setEvents;
        this.validation = {
            params: validationParams,
            validate: (customValue, customValidationParams) => {
                return events.checkValidity(customValue || value, customValidationParams || validationParams);
            },
            addCustomError: events.addCustomError,
            removeCustomError: events.removeCustomError
        };
    }

    addValidationParam = (type, value) => this.validation.params.push({ type, value });
}
