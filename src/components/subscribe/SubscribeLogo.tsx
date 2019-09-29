import {
    graphql, StaticQuery,
} from "gatsby";
import config from "../../website-config";
import React from "react";

const query = graphql`
    query SubscribeOverlayLogo {
        logo: file(relativePath: { eq: "img/logo.png" }) {
        childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed {
            ...GatsbyImageSharpFixed
            }
        }
        }
    }
`;

interface SiteNavLogoProps {
    logo?: {
        childImageSharp: {
            fixed: any;
        };
    };
}

export default function ()
{
    return (
        <StaticQuery
            query={query}
            render={function (data: SiteNavLogoProps) /* eslint-disable-line */
            {
                if (data.logo)
                {
                    return (
                        <img
                            src={data.logo.childImageSharp.fixed.src}
                            alt={config.title}
                        />
                    );
                }
            }}
        />
    );
}
