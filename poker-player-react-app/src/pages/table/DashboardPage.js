import React, {Component} from 'react';
import {connect} from 'react-redux'; 

import OverViewTabFn from './tabs/OverViewTabFn';


class DashboardPage extends Component {

	constructor() {
        super();
        this.state = {
			activeIndex: 0,
		};
    }

	render() {
		return <div>
			<OverViewTabFn></OverViewTabFn>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {user: state.user}
};

export default connect(mapStateToProps)(DashboardPage);