import {
    SiteDescription, SiteHeaderContent,
    SiteTitle,
} from "../styles/shared";
import {
    PageContext,
    renderPostCard,
} from "./post";
import config from "../website-config";
import Footer from "../components/Footer";
import { graphql, } from "gatsby";
import Helmet from "react-helmet";
import IndexLayout from "../layouts";
import React from "react";
import SiteNav from "../components/header/SiteNav";
import Wrapper from "../components/Wrapper";

interface TagTemplateProps {
    pathContext: {
        slug: string;
    };
    pageContext: {
        tag: string;
    };
    data: {
        allTagYaml: {
            edges: {
                node: {
                    id: string;
                    title?: string;
                    description: string;
                    image?: {
                        childImageSharp: {
                            fluid: any;
                        };
                    };
                };
            }[];
        };
        allMarkdownRemark: {
            totalCount: number;
            edges: {
                node: PageContext;
            }[];
        };
    };
}

export default function (props: TagTemplateProps & { children?: React.ReactNode })
{
    const tag = props.pageContext.tag ? props.pageContext.tag : "";
    const {
        edges, totalCount,
    } = props.data.allMarkdownRemark;
    const tags = props.data.allTagYaml.edges.find(
        n => n.node.id.toLowerCase() === tag.toLowerCase(), /* eslint-disable-line */
    );
    const tagData = tags && tags.node
        ? tags.node
        : {
            description: "",
            id: tag,
        };

    return (
        <IndexLayout>
            <Helmet>
                <title>{tagData.title || tag} - {config.title}</title>
                <meta name="description" content={tagData.description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${tag} - ${config.title}`} />
                <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${tag} - ${config.title}`} />
                <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
            </Helmet>
            <Wrapper>
                <header
                    style={{
                        backgroundImage: tagData.image /* eslint-disable-line */
                            && `url('${tagData.image.childImageSharp.fluid.src}')`,
                    }}
                >
                    <div>
                        <SiteNav isHome={false} />
                        <SiteHeaderContent>
                            <SiteTitle>{tagData.title || tag}</SiteTitle>
                            <SiteDescription>
                                {tagData.description
                                    || <>
                                        A collection of {totalCount > 1 && `${totalCount} posts`}
                                        {totalCount === 1 && `1 post`}
                                        {totalCount === 0 && `No posts`}
                                    </>
                                }
                            </SiteDescription>
                        </SiteHeaderContent>
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
  query($tag: String) {
    allTagYaml {
      edges {
        node {
          id
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 3720) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                fluid(maxWidth: 1240) {
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
