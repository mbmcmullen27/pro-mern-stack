import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    NavItem, Modal, Form, Button, ButtonToolbar
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Toast from './Toast.jsx';

class IssueAddNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            toastVisible: false,
            toastMessage: '',
            toastType: 'success'
        }

        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.submit = this.submit.bind(this)
        this.showError = this.showError.bind(this)
        this.dismissToast = this.dismissToast.bind(this)
    }

    showModal() {
        this.setState({ showing: true })
    }

    hideModal() {
        this.setState({ showing: false })
    }

    dismissToast() {
        this.setState({ toastVisible: false })
    }

    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' })
    }

    submit(e) {
        e.preventDefault();
        this.hideModal();
        const form = document.forms.issueAddModal.elements;
        const newIssue = {
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date()
        }

        const { ...props } = this.props;
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue)
        }).then((response) => {
            if (response.ok) {
                response.json().then((updatedIssue) => {
                    props.history.push({ pathname: `/issues/${updatedIssue._id}` })
                })
            } else {
                response.json().then((error) => {
                    this.showError(`Failed to add issue: ${error.message}`)
                })
            }
        }).catch((err) => {
            this.showError(`Error in sending data to server: ${err.message}`)
        })
    }

    render() {
        const { ...state } = this.state;
        return (
            <NavItem onClick={this.showModal}>
                <i className="fa fa-plus" aria-hidden="true" />
                Create Issue
                <div onClick={e=>e.stopPropagation()}> {/*eslint-disable-line*/}
                    <Modal show={state.showing} onHide={this.hideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Issue</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form name="issueAddModal">
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="title" autoFocus />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Owner</Form.Label>
                                    <Form.Control name="owner" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonToolbar>
                                <Button type="submit" variant="primary" onClick={this.submit}>Glub</Button>
                                <Button type="button" variant="link" onClick={this.hideModal}>Cancel</Button>
                            </ButtonToolbar>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Toast
                    showing={state.toastVisible}
                    message={state.toastMessage}
                    onDismiss={this.dismissToast}
                    variant={state.toastType}
                />
            </NavItem>
        )
    }
}

IssueAddNavItem.propTypes = {
    router: PropTypes.object // eslint-disable-line
}

export default withRouter(IssueAddNavItem);
