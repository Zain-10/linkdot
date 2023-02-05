# LKD-02: Build the Main Layout

> **Status**: In Progress

> Assigned to: @nishad

> **Labels**: `UI`

> **Estimate**: 0

> **Time Spent**: 0

> **Priority**: High


_Story_: [As a user, I want to be able to see top `posts` and `profiles` so that I can see what's trending, without connecting my wallet.](./stories.md#STR-02)

## Purpose

To provide users with the ability to see top posts and profiles in a visually appealing manner, allowing them to see what is trending without having to connect their wallet.

## Requirements
- The app must have a Main layout
- The Main layout must contain the following components:
  - Header component
  - Sidebar component with navigation links:
      1. Explore
      2. Claim Credentials
      3. Inbox
      4. Profile
      5. Create POW button

- A Main component that serves as the main content area and is scrollable

- `Header` component
- `Sidebar` component
- Sidebar should have the Navigation Links
  - Explore
  - Claim Credentials
  - Inbox
  - Profile
  - Create `POW` button

- `Main` component - This is the main content of the page which should be scrollable

> Note: Refer to the [Figma](https://www.figma.com/proto/ZqztN4YeJWjo5kDecefr9U/linkDOT_V1?page-id=1%3A2&node-id=1329%3A7552&viewport=23923%2C-3335%2C0.29&scaling=min-zoom&starting-point-node-id=1281%3A5996) for the design.


## Proposed work

- Utilize existing components to build the Main layout
= Implement a public and private layout, with the public layout used for the index page and the private layout used for the rest of the pages
- The Header component must contain the following subcomponents:
  - Logo
  - Search component
  - Dropdown component
  - Credits component

## Acceptance Criteria

The Main layout has been successfully built
The Header component has been successfully built
The Sidebar component has been successfully built
Existing components have been utilized in the construction of the Main layout

## Design Reference
[Figma](https://www.figma.com/proto/ZqztN4YeJWjo5kDecefr9U/linkDOT_V1?page-id=1%3A2&node-id=1329%3A7552&viewport=23923%2C-3335%2C0.29&scaling=min-zoom&starting-point-node-id=1281%3A5996)

## Story
As a user, I want to be able to see top posts and profiles so that I can see what's trending, without connecting my wallet. (Reference: [stories.md/STR-02](./stories.md#STR-02))

