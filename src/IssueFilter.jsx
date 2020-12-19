import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, Col, Row, Form, InputGroup, ButtonToolbar, Button
} from 'react-bootstrap';

export default class IssueFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: props.initFilter.match(/status=(\w+)/) ? props.initFilter.match(/status=(\w+)/)[1] : '',
            effort_gte: props.initFilter.match(/effort_gte=(\d+)/) ? props.initFilter.match(/effort_gte=(\d+)/)[1] : '',
            effort_lte: props.initFilter.match(/effort_lte=(\d+)/) ? props.initFilter.match(/effort_lte=(\d+)/)[1] : '',
            changed: false
        }
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onChangeEffortGte = this.onChangeEffortGte.bind(this)
        this.onChangeEffortLte = this.onChangeEffortLte.bind(this)
        this.applyFilter = this.applyFilter.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.clearFilter = this.clearFilter.bind(this)
    }

    onChangeStatus(e) {
        this.setState({ status: e.target.value, changed: true });
    }

    onChangeEffortGte(e) {
        const effortString = e.target.value;
        if (effortString.match(/^\d*$/)) {
            this.setState({ effort_gte: e.target.value, changed: true })
        }
    }

    onChangeEffortLte(e) {
        const effortString = e.target.value;
        if (effortString.match(/^\d*$/)) {
            this.setState({ effort_lte: e.target.value, changed: true })
        }
    }

    resetFilter() {
        const { ...props } = this.props;
        this.setState({
            status: props.initFilter.match(/status=(\w+)/) ? props.initFilter.match(/status=(\w+)/)[1] : '',
            effort_gte: props.initFilter.match(/effort_gte=(\d+)/) ? props.initFilter.match(/effort_gte=(\d+)/)[1] : '',
            effort_lte: props.initFilter.match(/effort_lte=(\d+)/) ? props.initFilter.match(/effort_lte=(\d+)/)[1] : '',
            changed: false
        })
    }

    clearFilter(e) {
        const { ...props } = this.props;
        e.preventDefault();
        props.setFilter({});
    }

    applyFilter() {
        const newFilter = {};
        const { setFilter } = this.props
        const { ...state } = this.state;
        let search = '';
        if (state.status) newFilter.status = `status=${state.status}`;
        if (state.effort_gte) newFilter.effort_gte = `effort_gte=${state.effort_gte}`;
        if (state.effort_lte) newFilter.effort_lte = `effort_lte=${state.effort_lte}`;
        search = `?${Object.values(newFilter).join('&')}`
        // console.log({ search })
        setFilter({ search })
    }

    render() {
        const { ...state } = this.state;
        return (
            <Card.Body>
                <Row>
                    <Col xs={12} sm={4} md={3}>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={state.status}
                                onChange={this.onChangeStatus}
                            >
                                <option value="">(Any)</option>
                                <option value="New">New</option>
                                <option value="Open">Open</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Fixed">Fixed</option>
                                <option value="Verified">Verified</option>
                                <option value="Closed">Closed</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={4} md={3}>
                        <Form.Group>
                            <Form.Label>Effort</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    value={state.effort_gte}
                                    onChange={this.onChangeEffortGte}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>-</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control
                                    value={state.effort_lte}
                                    onChange={this.onChangeEffortLte}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={4} md={3}>
                        <Form.Group>
                            <Form.Label>&nbsp;</Form.Label>
                            <ButtonToolbar>
                                <Button variant="primary" onClick={this.applyFilter}>Glub</Button>
                                &nbsp;
                                <Button variant="secondary" onClick={this.resetFilter} disabled={!state.changed}>
                                    Reset
                                </Button>
                                &nbsp;
                                <Button variant="secondary" onClick={this.clearFilter}>Clear</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        )
    }
}

IssueFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    initFilter: PropTypes.string.isRequired //eslint-disable-line
}
