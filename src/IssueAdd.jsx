import React from 'react';
import PropTypes from 'prop-types';

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
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button>Glub</button>
                </form>
            </div>
        )
    }
}

IssueAdd.propTypes = {
    createIssue: PropTypes.func.isRequired,
};
