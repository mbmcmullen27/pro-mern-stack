import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';

export default class IssueEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            issue: {
                _id: '',
                title: '',
                status: '',
                owner: '',
                effort: null,
                completionDate: null,
                created: ''
            },
            invalidFields: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { ...props } = this.props
        if (prevProps.match.params.id !== props.match.params.id) {
            this.loadData();
        }
    }

    onChange(event, convertedValue) {
        const { issue } = this.state
        const value = (convertedValue !== undefined) ? convertedValue : event.target.value
        issue[event.target.name] = value;
        this.setState({ issue })
    }

    onValidityChange(event, valid) {
        const { invalidFields } = this.state
        if (!valid) {
            invalidFields[event.target.name] = true;
        } else {
            delete invalidFields[event.target.name];
        }
        this.setState({ invalidFields })
    }

    loadData() {
        const { ...props } = this.props;
        fetch(`/api/issues/${props.match.params.id}`).then((response) => {
            if (response.ok) {
                response.json().then((issue) => {
                    issue.created = new Date(issue.created).toDateString();
                    issue.completionDate = issue.completionDate != null
                        ? new Date(issue.completionDate) : null;
                    issue.effort = issue.effort != null ? issue.effort.toString() : '';
                    this.setState({ issue })
                })
            }
        })
    }

    render() {
        const { issue } = this.state;
        const { invalidFields } = this.state;
        const validationMessage = Object.keys(invalidFields).length === 0
            ? null : (<div className="error"> Please correct invalid fields before submitting.</div>)
        return (
            <div>
                <form>
                    ID: {issue._id}
                    <br />
                    Created: {issue.created}
                    <br />
                    Status:
                    <select name="status" value={issue.status} onChange={this.onChange}>
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Verified">Verified</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <br />
                    Owner: <input name="owner" value={issue.owner} onChange={this.onChange} />
                    <br />
                    Effort: <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
                    <br />
                    Completion Date:&nbsp;
                    <DateInput
                        name="CompletionDate"
                        value={issue.completionDate}
                        onChange={this.onChange}
                        onValidityChange={this.onValidityChange}
                    />
                    <br />
                    Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
                    <br />
                    {validationMessage}
                    <button type="submit">Glub</button>&nbsp;
                    <Link to="/issues">Back to issue list</Link>

                </form>
            </div>
        )
    }
}

IssueEdit.propTypes = {
    match: PropTypes.object.isRequired, //eslint-disable-line
}
