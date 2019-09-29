# Build failure demo

Reproduction of issue is based on a stripped down version of the repo where the issue was observed.

https://github.com/gatsbyjs/gatsby/issues/17981

## Reproduction Steps

1. Run `gatsby build`
2. Delete `./public` folder
3. Run `gatsby build` and observe failure
