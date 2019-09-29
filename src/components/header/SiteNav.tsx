import config from "../../website-config";
import { Link, } from "gatsby";
import React from "react";
import SiteNavLogo from "./SiteNavLogo";
import SubModal from "../subscribe/SubscribeOverlay";

interface SiteNavProps {
    isHome?: boolean;
}

interface SiteNaveState {
    isOpen: boolean;
}

export default class SiteNav extends React.Component<SiteNavProps, SiteNaveState>
{
    subscribe = React.createRef<SubModal>();

    constructor(props: SiteNavProps)
    {
        super(props);
        this.state = { isOpen: false, };
    }

    openModal = () =>
    {
        if (this.subscribe.current)
        {
            this.subscribe.current.open();
        }
    };

    render = () =>
    {
        const { isHome = false, } = this.props;
        return (
            <nav>
                <div>
                    {!isHome && <SiteNavLogo />}
                    <ul role="menu">
                        {/* TODO: mark current nav item - add class nav-current *//* eslint-disable-line */}
                        <li role="menuitem">
                            <Link to="/">Home</Link>
                        </li>
                        <li role="menuitem">
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {config.showSub
                        && <a onClick={this.openModal}>
                            Subscribe
                        </a>
                    }
                    {config.showSub && <SubModal ref={this.subscribe} />}
                </div>
            </nav>
        );
    }
}
