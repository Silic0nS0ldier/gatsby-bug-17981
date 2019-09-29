import config from "../../website-config";
import React from "react";

export default function ()
{
    return (
        <form
            action={config.mailchimpAction}
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
            noValidate
        >
            <div>
                <input
                    type="email"
                    name="EMAIL"
                    placeholder="youremail@example.com"
                />
            </div>
            <div style={{
                left: "-5000px",
                position: "absolute",
            }} aria-hidden="true">
                <input type="text" name={config.mailchimpName} tabIndex={-1} />
            </div>
            <button type="submit">
                <span>Subscribe</span>
            </button>
        </form>
    );
}
