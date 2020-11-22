import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class IssueEdit extends React.Component { //eslint-disable-line
    render() {
        const { ...props } = this.props
        return (
            <div>
                SpaceHolder for the space to become the Issue
                <span> </span>
                {props.match.params.id}
                .
                <span> </span>
                <Link to="/issues">back to issue list</Link>
            </div>
        )
    }
}

IssueEdit.propTypes = {
    match: PropTypes.object.isRequired, //eslint-disable-line
}
