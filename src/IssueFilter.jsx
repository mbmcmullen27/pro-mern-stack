import React from 'react';

export default class IssueFilter extends React.Component {
    constructor() {
        super()
        this.clearFilter = this.clearFilter.bind(this)
        this.setFilterOpen = this.setFilterOpen.bind(this)
        this.setFilterAssigned = this.setFilterAssigned.bind(this)
    }

    setFilterOpen(e) {
        const { ...props } = this.props;
        e.preventDefault();
        props.setFilter({ search: '?status=Open' });
    }

    setFilterAssigned(e) {
        const { ...props } = this.props;
        e.preventDefault();
        props.setFilter({ search: '?status=Assigned' });
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
                <a href="#" onClick={this.clearFilter}>All Issues</a> {/*eslint-disable-line*/}
                <Separator />
                <a href="#" onClick={this.setFilterOpen}>Open Issues</a> {/*eslint-disable-line*/}
                <Separator />
                <a href="#" onClick={this.setFilterAssigned}>Assigned Issues</a> {/*eslint-disable-line*/}
            </div>
        )
    }
}
