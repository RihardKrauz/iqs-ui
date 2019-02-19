import { useState } from 'react';

export class ValidatedField {
    constructor(name, initialValue, validationParams = []) {
        const [value, setValue] = useState(initialValue);
        const [validateAction, setValidateAction] = useState({});

        this.name = name;
        this.value = value;
        this.onChange = setValue;
        this.validation = {
            params: validationParams,
            bindAction: setValidateAction,
            validate: (customValue, customValidationParams) => {
                return validateAction.event(customValue || value, customValidationParams || validationParams);
            }
        };
    }

    addValidationParam = (type, value) => this.validation.params.push({ type, value });
}
