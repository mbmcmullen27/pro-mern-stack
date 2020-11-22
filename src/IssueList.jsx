import React from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import PropTypes from 'prop-types';

import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'

const IssueRow = (props) => {
    const { issue } = props;
    return (
        <tr>
            <td>
                <Link to={`/issues/${issue._id}`}>
                    {issue._id.substr(-4)}
                </Link>
            </td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    )
}
IssueRow.propTypes = {
    issue: PropTypes.object.isRequired, //eslint-disable-line
};

function IssueTable(props) {
    const { issues } = props;
    const issueRows = issues.map((issue) => <IssueRow key={issue._id} issue={issue} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </table>
    )
}
IssueTable.propTypes = {
    issues: PropTypes.array.isRequired, //eslint-disable-line
};

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };

        this.createIssue = this.createIssue.bind(this);
        this.createTestIssue = this.createTestIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { ...props } = this.props;
        const oldQuery = prevProps.location.search;
        const newQuery = props.location.search;
        if (oldQuery === newQuery) {
            return;
        }
        this.loadData();
    }

    setFilter(query) {
        const { ...props } = this.props;
        console.log({ props })
        this.props.history.push({ pathname: this.props.location.pathname,search: query.search }); //eslint-disable-line
    }

    loadData() {
        const { ...props } = this.props;
        fetch(`/api/issues${props.location.search}`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log('Total count of records:', data._metadata.total_count); //eslint-disable-line
                    data.records.forEach((issue) => {
                        issue.created = new Date(issue.created);
                        if (issue.completionDate)
                            issue.completionDate = new Date(issue.completionDate);
                    });
                    this.setState({ issues: data.records });
                });
            } else {
                response.json().then((error) => {
                    alert(`Failed to fetch issues: ${error.message}`)
                })
            }
        })
            .catch((err) => {
                console.log('Error in fetching data from server:', err); //eslint-disable-line
            });
    }

    createIssue(newIssue) {
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue),
        }).then((response) => {
            if (response.ok) {
                response.json().then((updatedIssue) => {
                    const { issues } = this.state
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate)
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    const newIssues = issues.concat(updatedIssue);
                    this.setState({ issues: newIssues });
                })
            } else {
                response.json().then((error) => {
                    alert(`Failed to add issue:  ${error.message}`)
                });
            }
        })
            .catch((err) => {
                alert(`Error in sending glub to server: ${err.message}`);
            });
    }

    createTestIssue() {
        this.createIssue({
            status: 'New',
            owner: 'finchboat',
            created: new Date(),
            title: 'your TV has no COMPUTE, plz insert computer'
        })
    }

    render() {
        const { issues } = this.state;
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter setFilter={this.setFilter} />
                <hr />
                <IssueTable issues={issues} />
                <button type="button" onClick={this.createTestIssue}>Glub</button>
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        )
    }
}

IssueList.propTypes = {
    location: PropTypes.object.isRequired, //eslint-disable-line
    router: PropTypes.object.isRequired //eslint-disable-line
}
