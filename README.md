# Catwalk

Catwalk is the re-imagined product detail page of an e-commerce web application, comprised of four main modules.

## Main Modules

### Product Overview

- Guides customer through selecting a specific style and size and adding it to their cart

- Tech lead: [Kevin Goble](https://github.com/Gobleizer)

**Key features**

1. Image gallery
2. Product information
3. Style selector
4. Add to cart

### Ratings & Reviews

- Allows customer to view and submit rating and reviews for the selected product
- Tech Lead: [Adam Klingbaum](https://github.com/adamklingbaum)

**Key features**

1. Write new review
2. Reviews list
3. Sorting
4. Rating breakdown
5. Product breakdown by key characteristic

### Questions & Answers

- Allows customer to view, ask and answer questions for the selected product
- Tech Lead: [Takahiro Hirakawa](https://github.com/jonhirak)

**Key features**

1. View questions
2. Search for a question
3. Ask a question
4. Answer a question

## Usage

### Prerequisites

1. [Node.js](https://nodejs.org/en/)
2. [Npm](https://www.npmjs.com/)
3. [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (`read:org`, `user`)
4. [Google Cloud Storage bucket](https://cloud.google.com/storage/docs/creating-buckets)

### Setup

1. Clone the repository and change into project directory

```bash
git clone https://github.com/labbit-fec/catwalk.git
cd catwalk
```

2. Install package dependencies

```bash
npm install
```

3. Create a copy of `server/config.example.js` and rename it `server/config.js`

```bash
cp server/config.example.js server/config.js
```

4. Populate your GitHub personal access token in `server/config.js` to enable authentication for the back-end API

```javascript
module.exports.TOKEN = 'Insert GitHub Token here';
```

5. Create a copy of `server/gc/gc-config.example.json` and rename it `server/gc/gc-config.json`

```bash
cp server/gc/gc-config.example.json server/gc/gc-config.json
```

6. Populate your Google Cloud Storage bucket configuration details in `server/gc/gc-config.json`

```json
{
  "type": "FILL_ME_IN",
  "project_id": "FILL_ME_IN",
  "private_key_id": "FILL_ME_IN",
  "private_key": "FILL_ME_IN",
  "client_email": "FILL_ME_IN",
  "client_id": "FILL_ME_IN",
  "auth_uri": "FILL_ME_IN",
  "token_uri": "FILL_ME_IN",
  "auth_provider_x509_cert_url": "FILL_ME_IN",
  "client_x509_cert_url": "FILL_ME_IN"
}
```

7. Transpile and bundle React source code

```bash
# Production mode
npm run build

# Development mode (watch enabled)
npm run react:dev
```

8. Start Express server

```bash
npm start

# Or, with nodemon for automatic restart
npm run server:dev
```

9. Navigate to app server in your browser

_Base url will show a default product_

```
localhost:3000
```

## Primary Tech Stack

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Axios](https://www.axios.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Google Cloud Storage](https://cloud.google.com/storage)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Mock Service Worker](https://mswjs.io/)

## Contributors

#### The hard-working dev team at [labbit](https://github.com/labbit-fec)

<a href="https://github.com/labbit-fec/catwalk/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=labbit-fec/catwalk" />
</a>

<small>Made with [contrib.rocks](https://contrib.rocks).</small>

## License

Distributed under the MIT License. See [LICENSE.txt](https://github.com/labbit-fec/catwalk/blob/main/LICENSE.txt) for more information.
