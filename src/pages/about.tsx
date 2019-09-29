import Footer from "../components/Footer";
import Helmet from "react-helmet";
import IndexLayout from "../layouts";
import React from "react";
import SiteNav from "../components/header/SiteNav";
import Wrapper from "../components/Wrapper";

export default function ()
{
    return (
        <IndexLayout>
            <Helmet>
                <title>About</title>
            </Helmet>
            <Wrapper>
                <header>
                    <div>
                        <SiteNav />
                    </div>
                </header>
                <main>
                    <article>
                        <header>
                            <h1>About</h1>
                        </header>

                        <section>
                            <p>
                                Demo site
                            </p>
                        </section>
                    </article>
                </main>
                <Footer />
            </Wrapper>
        </IndexLayout>
    );
}
