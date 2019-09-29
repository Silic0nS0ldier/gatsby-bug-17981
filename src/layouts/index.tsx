import config from "../website-config";
import favicon from "../../src/favicon.ico";
import Helmet from "react-helmet";
import React from "react";

interface IndexProps
{
    className?: string;
    children?: React.ReactNode;
}

export default function ({
    className, children,
}: IndexProps)
{
    return (
        <div className={className}>
            <Helmet>
                <html lang={config.lang} />
                <link rel="icon" href={favicon} type="image/x-icon" />
                <meta property="og:site_name" content={config.title} />
                {config.twitter && <meta
                    name="twitter:site"
                    content={`@${config.twitter.split("https://twitter.com/")[1]}`}
                />}
                {config.twitter && <meta
                    name="twitter:creator"
                    content={`@${config.twitter.split("https://twitter.com/")[1]}`}
                />}
            </Helmet>
            {children}
        </div>
    );
};
