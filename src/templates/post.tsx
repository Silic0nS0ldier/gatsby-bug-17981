import {
    graphql, Link,
} from "gatsby";
import PostContent from "../components/PostContent";
import AuthorCard from "../components/AuthorCard";
import config from "../website-config";
import Footer from "../components/Footer";
import { Helmet, } from "react-helmet";
import Img from "gatsby-image";
import IndexLayout from "../layouts";
import kebabCase from "just-kebab-case";
import PostCard from "../components/PostCard";
import PostFullFooter from "../components/PostFullFooter"; /* eslint-disable-line */
import PostFullFooterRight from "../components/PostFullFooterRight"; /* eslint-disable-line */
import React from "react";
import ReadNextCard from "../components/ReadNextCard";
import SiteNav from "../components/header/SiteNav";
import Subscribe from "../components/subscribe/Subscribe";
import Wrapper from "../components/Wrapper";

/**
 * Renders a post card using data from provided node.
 */
export function renderPostCard({ node, }: { node: PageContext }) /* eslint-disable-line */
{
    if (node.frontmatter.draft !== true || process.env.NODE_ENV !== "production")
    {
        return (
            <PostCard
                key={node.fields.slug}
                post={node}
            />
        );
    }
}

interface PageTemplateProps {
    pathContext: {
        slug: string;
    };
    data: {
        logo: {
            childImageSharp: {
                fixed: any;
            };
        };
        markdownRemark: {
            html: string;
            htmlAst: any;
            excerpt: string;
            timeToRead: string;
            frontmatter: {
                title: string;
                date: string;
                userDate: string;
                image: {
                    childImageSharp: {
                        fluid: any;
                    };
                };
                tags: string[];
                author: {
                    id: string;
                    bio: string;
                    avatar: {
                        children: {
                            fixed: {
                                src: string;
                            };
                        }[];
                    };
                };
            };
        };
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
    };
    pageContext: {
        prev: PageContext;
        next: PageContext;
    };
}

export interface PageContext {
    excerpt: string;
    timeToRead: number;
    fields: {
        slug: string;
    };
    frontmatter: {
        image: {
            childImageSharp: {
                fluid: any;
            };
        };
        title: string;
        date: string;
        draft?: boolean;
        tags: string[];
        author: {
            id: string;
            bio: string;
            avatar: {
                children: {
                    fixed: {
                        src: string;
                    };
                }[];
            };
        };
    };
}

function renderHead(props: PageTemplateProps)
{
    const post = props.data.markdownRemark;

    let width = "";
    let height = "";
    if (post.frontmatter.image && post.frontmatter.image.childImageSharp)
    {
        width = post.frontmatter.image.childImageSharp.fluid.sizes.split(", ")[1].split("px")[0];
        height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
    }

    return (
        <Helmet>
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
            {(post.frontmatter.image && post.frontmatter.image.childImageSharp)
                && <meta
                    property="og:image"
                    content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
                />}
            <meta property="article:published_time" content={post.frontmatter.date} />
            {/* not sure if modified time possible *//* eslint-disable-line */}
            {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> *//* eslint-disable-line */}
            {post.frontmatter.tags
                && <meta property="article:tag" content={post.frontmatter.tags.join(" / ")} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.frontmatter.title} />
            <meta name="twitter:description" content={post.excerpt} />
            <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
            {(post.frontmatter.image && post.frontmatter.image.childImageSharp)
                && <meta
                    name="twitter:image"
                    content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
                />}
            <meta name="twitter:label1" content="Written by" />
            <meta name="twitter:data1" content={post.frontmatter.author.id} />
            {post.frontmatter.tags && [
                <meta key="twitter:label2" name="twitter:label2" content="Filed under" />,
                <meta
                    key="twitter:data2"
                    name="twitter:data2"
                    content={post.frontmatter.tags.join(" / ")}
                />,
            ]}
            {width && <meta property="og:image:width" content={width} />}
            {height && <meta property="og:image:height" content={height} />}
        </Helmet>
    );
}

function renderTags(tags?: string[])
{
    if (tags && tags.length > 0)
    {
        if (tags.length > 1)
        {
            const content = [
                <div key="break" style={{ flexBasis: "100%", }} />,
            ];

            tags.forEach((tag, i) /* eslint-disable-line */ =>
            {
                if (content.length > 1)
                {
                    content.push(
                        <span key={`tag-divider-${i - 1}`}>/</span>
                    );
                }
                content.push(
                    <Link key={`tag-${tag}`} to={`/tags/${kebabCase(tag)}/`}>
                        {tag}
                    </Link>
                );
            });

            return content;
        }
        else if (tags.length === 1)
        {
            const tag = tags[0];
            return (
                <>
                    <span key="tag-divider">/</span>
                    <Link key={`tag-${tag}`} to={`/tags/${kebabCase(tag)}/`}>
                        {tag}
                    </Link>
                </>
            );
        }
    }
}

export default function (props: PageTemplateProps)
{
    const post = props.data.markdownRemark;

    return (
        <IndexLayout>
            {renderHead(props)}
            <Wrapper>
                <header>
                    <div>
                        <SiteNav />
                    </div>
                </header>
                <main>
                    <div>
                        <article>
                            <header>
                                <section>
                                    <time
                                        dateTime={post.frontmatter.date}
                                    >
                                        {post.frontmatter.userDate}
                                    </time>
                                    {renderTags(post.frontmatter.tags)}
                                </section>
                                <h1>{post.frontmatter.title}</h1>
                            </header>

                            {(post.frontmatter.image && post.frontmatter.image.childImageSharp)
                                && <figure>
                                    <Img
                                        style={{ height: "100%", }}
                                        fluid={post.frontmatter.image.childImageSharp.fluid}
                                    />
                                </figure>
                            }
                            <PostContent htmlAst={post.htmlAst} />

                            {/* The big email subscribe modal content *//* eslint-disable-line */}
                            {config.showSub && <Subscribe title={config.title} />}

                            <PostFullFooter>
                                <AuthorCard author={post.frontmatter.author} />
                                <PostFullFooterRight authorId={post.frontmatter.author.id} />
                            </PostFullFooter>
                        </article>
                    </div>
                </main>

                {/* Links to Previous/Next posts *//* eslint-disable-line */}
                <aside>
                    <div>
                        <div>
                            {props.data.relatedPosts
                                && <ReadNextCard
                                    tags={post.frontmatter.tags}
                                    relatedPosts={props.data.relatedPosts}
                                />
                            }
                            {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
                            {props.pageContext.next && <PostCard post={props.pageContext.next} />}
                        </div>
                    </div>
                </aside>
                <Footer />
            </Wrapper>
        </IndexLayout>
    );
}

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
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
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
