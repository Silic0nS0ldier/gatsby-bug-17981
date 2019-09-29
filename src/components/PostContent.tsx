import React from "react";
import RehypeReact from "rehype-react";

const renderAst = new RehypeReact({
    components: {},
    createElement: React.createElement, /* eslint-disable-line */
}).Compiler;

interface PostContentProps {
    htmlAst: any;
}

export default function ({ htmlAst, }: PostContentProps)
{
    return (
        <section>
            {renderAst(htmlAst)}
        </section>
    );
}
