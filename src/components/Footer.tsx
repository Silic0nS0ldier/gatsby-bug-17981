import config from "../website-config";
import { Link, } from "gatsby";
import React from "react";

export default function ()
{
    return (
        <footer>
            <div>
                <section id="copyright">
                    <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}
                </section>
                <nav>
                    <Link to="/">Latest Posts</Link>
                    {config.twitter
                        && <a href={config.twitter} target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                    }

                    <a href="/rss.xml">RSS</a>
                </nav>
            </div>
        </footer>
    );
}
