# chat-analysis 🤖

In this project you will find a small example of how you can leverage data science and simple scripting
to come up with interesting insights about your business 🦄

# Setup

You will need

- [Postgresql](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [Jupyter Notebook](http://jupyter.org/)

# Installation

- Modify the settings on `config/config.json` to match your local environment. This includes database name, user, etc

- Create a database matching the settings you've specified

- `$ npm install`

- `$ node_modules/sequelize-cli/bin/sequelize db:migrate`

- Now your project should be ready.

# Usage

- Load transcripts into the `data` folder - they should be an XLSX file matching the format our customer agent service has provided - feel free to ping [@mariogintili](https://github.com/mariogintili) for details on this if need be.

- run `$ node app/sync.js`

# Contributing

- Check out from `master`

- Submit a PR

# Usage 🔮

As defined on on the conversation model the data is stored in one table, following this structure:

```javascript
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  startTime: STRING,
  endTime: STRING,
  interactionId: STRING,
  agentId: STRING,
  queue: STRING,
  sourceCategory: STRING,
  customerName: STRING,
  conversation: TEXT,
  exitSurvey: TEXT,
  createdAt: {
    type: DATE
  },
  updatedAt: {
    type: DATE
  }
```

However, one thing to note is that the `conversation` field is a `text` field storing a serialized and valid JSON object. This is made out of ease of segmentation based the authors of the messages for a given conversation. Which follows this schema:

```javascript
[
	{
		isSupport: true,
		message: "Hello angry client, how may I help you?"
	},
	{
		isSupport: false,
		message: "I am very angry at your service"
	}
]
```

⚠️ This field is a string - if you want to make use of the structure you'll need to parse this as JSON. `JSON.parse`
