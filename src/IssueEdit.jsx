import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumInput from './NumInput.jsx';

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
                completionDate: '',
                created: ''
            }
        };
        this.onChange = this.onChange.bind(this);
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

    loadData() {
        const { ...props } = this.props;
        fetch(`/api/issues/${props.match.params.id}`).then((response) => {
            if (response.ok) {
                response.json().then((issue) => {
                    issue.created = new Date(issue.created).toDateString();
                    issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate).toDateString() : '';
                    issue.effort = issue.effort != null ? issue.effort.toString() : '';
                    this.setState({ issue })
                })
            }
        })
    }

    render() {
        const { issue } = this.state;
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
                    Completion Date: <input name="CompletionDate" value={issue.completionDate} onChange={this.onChange} />
                    <br />
                    Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
                    <br />
                    <button type="submit">Glub</button>
                    <Link to="/issues">Back to issue list</Link>

                </form>
            </div>
        )
    }
}

IssueEdit.propTypes = {
    match: PropTypes.object.isRequired, //eslint-disable-line
}
