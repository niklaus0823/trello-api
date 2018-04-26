Trello API
=========================

> This is a wrapper for some of the Trello HTTP API. Please feel free to add any other pieces you need! :)

## Usage

Log in to Trello and visit [trello.com/app-key](https://trello.com/app-key) to get a `token` and `app key`. These need to be supplied when you create the Trello object (see below).

## Installation

```bash
npm install trello-api --save
```

## Example

```typescript
import {Trello} from 'trello-api';

let trello = new Trello('MY APPLICATION KEY', 'MY USER TOKEN');

trello.getTokens('MY MEMBER ID')
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
```

## Requests to API endpoints, not supported by this lib yet

```typescript
import {Trello} from 'trello-api';

let trello = new Trello('MY APPLICATION KEY', 'MY USER TOKEN');

// Get all registered tokens and webhooks
// Url will look like: https://api.trello.com/1/members/me/tokens?webhooks=true&key=YOURKEY&token=YOURTOKEN
trello.request('get', '/1/members/me/tokens', { webhooks: true })
    .then((res) => console.log(res));
```

## Available functions

#### tokens 

| 方法              | Path                     |
| ----------------- | ------------------------ |
| Trello::getTokens | GET /members/{id}/tokens |

#### boards

| 方法              | Path                     |
| ----------------- | ------------------------ |
| Trello::getBoards | GET /members/{id}/boards |

##### lists

| 方法             | Path                   |
| ---------------- | ---------------------- |
| Trello::getLists | GET /boards/{id}/lists |

#### cards

| 方法                   | Path                   |
| ---------------------- | ---------------------- |
| Trello::getCards       | GET /boards/{id}/cards |
| Trello::getCardsOnList | GET/lists/{id}/cards   |

#### checklists

| 方法                         | Path                        |
| ---------------------------- | --------------------------- |
| Trello::getChecklists        | GET /boards/{id}/checklists |
| Trello::getChecklistsOnCards | GET/cards/{id}/checklists   |

#### actions [type=commentCard]

| 方法                       | Path                                        |
| -------------------------- | ------------------------------------------- |
| Trello::getComments        | GET /boards/{id}/actions?filter=commentCard |
| Trello::getCommentsOnCards | GET/cards/{id}/actions?filter=commentCard   |

## History

### 0.0.1

- Version init