import React from 'react'
import Search from './components/search'
import List from './components/list'

export default class Coffee extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            worker: props.data || null,
            list: []
        };
    }

    setListState = (value) => {
        this.setState({
            list: this.state.list.concat(value)
        });
    };

    render = () => {
        return (
            <div>
                <Search value={this.state.worker}
                        setListState={this.setListState} />
                <List value={this.state} />
            </div>
        );
    };
}
