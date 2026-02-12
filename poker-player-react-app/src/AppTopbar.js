import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import axios from 'axios';


class AppTopbar extends Component {

    static defaultProps = {
        onMenuButtonClick: null,
        onTopbarMenuButtonClick: null,
        onTopbarItemClick: null,
        onRightMenuButtonClick: null,
        topbarMenuActive: false,
        activeTopbarItem: null,
        inlineUser: null,
        onThemeChange: null
    }

    static propTypes = {
        user: PropTypes.object,
        dispatch: PropTypes.func,
        onMenuButtonClick: PropTypes.func.isRequired,
        onTopbarMenuButtonClick: PropTypes.func.isRequired,
        onTopbarItemClick: PropTypes.func.isRequired,
        onRightMenuButtonClick: PropTypes.func.isRequired,
        topbarMenuActive: PropTypes.bool.isRequired,
        activeTopbarItem: PropTypes.string,
        inlineUser: PropTypes.bool,
        onThemeChange: PropTypes.func
    }

    constructor() {
        super();
        this.state = {};
    }

    onTopbarItemClick(event, item) {
        if (this.props.onTopbarItemClick) {
            this.props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    handleLogout = () => {
        axios.post("logout").then(this.logoutResponse);
    };

    logoutResponse = (response) => {
        window.location = '/login';
    };

    render() {
        return <div className="layout-topbar">
            <div style={{ padding: '12px 20px' }}>

                <button className="p-link layout-menu-button layout-topbar-icon" onClick={this.props.onMenuButtonClick}>
                    <i className="pi pi-bars"></i>
                </button>

            </div>
        </div>;
    }
}


const mapStateToProps = (state) => {
    return { admin: state.admin }
};

export default connect(mapStateToProps)(AppTopbar);


