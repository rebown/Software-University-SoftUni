import React from 'react';

export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: null
        };

        controlChangeHandlerFactory = name => e => {
            const newValue = e.target.value;
            this.setState(({ form }) => {
                return { form: { ...form, [name]: newValue } };
            });
        }

        getFormState = () => {
            return this.state.form;
        }


        render() {
            return <Cmp {...this.props} controlChangeHandlerFactory={this.controlChangeHandlerFactory} getFormState={this.getFormState} />
        }


    }
}