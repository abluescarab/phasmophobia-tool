# Sass 7-1 Boilerplate
Base structure with example files:
* base/
    * _reset.scss
    * _typography.scss
    * _color.scss
* components/
    * _buttons.scss
    * _navigation.scss
    * _gallery.scss
* layout/
    * _header.scss
    * _grid.scss
    * _sidebar.scss
* pages/
    * _home.scss
    * _about.scss
    * _contact.scss
* themes/
    * _theme.scss
    * _admin.scss
* helpers/ (or utils/ or abstracts/)
    * _variables.scss
    * _functions.scss
    * _mixins.scss
* vendors/
    * _bootstrap.scss
    * _jquery-ui.scss
* main.scss

The *base folder* holds boilerplate content. It holds the styles every page of your site should receive.

The *components folder* holds all your micro layout files. Your styles for buttons and navigation and similar page components.

Your macro layout files go in the *layouts folder*. Styles for major sections of the layout like a header or footer and styles for a grid system would belong here.

If you have styles specific to individual pages on your site, you can place them in the *pages folder*. For example it’s not uncommon for the home page of your site to require page specific styles that no other page receives.

The *themes folder* holds files that create project specific themes. For example one section of your site might use a color scheme with primary colors, while another section builds a color scheme based on neutrals and earth tones.

The *helpers, utils, or abstracts folder* holds Sass tools, helper files, variables, and config files. These files won’t be compiled. Variables should be project-wide or else placed in their respective component's file.

Finally the *vendors folder* holds 3rd party code and the main.scss file uses @import statements to include the other files.