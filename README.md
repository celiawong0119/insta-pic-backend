# Getting Started with InstaPic backend

## Installation and run backend on localhost:4000

### `yarn install && yarn start`

or

### `npm install && npm start`

## API reference

### Get posts

##### GET /api/posts/

###### JWT Token is required

| param      | type            | required |
| ---------- | --------------- | -------- |
| userId     | string          | false    |
| sortByTime | 'asc' or 'desc' | false    |
| pageNo     | string          | false    |
| tailId     | string          | false    |

Response Code 200: OK , example value:

```
[
  {
    "id": 1,
    "imageName": "1635695915276-Avatar1.jpg",
    "caption": "b jai",
    "createdTime": 1635695915,
    "author": {
      "userId": 1,
      "name": "Tom"
    }
  }
]
```

### Create a post

##### To create a post: first call `POST /posts/upload-image/`, then call `POST /posts/`

##### POST /api/posts/upload-image/

This api is used for passing the image file into the public folder

###### JWT Token is required

| key | type     | required |
| --- | -------- | -------- |
| -   | FormData | true     |

Response Code 200: OK

##### POST /api/posts/

This api is used for passing the image information into the database.json

###### JWT Token is required

| key       | type   | required |
| --------- | ------ | -------- |
| userId    | number | true     |
| imageName | string | true     |
| caption   | string | true     |

Response Code 200: OK

### Log in

##### POST /api/auth/login

| key      | type   | required |
| -------- | ------ | -------- |
| username | string | true     |
| password | string | true     |

Response Code 200: OK , example value:

```
{
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNjM2MzkyODg5LCJpYXQiOjE2MzU3ODgwODl9.z0bMwyNHN3bq1zNUSwbNE3DB-wgehzhzpkzXL8vIqTU",
  "jwtTokenExpires": 1636392889,
  "data": {
    "id": 1,
    "username": "Tom",
    "posts": [
      1
    ]
  }
}
```

### Sign up

##### POST /api/auth/signup

| key      | type   | required |
| -------- | ------ | -------- |
| username | string | true     |
| password | string | true     |

Response Code 200: OK , example value:

```
{
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZXhwIjoxNjM2MzkyOTgzLCJpYXQiOjE2MzU3ODgxODN9.paMTba8XSgsKAj0fOYZpCz1xsrIkhzwVrcpxGx32GC8",
  "jwtTokenExpires": 1636392983,
  "data": {
    "id": 5,
    "username": "Emily",
    "posts": []
  }
}
```

### Verify the token if user reopen the browser

##### POST /api/auth/verifyToken

If there is a token, user will access to the home / profile page. If not, the page will redirect to the log in page.

| header       | type   | required |
| ------------ | ------ | -------- |
| x-auth-token | string | false    |

Response Code 200: OK , example value:

```
{
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNjM2MzkzMDM4LCJpYXQiOjE2MzU3ODgyMzh9.nvw_oPjABx7d6rem1vYd2CCZ6tXSc1jg34SVmjhT5Eo",
  "jwtTokenExpires": 1636393038,
  "data": {
    "id": 1,
    "username": "Tom",
    "posts": [
      1
    ]
  }
}
```
