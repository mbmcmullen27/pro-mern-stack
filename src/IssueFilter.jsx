import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueFilter extends React.Component { //eslint-disable-line
    constructor() {
        super()
        this.clearFilter = this.clearFilter.bind(this)
        this.setFilterOpen = this.setFilterOpen.bind(this)
        this.setFilterAssigned = this.setFilterAssigned.bind(this)
    }

    setFilterOpen(e) {
        const { ...props } = this.props;
        e.preventDefault();
        props.setFilter({ status: 'Open' });
    }

    setFilterAssigned(e) {
        const { ...props } = this.props;
        e.preventDefault();
        props.setFilter({ status: 'Assigned' });
    }

    clearFilter(e) {
        const { ...props } = this.props;
        e.preventDefault();
        props.setFilter({});
    }

    render() {
        const Separator = () => <span> 🐟 </span>;
        return (
            <div>
                <Link to="/issues">All Issues</Link>
                <Separator />
                <Link to={{ pathname: '/issues', search: '?status=Open' }}>
                    Open Issues
                </Link>
                <Separator />
                <Link to={{ pathname: '/issues', search: '?status=Assigned' }}>Assigned Issues</Link>
            </div>
        )
    }
}
