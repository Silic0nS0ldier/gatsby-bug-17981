import React from "react";

export function SiteTitle(props: React.HTMLProps<any>)
{
    return (
        <h1 {...props} />
    );
}

export function SiteDescription(props: React.HTMLProps<any>) /* eslint-disable-line */
{
    return (
        <h2 {...props} />
    );
}

export function SiteHeaderContent(props: React.HTMLProps<any>) /* eslint-disable-line */
{
    return (
        <div {...props} />
    );
}
