export interface WebsiteConfig {

    /**
     * Title of blog.
     */
    title: string;

    /**
     * Brief description of blog.
     */
    description: string;

    /**
     * Blogs main cover image.
     */
    coverImage: string;

    /**
     * Blogs logo.
     */
    logo: string;

    /**
     * Specifying a valid BCP 47 language helps screen readers announce text
     * properly. See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
     */
    lang: string;

    /**
     * Blog full path, no ending slash!
     */
    siteUrl: string;

    /**
     * URL to Twitter profile for blog.
     */
    twitter?: string;

    /**
     * Hide or show all email subscribe boxes.
     */
    showSub: boolean;

    /**
     * Create a list on mailchimp and then create an embeddable signup form.
     * This is the form action.
     */
    mailchimpAction?: string;

    /**
     * This is the hidden input field name.
     */
    mailchimpName?: string;
}

const config: WebsiteConfig = {
    coverImage: "img/150.png",
    description: "",
    lang: "en",
    logo: "img/150.png",
    showSub: false,
    siteUrl: "https://example.com/",
    title: "Demo",
    twitter: "https://twitter.com/twitter",
};

export default config;
