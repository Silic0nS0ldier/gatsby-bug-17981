import Img from "gatsby-image";
import kebabCase from "just-kebab-case";
import { Link, } from "gatsby";
import { PageContext, } from "../templates/post";
import React from "react";

export interface PostCardProps {
    post: PageContext;
}

export default function ({ post,  }: PostCardProps)
{
    return (
        <article>
            {post.frontmatter.image
                        && <Link to={post.fields.slug}>
                            <div>
                                {post.frontmatter.image
                                    && post.frontmatter.image.childImageSharp
                                    && post.frontmatter.image.childImageSharp.fluid
                                        && <Img
                                            alt={`${post.frontmatter.title} cover image`}
                                            style={{ height: "100%", }}
                                            fluid={post.frontmatter.image.childImageSharp.fluid}
                                        />
                                }
                            </div>
                        </Link>
            }
            <div>
                <Link
                    to={post.fields.slug}
                >
                    <header>
                        <span>{post.frontmatter.tags.join(" / ")}</span>
                        <h2>{post.frontmatter.title}</h2>
                    </header>
                    <section>
                        <p>{post.excerpt}</p>
                    </section>
                </Link>
                <footer>
                    <ul>
                        <li>
                            <div>
                                {post.frontmatter.author.id}
                            </div>
                            <Link
                                to={`/author/${kebabCase(post.frontmatter.author.id)}/`}
                            >
                                <img
                                    src={post.frontmatter.author.avatar.children[0].fixed.src}
                                    alt={post.frontmatter.author.id}
                                />
                            </Link>
                        </li>
                    </ul>
                    <span>{post.timeToRead} min read</span>
                </footer>
            </div>
        </article>
    );
}
