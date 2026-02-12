import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import classNames from 'classnames';
import screenfull from 'screenfull';

import { path, applySpec } from "ramda";
import socketActions from "./store/actions/socket";

import NotFound  from './pages/NotFound'
import PlayerPage from './pages/PlayerPage';
import AppTopbarFn from './AppTopbarFn';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layoutMode: 'overlay',
            lightMenu: true,
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            isRTL: false,
            topbarColor: 'layout-topbar-bluegrey',
            inlineUser: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            rightPanelMenuActive: null,
            inlineUserMenuActive: false,
            menuActive: false,
            themeColor: 'bluegrey',
            configDialogActive: false
        };

        this.createMenu();
        console.log(props);
        if (props.socketRequest !== null) {
            console.log("Sending socket request")
          props.socketRequest();
        }
    }


    onDocumentClick = (event) => {
        if(!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if (!this.rightMenuClick) {
            this.setState({rightPanelMenuActive: false});
        }

        if (!this.configClick) {
            this.setState({configDialogActive: false});
        }

        if (!this.profileClick && this.isSlim() && !this.isMobile()) {
            this.setState({inlineUserMenuActive: false})
        }

        if(!this.menuClick) {
            if(this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }

            if (this.state.overlayMenuActive || this.state.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.setState({menuHoverActive: false});
            this.unblockBodyScroll();
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightMenuClick = false;
        this.profileClick = false;
        this.configClick = false;
    }

    onMenuButtonClick = (event) => {
        this.menuClick = true;
        this.setState(({
            topbarMenuActive: false,
            rightPanelMenuActive: false
        }));

        if(this.isOverlay()) {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }

        if(this.isDesktop())
            this.setState({staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive});
        else {
            this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
            if (this.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onConfigButtonClick = (event) => {
        this.configClick = true;
        this.setState({configDialogActive: !this.state.configDialogActive})
    }

    onConfigCloseClick = () => {
        this.setState({configDialogActive: false})
    }

    onConfigClick = () => {
        this.configClick = true;
    }

    onTopbarMenuButtonClick = (event) => {
        this.topbarItemClick = true;
        this.setState({topbarMenuActive: !this.state.topbarMenuActive});
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarItemClick = (event) => {
        this.topbarItemClick = true;

        if(this.state.activeTopbarItem === event.item)
            this.setState({activeTopbarItem: null});
        else
            this.setState({activeTopbarItem: event.item});

        event.originalEvent.preventDefault();
    }
    onMenuClick = (event) => {
        this.menuClick = true;
    }

    blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    onRightMenuButtonClick = (event) => {
        this.rightMenuClick = true;
        this.setState({rightPanelMenuActive: !this.state.rightPanelMenuActive});

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onRightMenuClick = (event) => {
        this.rightMenuClick = true;
    }

    onProfileMenuClick = (event) => {
        this.profileClick = true;
        this.setState({inlineUserMenuActive: !this.state.inlineUserMenuActive})
    }

    hideOverlayMenu = () => {
        this.setState({
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    }
    onMenuItemClick = (event) => {
        if(!event.item.items) {
            this.hideOverlayMenu();
        }
        if(!event.item.items && (this.isHorizontal() || this.isSlim())) {
            this.setState({
                menuActive: false
            })
        }
    }

    onRootMenuItemClick = (event) => {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }

    isTablet = () => {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop = () => {
        return window.innerWidth > 896;
    }

    isMobile = () => {
        return window.innerWidth <= 1025;
    }

    isStatic = () => {
        return this.state.layoutMode === 'static';
    }

    isOverlay = () => {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal = () => {
        return this.state.layoutMode === 'horizontal';
    }

    isSlim = () => {
        return this.state.layoutMode === 'slim';
    }

    changeMenuMode = (event) => {
        this.setState({
            layoutMode : event.menuMode,
            staticMenuDesktopInactive: false,
            overlayMenuActive: false
        });
        if(event.menuMode === 'slim' || event.menuMode === 'horizontal') {
            this.setState({
                inlineUser: false,
                inlineUserMenuActive: false
            })
        }
    }

    changeMenuColor = (event) => {
        this.setState({lightMenu : event.lightMenu})
    }

    changeProfileMode = (event) => {
        if(!event.inlineUser) {
            this.setState({
                inlineUser: event.inlineUser,
                inlineUserMenuActive: event.inlineUser
            })
        }
        else {
            if(!this.isHorizontal()) {
                this.setState({
                    inlineUser: event.inlineUser
                })
            }
        }
    }

    changeOrientation = (event) => {
        this.setState({isRTL: event.isRTL})
    }

    changeTopbarColor = (event) => {
        this.setState({topbarColor : event.topbarColor});
        const topbarLogoLink = document.getElementById('topbar-logo');
        topbarLogoLink.src = 'assets/layout/images/' + event.logo + '.svg';
    }

    createMenu() {
        this.menu = [

            { label: 'Table', icon: 'pi pi-fw pi-money-bill', to: '/'},
        ];
    }

    render() {
        const layoutClassName = classNames('layout-wrapper', {
            'layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-slim': this.state.layoutMode === 'slim',
            'layout-menu-light': this.state.lightMenu === true,
            'layout-menu-dark': this.state.lightMenu === false,
            'layout-overlay-active': this.state.overlayMenuActive,
            'layout-mobile-active': this.state.staticMenuMobileActive,
            'layout-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-rtl': this.state.isRTL
        }, this.state.topbarColor);

        return (
            <div className={layoutClassName} onClick={this.onDocumentClick}>
                {/* <AppTopbar topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem} inlineUser={this.state.inlineUser}
                           onRightMenuButtonClick={this.onRightMenuButtonClick} onMenuButtonClick={this.onMenuButtonClick}
                           onTopbarMenuButtonClick={this.onTopbarMenuButtonClick} onTopbarItemClick={this.onTopbarItemClick} />

                <div className='layout-menu-container' onClick={this.onMenuClick}>
                    <div className="menu-scroll-content">
                        <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                                layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                    </div>
                </div> */}

                <AppTopbarFn />
                
                <div className="layout-main">
                        <Route path="/" exact render={() => (<PlayerPage></PlayerPage>)} />
                </div>

                {/* <AppFooter /> */}

                <div className="layout-content-mask"></div>
            </div>
        );
    }
}

// export default App;

const mapStateToProps = applySpec({});

const mapDispatchToProps = {
    socketRequest: socketActions.socket.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);