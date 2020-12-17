import React from 'react';
import PropTypes from 'prop-types';
import {
    Col, Row, FormGroup, FormControl, FormLabel, InputGroup, ButtonToolbar, Button
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
            <Row>
                <Col xs={6} sm={4} md={3} lg={2}>
                    <FormGroup>
                        <FormLabel>Status</FormLabel>
                        <FormControl
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
                        </FormControl>
                    </FormGroup>
                </Col>
                <Col xs={6} sm={4} md={3} lg={2}>
                    <FormGroup>
                        <FormLabel>Effort</FormLabel>
                        <InputGroup>
                            <FormControl
                                value={state.effort_gte}
                                onChange={this.onChangeEffortGte}
                            />
                            <InputGroup.Append>-</InputGroup.Append>
                            <FormControl
                                value={state.effort_lte}
                                onChange={this.onChangeEffortLte}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col xs={6} sm={4} md={3} lg={2}>
                    <FormGroup>
                        <FormLabel>&nbsp;</FormLabel>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.applyFilter}>Glub</Button>
                            <Button onClick={this.resetFilter}>Reset</Button>
                            <Button onClick={this.clearFilter}>Clear</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

IssueFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    initFilter: PropTypes.string.isRequired //eslint-disable-line
}
