import React from "react";

interface WrapperProps {
    className?: string;
}

export default function ({
    children,
}: WrapperProps & { children?: React.ReactNode })
{
    return (
        <div>
            {children}
        </div>
    );
}
