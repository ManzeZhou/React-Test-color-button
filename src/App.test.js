import {fireEvent, logRoles, render, screen} from '@testing-library/react';
import App from './App';

test('button had correct initial color', () => {
    const {container} = render(<App/>);
    logRoles(container);

    // find an element with the following text
    const colorButton = screen.getByRole('button', {name: 'Change to blue'});

    // expect the background color to be red
    expect(colorButton).toHaveStyle({backgroundColor: 'red'})

    // click button
    fireEvent.click(colorButton);

    // expect background color to be blue
    expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

    //expect the button text to be change to red
    expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
    render(<App />);
    // check btn enabled
    const colorButton = screen.getByRole('button', { name: 'Change to blue'});

    expect(colorButton).toBeEnabled();

    // check checkbox starts out unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
});

test('checkbox disables btn on first click and enables on second click', ()=>{
    render(<App />);

    const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
    const button = screen.getByRole('button');

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
})

test('Disabled btn has gray background and reverts to red', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
    const button = screen.getByRole('button', {name: 'Change to blue'});

    //disable btn
    fireEvent.click(checkbox);
    expect(button).toHaveStyle('background-color: gray');

    //re-enable btn
    fireEvent.click(checkbox);
    expect(button).toHaveStyle('background-color: red');
});

test('Clicked disabled btn has gray background and reverts to blue', () =>{
    render(<App />);
    const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
    const button = screen.getByRole('button', {name: 'Change to blue'});

    //change btn to blue
    fireEvent.click(button);

    //disable btn
    fireEvent.click(checkbox);
    expect(button).toHaveStyle('background-color: gray');

    //re-enable btn
    fireEvent.click(checkbox);
    expect(button).toHaveStyle('background-color: blue');
});

