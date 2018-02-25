# BitFex API for node.js

Simple implementation of BitFex.Trade API for node.js

# Documentation

## Init

Add bitfex to package.json:

```bash
yarn add bitfex
# or
# npm install --save bitfex
```

After that you could use it in JS:

```javascript
import Bitfex from 'bitfex'

Bitfex.auth({ email: 'user@example.com', password: 'password' })
  .then({ jwt } => {
    // you have now jwt token
  })
```

## Methods

### auth

params:

* email
* password

Example:

```javascript
Bitfex.auth({ email: 'user@example.com', password: 'password' }).then({ jwt, mfa } => ...)
```

In case of MFA enabled no JWT token returned, only `mfa` returned - it's personal one time auth token for `authMfa`

### authMfa

params:

* authToken - received from `auth` method
* otp - one time password

```javascript
Bitfex.authMfa({ authToken: 'TOKEN', otp: '123456' }).then({ jwt } => ...)
```

### signUp

Create new user

params:

* email
* password
* username

```javascript
Bitfex.signUp({ email: 'user@example.com', password: 'password', username: 'username' }).then({ success, errors } => ...)
```

### resetPassword

params:

* email

### loadHistory

params:

* token

### loadCompletedOrders

params:

* token
* page
* pair

### depositCode

params:

* token
* currency

### withdraw

params:

* token
* currency
* amount
* to

### orders

params:

* pair

### ordersMy

params:

* token

### chart

params:

* pair

### charts

### volume

### updateUserData

params:

* token

### getMfaProvisionUrl

### checkMfaCode

params:

* token
* code

### disableMfa

params:

* token

### deposit

params:

* token
* currency
* amount

### chatLoad

### chatSend

params:

* token
* text

### placeOrder

params:

* token
* pair
* operation
* amount
* price

### cancelOrder

params:

* token
* id

### checkUsersCount

params:

* token
* scope

### sendMail

params:

* token
* scope
* subject
* content

### reset

params:

* password
* passwordConfirmation
* token

### createTradeApiKey

params:

* token

### leaders

### roadmap

params:

* token (optional)

### createRoadmapItem

params:

* token
* title
* description

### roadmapComments

params:

* id

### createRoadmapComment

params:

* token
* id
* comment

### roadmapVote

params:

* token
* id

# Legal

Released under the MIT License: https://opensource.org/licenses/MIT

