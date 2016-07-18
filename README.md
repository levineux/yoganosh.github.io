# [Eight Chakras](http://www.eightchakras.com/) Source Code

This is the source code of the Eight Chakras website built using [Jekyll](http://jekyllrb.com) and utilizing Netlify to publish and host the site.

## Local Development

1. Install dependencies `bundle install`
2. Run Jekyll server to preview in development mode `jekyll serve -w`.
3. View the generated site by going to [http://localhost:4000/](http://localhost:4000/)

## Site Structure

| Directory | Description |
| ------------- |:------------- |
| _data | Directory contains yml files that contain content that is not within individual pages or posts. |
| _includes | Contains several partials that are common to several generated pages. |
| _layouts | Contains the templates that are used to generate the commonality of the pages (default is the main one that all the pages use. |
| _pages | Contains all non-blog post pages. |
| _posts | Contains all of the individual story entries. |
| css | Contains the css for the project. |
| fonts | Contains the customized font libraries for the project. |
| js | Contains the js libraries for the project. |
| images | Contains all the image files for the site |

## Code Standards

This section highlights the coding standards to be used for this project to ensure consistency across the codebase for current and future development

### Filename conventions

- Should be all lowercase and words are concatenated with a hypen

### Variable naming conventions

- All yml frontmatter keys should be lowercase and words concatenated with a hyphen

### Liquid

- All liquid variables are following an underscore pattern so they can be easier to differentiate from yml frontmatter variables
- All liquid tags, objects, and filtesr will have spaces in front of and following whatever is contained within braces
