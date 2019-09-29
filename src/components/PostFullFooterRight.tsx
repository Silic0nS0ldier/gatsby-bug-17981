import kebabCase from "just-kebab-case";
import { Link, } from "gatsby";
import React from "react";

export interface PostFullFooterRightProps {
    authorId: string;
}

export default function (props: PostFullFooterRightProps)
{
    return (
        <div>
            <Link to={`/author/${kebabCase(props.authorId)}/`}>
                Read More
            </Link>
        </div>
    );
}
