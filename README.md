## Hello Friend NG

Clean and minimalistic personal blog and portfolio theme for Gatsby.

![Hello Friend NG](https://github.com/filipkrw/gatsby-theme-hello-friend-ng/blob/master/preview.gif?raw=true)

### Demo

Check out [the example site](https://filipkrw.github.io/gatsby-theme-hello-friend-ng/). The code is in the `example` directory of this repo.

### Features

* Create pages and blogposts with `mdx` files
* Minimalistic design, light and dark modes
* Responsive and performant images with neat placeholders and loading animations
* Code highlighting
* SEO ready

[Originally](https://github.com/rhazdon/hugo-theme-hello-friend-ng), this theme was created by [Djordje Atlialp](https://atlialp.com/) for [Hugo](https://gohugo.io/). This version is pretty faithfull to the original, with a few minor changes and additions here and there. Many thanks to Djordje!

## Installation

1. Create a Gatsby site if you haven't already.

`npm init gatsby`

2. Navigate to the site base directory and install the theme.

`npm install gatsby-theme-hello-friend-ng`

3. Include it in `gatsby-config.js` file. If it doesn't exist, create it in the base directory.

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-hello-friend-ng",
      options: {
        // ...
      }
    },
  ],
}
```

4. Run Gatsby to automatically create content directories.

`gatsby develop`

5. Start creating your content.

Below are some pointers on how to create content and configure the theme. You can also check out the [example site code](https://github.com/filipkrw/gatsby-theme-hello-friend-ng/tree/master/example) to see how everything works. It's a simple set-up.

## Creating content

To add a page or a blogpost, create an `md` or `mdx` file in the `content/pages` or `content/posts` directory, respectively. Every page and post must have a `title` field specified in the frontmatter.

```markdown
---
title: "Example page"
---

# Example page

This is page content.
```

There are more fields you can add to the frontmatter. For more information, refer to the [Frontmatter section](#frontmatter).

### Components

There are a few components you might want to use together with your Markdown. These don't need to be imported.

#### Images

To embed local images with neat placeholders, reveal animations and lazy-loading, use the `Image` component. The file path needs to be relative to the `content/images` directory. You can add a `wide` prop for the image to span over the standard width of the regular container width.

```jsx
<Image wide file="nice-image.jpg" alt="Nice Image" />
```

Under the hood, `Image` component uses `gatsby-plugin-sharp` to optimize PNGs and JPGs. For other image types, like GIFs, it displays the original.

If you need an image to also be a link, use the `LinkImage` component. 

```jsx
<LinkImage wide url="#" file="kayaking.png" title="Kayaking" />
```

To embed an image from an external source, use the `ImageExternal` component. Make sure to provide it with the image width and height in order to get the placeholder.

```jsx
<ImageExternal
  src="https://upload.wikimedia.org/wikipedia/commons/0/07/The_Horse_in_Motion-anim.gif"
  alt="Horse Motion"
  width={340}
  height={230}
  wide
/>
```

#### Code highligting

Displays code snippets with syntax highlighting. You can choose a language and whether to show line numbers. 

```jsx
<CodeHighlight
  language="javascript"
  showLineNumbers
>{`result.data.allFile.nodes.forEach((node) => {
  actions.createPage({
    path: node.fields.path,
    component: require.resolve("./src/templates/post.js"),
    context: { id: node.id },
  })
})`}</CodeHighlight>
```

#### Socials

Displays socials icons like on the homepage. Refer to [this file](https://github.com/filipkrw/gatsby-theme-hello-friend-ng/blob/master/gatsby-theme-hello-friend-ng/src/components/icons/social.js) for available icons.

```jsx
<Socials
  socials={[
    {
      title: "GitHub",
      icon: "github",
      url: "https://github.com/filipkrw",
    },
    {
      title: "Twitter",
      icon: "twitter",
      url: "https://twitter.com/filipkrw",
    }
  ]}
/>
```

#### Project info

Displays project tags and links. Check out the example site ["Works" page](https://filipkrw.github.io/gatsby-theme-hello-friend-ng/works) to see how it looks.

```jsx
<ProjectInfo
  tags={["React", "TypeScript"]}
  links={[
    {
      title: "Demo",
      url: "#",
    },
    {
      title: "Source",
      url: "#",
    },
  ]}
/>
```

### Frontmatter

Check out [this article](https://coffeecodeclimb.com/what-is-frontmatter) to learn more about frontmatter.

#### Fields for both pages and posts

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| title       | string | yes      | Displayed on the page in nice big letters, on the browser tab, as well as used for SEO.
| description | string | no       | Page description used for SEO. This will be visible when someone shares the page, together with the title.             |
| image       | string | no       | Same as the description field, this is used for SEO. Just like with image components, the path needs to be relative to the `content/images` directory. |

If the `description` and `image` fields are not set, the defaults from `gatsby-config.js` file will be used (see [Customisation section](#customisation)).

#### Fields exclusive for pages

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| layout      | string | no       | Can be set to "center". It's used in the landing page. By default, content will be displayed like in a blogpost.                                        |

#### Fields exclusive for posts

| Field           | Type | Required | Description |
| --------------- | -------- | ----------- | --- |
| published_at    | date | yes | In any format JavaScript Date object will understand, i.e. YYYY-MM-DD.
| tags            | string array | no | At the moment, tags are simply displayed in the post footer.
| show_word_count | boolean | no | Whether to show word count in the post footer. The default is `false`.

## Customisation

There are several theme options you can leverage. All the options below are default, you only need to set the ones you want to change.

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-hello-friend-ng",
      options: {
        // Default color mode and whether to allow user to change it
        mode: {
          default: "dark", // or "light"
          allowChange: true,
        },
        // Blog title and URL path
        blog: {
          title: "Blog",
          path: "blog",
        },
        // List of top nav links
        menuLinks: [
          {
            name: "Blog",
            link: "/blog",
          }
        ],
        // Directory for your pages, posts and images
        contentPath: "content", 
      },
    },
  ]
}
```

Setting the `siteMetadata` is essential for good SEO. These values will be used as defaults for all pages, unless changed in the frontmatter for particular pages or posts. If left blank, the respective `meta` tags won't be added to the page HTML.

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-hello-friend-ng",
      options: {
        // ...
      }
    }
  ],
  siteMetadata: {
    title: "Hello Friend NG",
    titleTemplate: "%s – Demo Site",
    url: "localhost:8000", // No trailing slash allowed!
    description: "",
    image: "",
    twitterUsername: ""
  }
}
```

## Further development

Source files are set-up using yarn workspaces as per [this guide](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/building-themes/).

1. Start by cloning the repository.

`git clone https://github.com/filipkrw/gatsby-theme-hello-friend-ng.git`

2. Install `yarn` if you haven't before.

`npm install yarn`

3. Navigate to the base directory and start the development server.

`yarn workspace example develop`

#### CSS development

Styles have been developed using SCSS preprocessor.

1. Navigate to `gatsby-theme-hello-friend-ng/src/assets`.

`npm install --global gulp-cli`

2. Install the dependencies.

`npm install`

3. Run `npm run watch` to start the development server. The output CSS files will be rebuilt after every change you make to any of the SCSS files.

You can also use `npm run build` command to build the CSS once.

## How to contribute

Pull requests are welcome. Create a GitHub issue to report a bug.

## License

The theme is released under the MIT License. Check the [original theme license](https://github.com/filipkrw/gatsby-theme-hello-friend-ng/blob/master/LICENSE.md) for additional licensing information.