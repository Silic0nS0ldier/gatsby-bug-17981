import SubscribeForm from "./SubscribeForm";
import config from "../../website-config";
import React from "react";
import SubscribeLogo from "./SubscribeLogo"; /* eslint-disable-line */

interface SubscribeState {
    isOpen: boolean;
}

export default class SubscribeModal extends React.Component<any, SubscribeState> /* eslint-disable-line */
{
    constructor(props: any)
    {
        super(props);
        this.state = { isOpen: false, };
    }

    componentWillUnmount() /* eslint-disable-line */
    {
        this.unsubscribeEsc();
    }

    escFunction = (event: KeyboardEvent) =>
    {
        if (event.key === "Escape")
        {
            this.close();
        }
    };

    subscribeEsc()
    {
        document.addEventListener("keydown", this.escFunction, false);
    }

    unsubscribeEsc() /* eslint-disable-line */
    {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    open = () =>
    {
        this.setState({ isOpen: true, });
        this.subscribeEsc();
    };

    close = () =>
    {
        this.setState({ isOpen: false, });
        this.unsubscribeEsc();
    };

    render()
    {
        const { isOpen, } = this.state;

        return (
            <div
                style={{
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none", /* eslint-disable-line */
                }}
            >
                <a onClick={this.close} />
                <div>
                    <SubscribeLogo />
                    <h1>Subscribe to {config.title}</h1>
                    <p>
                        Stay up to date! Get all the latest &amp; greatest posts delivered straight
                        to your inbox
                    </p>
                    <SubscribeForm />
                </div>
            </div>
        );
    }
}
