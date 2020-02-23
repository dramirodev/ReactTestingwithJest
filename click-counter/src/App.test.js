import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});

/**
 * Factory function to create a ShallowWrapper for the App
 * @function setup
 * @param {objet} props - Component props specific for this setup
 * @param {object} state- Initial state for setup
 * @returns {ShallowWrapper}
 */

const setup = (props, state = null) => {
    const wrapper = shallow(<App {...props} />);
    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrpper to search within.
 * @param {string} val- data-test attribute for search
 * @returns {ShallowWrapper} s
 */

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

test('should render without errors', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');

    expect(appComponent.length).toBe(1);
});

test('should render increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');

    expect(button.length).toBe(1);
});

test('should display the counter', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
});

test('should counter start at 0', () => {
    const wraper = setup();
    const initialCounterState = wraper.state('counter');
    expect(initialCounterState).toBe(0);
});

test('should clicking the button increment the counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
    // Simular el evento click sobre el botón
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');

    // Comprobar valor del contador
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
});

describe('counter is 0 and decrement is clicked', () => {
    // using a describe here so I can use a "beforeEach" for shared setup

    // scoping wrapper to the describe, so it can be used in beforeEach and the tests
    let wrapper;
    beforeEach(() => {
        // no need to set counter value here; default value of 0 is good
        wrapper = setup();

        // find button and click
        const button = findByTestAttr(wrapper, 'decrement-button');
        button.simulate('click');
        wrapper.update();
    });
    test('error shows', () => {
        // check the class of the error message
        const erroMessage = findByTestAttr(wrapper, 'decrement-error');
        const errorMessageHasClass = erroMessage.hasClass('hidden');
        expect(errorMessageHasClass).toBe(false);
    });
    test('counter still displays 0', () => {
        const counterDisplay = findByTestAttr(wrapper, 'counter-display');
        expect(counterDisplay.text()).toContain(0);
    });
    test('clicking increment clears the error', () => {
        // find and click the increment button
        const button = findByTestAttr(wrapper, 'increment-button');
        button.simulate('click');

        // check the class of the error message
        const erroMessage = findByTestAttr(wrapper, 'decrement-error');
        const errorMessageHasClass = erroMessage.hasClass('hidden');
        expect(errorMessageHasClass).toBe(true);
    });
});
