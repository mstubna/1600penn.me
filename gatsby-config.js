module.exports = {
  siteMetadata: {
    title: `1600Penn.me`,
    description: `1600Penn.me`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: '1600penn.me',
      },
    },
  ],
}
