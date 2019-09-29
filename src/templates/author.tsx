import {
    SiteHeaderContent
} from "../styles/shared";
import {
    PageContext, renderPostCard,
} from "./post";
import config from "../website-config";
import Footer from "../components/Footer";
import { graphql, } from "gatsby";
import Helmet from "react-helmet";
import IndexLayout from "../layouts";
import React from "react";
import SiteNav from "../components/header/SiteNav";
import Wrapper from "../components/Wrapper";

interface AuthorTemplateProps {
    pathContext: {
        slug: string;
    };
    pageContext: {
        author: string;
    };
    data: {
        logo: {
            childImageSharp: {
                fluid: any;
            };
        };
        allMarkdownRemark: {
            totalCount: number;
            edges: {
                node: PageContext;
            }[];
        };
        authorYaml: {
            id: string;
            website?: string;
            twitter?: string;
            location?: string;
            profile_image?: { /* eslint-disable-line */
                childImageSharp: {
                    fluid: any;
                };
            };
            bio?: string;
            avatar: {
                childImageSharp: {
                    fluid: any;
                };
            };
        };
    };
}

function renderHeader(props: AuthorTemplateProps, totalCount: number)
{
    const author = props.data.authorYaml;

    return (
        <SiteHeaderContent>
            <img
                src={props.data.authorYaml.avatar.childImageSharp.fluid.src}
                alt={author.id}
            />
            <h1>{author.id}</h1>
            {author.bio && <h2>{author.bio}</h2>}
            <div>
                {author.location
                    && <div>
                        {author.location} <span>&bull;</span>
                    </div>
                }
                <div>
                    {totalCount > 1 && `${totalCount} posts `}
                    {totalCount === 1 && "1 post "}
                    {totalCount === 0 && "No posts "}
                    <span>•</span>
                </div>
            </div>
        </SiteHeaderContent>
    );
}

export default function (props: AuthorTemplateProps & { children?: React.ReactNode })
{
    const author = props.data.authorYaml;

    const edges = props.data.allMarkdownRemark.edges.filter(
        (edge) =>
        {
            const isDraft = edge.node.frontmatter.draft !== true
                || process.env.NODE_ENV === "development";
            return isDraft
                && edge.node.frontmatter.author
                && edge.node.frontmatter.author.id === author.id;
        }
    );
    const totalCount = edges.length;

    return (
        <IndexLayout>
            <Helmet>
                <title>
                    {author.id} - {config.title}
                </title>
                <meta name="description" content={author.bio} />
                <meta property="og:type" content="profile" />
                <meta property="og:title" content={`${author.id} - ${config.title}`} />
                <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${author.id} - ${config.title}`} />
                <meta
                    name="twitter:url"
                    content={`${config.siteUrl}/author/${props.pageContext.author}`}
                />
                {config.twitter
                    && <meta
                        name="twitter:creator"
                        content={`@${config.twitter.split("https://twitter.com/")[1]}`}
                    />
                }
            </Helmet>
            <Wrapper>
                <header
                    style={{
                        backgroundImage: author.profile_image /* eslint-disable-line */
                            ? `url(${author.profile_image.childImageSharp.fluid.src})`
                            : "",
                    }}
                >
                    <div>
                        <SiteNav isHome={false} />
                        {renderHeader(props, totalCount)}
                    </div>
                </header>
                <main>
                    <div>
                        <div>
                            {edges.map(renderPostCard)}
                        </div>
                    </div>
                </main>
                <Footer />
            </Wrapper>
        </IndexLayout>
    );
}

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      website
      twitter
      bio
      location
      profile_image {
        childImageSharp {
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            draft
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 100) {
                      src
                    }
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
