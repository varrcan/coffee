import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let arList = this.props.value.list;

        const listItems = arList.map((item, index) =>
            <li key={index}>{item}</li>
        );

        return (
            <div>
                <div className="">
                    <ul className="list">
                        {listItems}
                    </ul>
                </div>
            </div>
        );
    }
}
