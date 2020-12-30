import React from 'react';

export default class Glub extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ addressee: 'internet' })
        }, 500)
    }

    render() {
        const { addressee } = this.state;
        return (
            <h1>Glub... Glub... {addressee}...</h1>
        )
    }
}
