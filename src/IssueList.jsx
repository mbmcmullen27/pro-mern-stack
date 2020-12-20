import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button, Table, Accordion, Card
} from 'react-bootstrap';
import 'whatwg-fetch';
import PropTypes from 'prop-types';

import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'
import Toast from './Toast.jsx'

const IssueRow = (props) => {
    function onDeleteClick() {
        props.deleteIssue(props.issue._id)
    }

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
            <td><Button size="xsmall" onClick={onDeleteClick}><i className="fa fa-bomb" aria-hidden="true" /></Button></td>
        </tr>
    )
}

IssueRow.propTypes = {
    issue: PropTypes.object.isRequired, //eslint-disable-line
    deleteIssue: PropTypes.func.isRequired
};

function IssueTable(props) {
    const { issues } = props;
    const issueRows = issues.map(
        (issue) => <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />
    )
    return (
        <Table bordered striped hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                    <th>🦀</th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </Table>
    )
}
IssueTable.propTypes = {
    issues: PropTypes.array.isRequired, //eslint-disable-line
    deleteIssue: PropTypes.func.isRequired
};

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: [],
            toastVisible: false,
            toastMessage: '',
            toastType: 'success'
        };

        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);

        this.createIssue = this.createIssue.bind(this);
        this.createTestIssue = this.createTestIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
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
        this.props.history.push({ pathname: this.props.location.pathname, search: query.search }); //eslint-disable-line
    }

    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' })
    }

    dismissToast() {
        this.setState({ toastVisible: false })
    }

    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) alert('Failed to delete issue');
                else this.loadData();
            })
    }

    loadData() {
        const { ...props } = this.props;
        // console.log({ location })
        // console.log({ match })
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
                    this.showError(`Failed to fetch issues: ${error.message}`)
                })
            }
        })
            .catch((err) => {
                this.showError('Error in fetching data from server:', err); //eslint-disable-line
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
                    this.showError(`Failed to add issue:  ${error.message}`)
                });
            }
        })
            .catch((err) => {
                this.showError(`Error in sending glub to server: ${err.message}`);
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
        const {
            issues, toastVisible, toastMessage, toastType
        } = this.state;
        const { ...props } = this.props;
        return (
            <div>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Filter
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <IssueFilter
                                setFilter={this.setFilter}
                                initFilter={props.location.search}
                            />
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <IssueTable issues={issues} deleteIssue={this.deleteIssue} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <Toast
                    showing={toastVisible}
                    message={toastMessage}
                    onDismiss={this.dismissToast}
                    variant={toastType}
                />
                <hr />
                <Button variant="success" type="button" onClick={this.createTestIssue}>Glub</Button>
            </div>
        )
    }
}

IssueList.propTypes = {
    location: PropTypes.object.isRequired, //eslint-disable-line
}
