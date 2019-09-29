import {
    graphql, Link,
} from "gatsby";
import {
    PageContext, renderPostCard,
} from "../templates/post";
import SiteNavLogo from "../components/header/SiteNavLogo";
import IndexLayout from "../layouts";
import React from "react";
import Wrapper from "../components/Wrapper";

interface NotFoundTemplateProps {
    data: {
        allMarkdownRemark: {
            totalCount: number;
            edges: {
                node: PageContext;
            }[];
        };
    };
}

export default function (props: NotFoundTemplateProps & { children?: React.ReactNode })
{
    const { edges, } = props.data.allMarkdownRemark;

    return (
        <IndexLayout>
            <Wrapper>
                <header>
                    <div>
                        <nav>
                            <SiteNavLogo />
                        </nav>
                    </div>
                </header>
                <main>
                    <div>
                        <section style={{ textAlign: "center", }}>
                            <h1>404</h1>
                            <p>Page not found</p>
                            <Link to={""}>
                                Go to the front page →
                            </Link>
                        </section>
                    </div>
                </main>
                <aside>
                    <div>
                        <div>
                            {edges.map(renderPostCard)}
                        </div>
                    </div>
                </aside>
            </Wrapper>
        </IndexLayout>
    );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
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
