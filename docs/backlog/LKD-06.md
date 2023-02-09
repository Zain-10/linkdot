
# LKD-06: Implement Lens Authentication Flow

> **Status**: Not Started

> assignee: Able

> **Labels**: `FE & BE`

> **Estimate**: 0

> **Time Spent**: 0

> **Priority**: HIGH

## Purpose

The app needs to have a `Lens` authentication flow to use the `Lens` private API endpoints.

## Requirements

- Retrieve the access token and refresh token from the `Lens` API
- Store the access token and refresh token in the `localStorage`
- Implement the logic to refresh the access token when it expires

## Proposed Work

- Generate a challenge to be used to sign using the users wallet
- Send the challenge to the `Lens` API to get the access token and refresh token
- Store the access token and refresh token in the `localStorage`
- extract the `expirary` time from the access token
- Implement the logic to refresh the access token when it expires
- modify the graphql client to use the access token to make authenticated requests to the `Lens` API

## Acceptance Criteria

- Logic to retrieve the access token and refresh token from the `Lens` API
- Logic to store the access token and refresh token in the `localStorage`
- Logic to refresh the access token when it expires
- Logic to modify the graphql client to use the access token to make authenticated requests to the `Lens` API

## Notes

-

## Design Reference

## Story

[STR-06](./stories.md/#str-06-as-a-user-i-want-to-be-able-to-authenticate-with-my-lens-wallet-so-that-i-can-create-proof-of-work-posts): As a user, I want to be able to authenticate with my LENS wallet so that I can create Proof of Work(posts).

## Resources

- https://docs.lens.xyz/docs/authentication
- Tutorial - https://www.youtube.com/watch?v=e1mPmDRUUBc&t=5990s