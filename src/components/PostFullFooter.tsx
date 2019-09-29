import React from "react";

export default function (props: React.HTMLProps<any>)
{
    return (
        <footer>
            {props.children}
        </footer>
    );
}
