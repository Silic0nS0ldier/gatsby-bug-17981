import {
    graphql, Link, StaticQuery,
} from "gatsby";
import config from "../../website-config";
import React from "react";

const query = graphql`
    query HeadingQuery {
        logo: file(relativePath: { eq: "img/logo.png" }) {
        childImageSharp {
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
            render={(data: SiteNavLogoProps) => <Link to="/">
                {data.logo
                    ? <img src={data.logo.childImageSharp.fixed.src} alt={config.title} />
                    :                             config.title
                }
            </Link>
            }
        />
    );
}
