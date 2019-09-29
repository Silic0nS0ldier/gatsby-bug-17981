import {
    SiteDescription, SiteHeaderContent,
    SiteTitle,
} from "../styles/shared";
import PostCard from "../components/PostCard";
import config from "../website-config";
import Footer from "../components/Footer";
import { graphql, } from "gatsby";
import Helmet from "react-helmet";
import IndexLayout from "../layouts";
import { PageContext, } from "../templates/post";
import React from "react";
import SiteNav from "../components/header/SiteNav";
import Wrapper from "../components/Wrapper";

function renderPostCard({ node, }: { node: PageContext, }) /* eslint-disable-line */
{
    if (node.frontmatter.draft !== true || process.env.NODE_ENV !== "production")
    {
        return <PostCard key={node.fields.slug} post={node} />;
    }
}

export interface IndexProps {
    data: {
        logo: {
            childImageSharp: {
                fixed: any;
            };
        };
        header: {
            childImageSharp: {
                fluid: any;
            };
        };
        allMarkdownRemark: {
            edges: {
                node: PageContext;
            }[];
        };
    };
}

export default function (props: IndexProps & { children: React.ReactNode })
{
    const width = props.data.header.childImageSharp.fluid.sizes.split(", ")[1].split("px")[0];
    const height = String(Number(width) / props.data.header.childImageSharp.fluid.aspectRatio);
    return (
        <IndexLayout>
            <Helmet>
                <title>{config.title}</title>
                <meta name="description" content={config.description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={config.title} />
                <meta property="og:description" content={config.description} />
                <meta property="og:url" content={config.siteUrl} />
                <meta
                    property="og:image"
                    content={`${config.siteUrl}${props.data.header.childImageSharp.fluid.src}`}
                />
                <meta property="og:image:width" content={width} />
                <meta property="og:image:height" content={height} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={config.title} />
                <meta name="twitter:description" content={config.description} />
                <meta name="twitter:url" content={config.siteUrl} />
                <meta
                    name="twitter:image"
                    content={`${config.siteUrl}${props.data.header.childImageSharp.fluid.src}`}
                />
            </Helmet>
            <Wrapper>
                <header
                    style={{ backgroundImage: `url('${props.data.header.childImageSharp.fluid.src}')`, } /* eslint-disable-line */}
                >
                    <div>
                        <SiteHeaderContent>
                            <SiteTitle>
                                {props.data.logo
                                    ? <img
                                        style={{ maxHeight: "45px", }}
                                        src={props.data.logo.childImageSharp.fixed.src}
                                        alt={config.title}
                                    />
                                    : config.title
                                }
                            </SiteTitle>
                            <SiteDescription>{config.description}</SiteDescription>
                        </SiteHeaderContent>
                        <SiteNav isHome={true} />
                    </div>
                </header>
                <main>
                    <div>
                        <div>
                            {props.data.allMarkdownRemark.edges.map(renderPostCard)}
                        </div>
                    </div>
                </main>
                {props.children}
                <Footer />
            </Wrapper>
        </IndexLayout>
    );
}

export const pageQuery = graphql`
  query {
    logo: file(relativePath: { eq: "img/150.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/150.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(limit: 1000, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
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
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
