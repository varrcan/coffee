import React from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            worker: this.props.value,
            suggestions: []
        };
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({value}) => {

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength === 0) {
            this.setState({suggestions: []});
            return;
        }

        const filterList = this.state.worker.filter(item =>
            item.toLowerCase().slice(0, inputLength) === inputValue
        );

        this.setState({
            suggestions: filterList
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, param) => {
        let value = param.suggestionValue;
        if (!value) {
            return;
        }

        let worker = this.state.worker;
        let index = worker.indexOf(value);
        if (index >= 0) {
            worker.splice(index, 1);
        }

        this.setState({
            worker: worker,
            value: ''
        });

        this.props.setListState([value]);
    };

    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: "введите фамилию сотрудника",
            value: value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} />
        );
    };
}
