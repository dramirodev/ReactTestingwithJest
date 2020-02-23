import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            error: false,
        };
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleDecrement() {
        if (this.state.counter === 0) {
            this.setState({ error: true });
        } else {
            this.setState({ counter: this.state.counter - 1 });
        }
    }

    handleIncrement() {
        if (this.state.error) {
            this.setState({ error: false });
        }
        this.setState({ counter: this.state.counter + 1 });
    }
    render() {
        const errorClass = this.state.error ? '' : 'hidden';
        return (
            <div className='App' data-test='component-app'>
                <h1 data-test='counter-display'>
                    The counter is currently {this.state.counter}
                </h1>
                <h2
                    data-test='decrement-error'
                    className={`error ${errorClass}`}
                >
                    El contador debe de ser superior a 0
                </h2>
                <button
                    data-test='increment-button'
                    onClick={this.handleIncrement}
                >
                    Increment counter
                </button>
                <button
                    data-test='decrement-button'
                    onClick={this.handleDecrement}
                >
                    Decrement button
                </button>
            </div>
        );
    }
}

export default App;
