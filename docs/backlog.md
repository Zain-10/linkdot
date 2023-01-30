# Backlog

## Tasks

| Task ID                                                                   | Task Name          | Tag  |             | Status             | Assignee | Estimate | Time Spent | Priority |
| ------------------------------------------------------------------------- | ------------------ | ---- | ----------- | ------------------ | -------- | -------- | ---------- | -------- |
| [LKD-5](#lkd-5-convert-and-update-the-profile-page-to-use-the-new-design) | Convert and update | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-6](#lkd-6-build-authentication-flow-for-using-lens-api)              | Build              | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-7](#lkd-7-build-search-functionality-for-the-app)                    | Build              | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-8](#lkd-8-convert-ui-form-to-create-proof-of-work)                   | Convert            | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-9](#lkd-9-research-and-design-proof-of-work-functionality-flow)      | Research and       | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-10](#lkd-10-build-proof-of-work-functionality)                       | Build              | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-11](#lkd-11-build-proof-of-work-details-page)                        | Build              | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |
| [LKD-12](#lkd-12-research-and-design-invite-collaboration-functionality-  | Research and       | `UI` | In Progress | sreejinsreenivasan |          | 0        |            |          |

### LKD-5: Convert and update the profile page to use the new design

---

**Overview**

User profile page is currently using the old design. It needs to be updated to use the new design.

**Proposed work**

- use the existing components to build the page
- Remove the old design/unused components
- Add the new design components

  - Create POW button
  - Create credit balance component
  - create invite friends component

- FIX: the active tab is not highlighted
- Convert Proof of Work and Verified Credentials image/cards components to use the new design

**Acceptance criteria**

- successful build of the page
- successful build of the components
- successful removal of the old design/unused components

### LKD-6: Build `authentication` flow for using `LENS` Api

---

**Overview**

The `LENS` Api requires authentication. The authentication flow is not yet implemented. After a successful authentication, the `LENS` Api will return a `JWT` token containing
`access_token` , `refresh_token` and `expires_in` which will be used to make authenticated requests to the `LENS` Api.

**Proposed work**

1. Generate a 'challenge' using the `LENS` [Api](https://docs.lens.xyz/docs/authentication)

2. Retrieve the `challenge` from the `LENS` Api and `sign` it using users 'wallet'.
3. Send the `signature` to the `LENS` Api to get the `JWT` token.

4. Store the `JWT` token in the `localStorage` and use it to make authenticated requests to the `LENS` Api.

5. Extract `expires_in` from the `JWT` token and use it to refresh the `JWT` token before it expires.

6. Modify the `graphql` [client](https://github.com/sreejinsreenivasan/linkdot/blob/dev/src/graphql/auth-fetcher.ts)

**Acceptance criteria**

- successful authentication flow
- successful retrieval of the `JWT` token
- successful storage of the `JWT` token in the `localStorage`
- successful use of the `JWT` token to make authenticated requests to the `LENS` Api
- successful refresh of the `JWT` token before it expires
- successful modification of the `graphql` client
- good test coverage

### LKD-7: Build `search` functionality for the app

---

**Overview**

The app needs to have a search functionality. The search functionality should be able to search for users, posts, and comments.

LENS API - https://docs.lens.xyz/docs/search

**Proposed work**

- use the existing components to build search functionality
- Improve the existing UI and UX
- Change the existing `search` api to use the `LENS` Api
- Successfully show the search results for users, posts, and comments
- Add a `UI` to show if there are no search results

**Acceptance criteria**

- successful build of the search functionality
- successful integrate the `LENS` Api for search

### LKD-8: Convert UI form to create `Proof of Work`

---

**Overview**

The UI form to create `Proof of Work`.

**Proposed work**

- Build a modal to contain the form
- Figure out if existing modal can be used
- Build the form
- Build success and error messages(Toasts/Popup as per the design)

**Acceptance criteria**

- successful build of the modal
- successful build of the form
- successful build of the success and error messages

### LKD-9: Research and Design `Proof of Work` functionality flow

---

**Overview**

The `Proof of Work` functionality will be similar to the `LENS` _Posts_ functionality. We need to research and design the flow for the `Proof of Work` functionality.
Find out if the `LENS` Api can be used to create a `Proof of Work` post and can be used to retrieve the `Proof of Work` posts separately.

**Proposed work**

- Research and design the flow for the `Proof of Work` functionality
- Find out if the `LENS` Api can be used to create a `Proof of Work` post and can be used to retrieve the `Proof of Work` posts separately.
- If not, propose a solutions.

**Acceptance criteria**

- successful research and design of the flow for the `Proof of Work` functionality
- Document the research and design
- successful proposal of a solution

### LKD-10: Build `Proof of Work` functionality

---

**Overview**

Depending on the outcome of `LKD-9: Research and Design Proof of Work functionality flow`, build the `Proof of Work` functionality.

**Proposed work**

- Build the `Proof of Work` functionality

**Acceptance criteria**

- successful build of the `Proof of Work` functionality

### LKD-11: Build `Proof of Work` Details page

---

**Overview**

Build the `Proof of Work` Details page.

**Proposed work**

- Build the `Proof of Work` Details page

**Acceptance criteria**

- successful build of the `Proof of Work` Details page as per the design

### LKD-12: Research and Design `Invite Collaboration` functionality flow

---

**Overview**

Research and propose a solution for the `Invite Collaboration` functionality. Currently, the `Invite Collaboration` is done by sending an email to the user. We need to research and design a better solution or invite the users in `LENS` itself. Find out if the `LENS` Api can be used to invite users to collaborate.
NOTE: Reference

- https://docs.lens.xyz/docs/notifications

- https://docs.lens.xyz/docs/e2ee-dms
  **Proposed work**

- Build UI for the `Invite Collaboration` functionality

**Acceptance criteria**

- successful build of the UI for the `Invite Collaboration` functionality
- successful research and design of the flow for the `Invite Collaboration` functionality
- Document the research and design

## Tasks
