import {
    graphql, Link, StaticQuery,
} from "gatsby";
import config from "../website-config";
import kebabCase from "just-kebab-case";
import React from "react";

export interface ReadNextQuery {
    header: {
        childImageSharp: {
            fluid: any;
        };
    };
}

const query = graphql`
    query ReadNextQuery {
        header: file(relativePath: { eq: "img/150.png" }) {
            childImageSharp {
                # Specify the image processing specifications right in the query.
                # Makes it trivial to update as your page's design changes.
                fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

export interface ReadNextProps {
    tags: string[];
    relatedPosts: {
        totalCount: number;
        edges: {
            node: {
                timeToRead: number;
                frontmatter: {
                    title: string;
                };
                fields: {
                    slug: string;
                };
            };
        }[];
    };
}

export default function (props: ReadNextProps)
{
    return (
        <StaticQuery
            query={query}

            // tslint:disable-next-line:react-this-binding-issue
            render={({ header, }: ReadNextQuery) => <article
                style={{ backgroundImage: `url(${header.childImageSharp.fluid.src})`, } /* eslint-disable-line */}
            >
                <header>
                    <small>
                            &mdash; {config.title} &mdash;
                    </small>
                    <h3>
                        <Link to={`/tags/${kebabCase(props.tags[0])}/`}>{props.tags[0]}</Link>
                    </h3>
                </header>
                <div>
                    <ul>
                        {props.relatedPosts.edges.map(n => <li key={n.node.frontmatter.title /* eslint-disable-line */}>
                            <Link to={n.node.fields.slug}>{n.node.frontmatter.title}</Link>
                        </li>)}
                    </ul>
                </div>
                <footer>
                    <Link to={`/tags/${kebabCase(props.tags[0])}/`}>
                        {props.relatedPosts.totalCount > 1
                                && `See all ${props.relatedPosts.totalCount} posts`}
                        {props.relatedPosts.totalCount === 1 && `1 post`}
                        {props.relatedPosts.totalCount === 0 && `No posts`} →
                    </Link>
                </footer>
            </article>
            }
        />
    );
}
