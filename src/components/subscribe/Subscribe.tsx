import SubscribeForm from "./SubscribeForm"; /* eslint-disable-line */
import React from "react";

export interface SubscribeProps {
    title: string;
}

export default function ({ title, }: SubscribeProps)
{
    return (
        <section>
            <h3>Subscribe to {title}</h3>
            <p>Get the latest posts delivered right to your inbox</p>
            <SubscribeForm />
        </section>
    );
}
