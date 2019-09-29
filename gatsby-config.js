/* eslint-disable */
const path = require("path");

module.exports = {
    siteMetadata: {
        title: "Demo",
        description: "",

        // full path to blog - no ending slash
        siteUrl: "https://example.com",
    },
    mapping: { "MarkdownRemark.frontmatter.author": "AuthorYaml", },
    plugins: [
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "content",
                path: path.join(__dirname, "src", "content"),
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-vscode",
                        options: {
                            extensions: [{
                                identifier: "xshrim.txt-syntax",
                                version: "0.0.3"
                            }],
                        }
                    },
                    "gatsby-remark-copy-linked-files",
                    "gatsby-remark-smartypants",
                    "gatsby-remark-abbr",
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 1170,
                            quality: 100,
                        },
                    },
                ],
            },
        },
        "gatsby-plugin-typescript",
        "gatsby-transformer-sharp",
        "gatsby-plugin-react-helmet",
        "gatsby-transformer-yaml",
        "gatsby-plugin-feed",
        "gatsby-plugin-preact",
    ],
};
