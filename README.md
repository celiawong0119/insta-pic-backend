# Getting Started with InstaPic backend

## Installation and run frontend on localhost:4000

### `yarn install` / `npm install`

### `yarn start` / `npm start`

## API reference

##### GET /posts/

| param      | type            | required |
| ---------- | --------------- | -------- |
| userId     | string          | false    |
| sortByTime | 'asc' or 'desc' | false    |
| pageNo     | string          | false    |
| tailId     | string          | false    |

##### To create a post: first call `POST /posts/upload-image/`, then call `POST /posts/`

##### POST /posts/upload-image/

###### This api is used for passing the image file into the public folder

| key | type     | required |
| --- | -------- | -------- |
| -   | FormData | true     |

##### POST /posts/

###### This api is used for passing the image information into the database.json

| key       | type   | required |
| --------- | ------ | -------- |
| userId    | number | true     |
| imageName | string | true     |
| caption   | string | true     |
