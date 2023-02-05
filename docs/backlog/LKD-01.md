# LDK-01:Configure Project with styles, colors, fonts

> **Status**: In Progress

> assigned to: nishad


_Story_: [STR-01: As a user, I want to be able to connect my `wallet` to the app so that I can use the app.](./stories.md#STR-01)

## Overview

The app needs to have a consistent theme, color, and typography.

## Proposed work
- Modify the `tailwind.config.js` file to include the following:
  - `theme` - The theme for the app
  - `colors` - The colors for the app
  - `typography` - The typography for the app
  - `extend` - The extend for the app
  - `plugins` - The plugins for the app

- Configure the theme, color, and typography for the app using the `tailwind.config.js` file.

- Remove the existing theme, color, and typography which are unused.

## Acceptance criteria

- successful configuration of the theme, color, and typography for the app
- successful removal of the unused theme, color, and typography

**Notes: The `tailwind.config.js` file is located in the root directory of the project.**

### Resources

- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind CSS: Configuration](https://tailwindcss.com/docs/configuration)
