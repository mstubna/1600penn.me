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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `1600Penn.me`,
        short_name: `1600Penn.me`,
        start_url: `/`,
        background_color: `#0A3A69`,
        theme_color: `#0A3A69`,
        display: `minimal-ui`,
        icon: `src/images/pin1.png`,
      },
    },
  ],
}
