import kebabCase from "just-kebab-case";
import { Link, } from "gatsby";
import React from "react";

export interface AuthorCardProps {
    author: {
        id: string;
        avatar: any;
        bio?: string;
    };
}

/**
 * @todo Default avatar
 * @todo Author page url
 */
export default function ({ author, }: AuthorCardProps)
{
    return (
        <section>
            <img
                src={author.avatar.children[0].fixed.src}
                alt={author.id}
            />
            <section>
                <h4>
                    <Link to={`/author/${kebabCase(author.id)}/`}>{author.id}</Link>
                </h4>
                {author.bio
                    && <p>{author.bio}</p>
                }
            </section>
        </section>
    );
}
