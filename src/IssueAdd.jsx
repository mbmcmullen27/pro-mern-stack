import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';

export default class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const form = document.forms.issueAdd;
        const { props } = this;
        e.preventDefault();
        props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            create: new Date(),
        });
        // clear the form for the next input
        form.owner.value = ''; form.title.value = '';
    }

    render() {
        return (
            <div>
                <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
                    <FormControl name="owner" placeholder="Owner" />
                    &nbsp;
                    <FormControl name="title" placeholder="Title" />
                    &nbsp;
                    <Button variant="primary" type="submit">Glub</Button>
                </Form>
            </div>
        )
    }
}

IssueAdd.propTypes = {
    createIssue: PropTypes.func.isRequired,
};
