# Beta APIs

## Context

Beta APIs are APIs that are not yet stable, but are available for use in the beta version. They follow RESTful principles and are versioned. They are not yet available in the v1 version.

## End Points

Root URL: /api/v1

| End Point | Method |Description | Parameters | Response |Active|
|-----------|-------------|-------|------------|----------|------|
|/users | GET | Get all users |   | List of users | Yes |
|/users | POST | Create a new user | User object | User object | Yes |
|/users/{id} | GET | Get a user by id | id | User object | Yes |
|/users/{id} | PUT | Update a user by id | id, User object | User object | No |
|/users/{id} | DELETE | Delete a user by id | id | User object | No |
|/users/{id}/follow | POST | Follow a user | id | User object | No |
|/users/{id}/unfollow | POST | Unfollow a user | id | User object | No |
|/users/{id}/followers | GET | Get all followers of a user | id | List of users | No |
|/users/{id}/following | GET | Get all users a user is following | id | List of users | No |
|/users/address/{address}| GET | Get a user by address | address | User object | No |
|/users/search | GET | Search for users | q | List of users | No |

