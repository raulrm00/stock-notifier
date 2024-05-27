# Stock Notifier

## Description

The Stock Notifier is a terminal application that allows users to search for specific items and receive desktop notifications when those items are available. It provides a convenient way to stay updated on stock availability without constantly checking websites manually.

## Features

- Searches for one or multiple items at online shops
- Notifies user with desktop notification
- Customizable json file

## Usage

1. Clone the repository.
2. Install the dependencies.
   - `npm install`
3. Modify `websites.json` with desired [configuration](#configuration).
4. Run the application.

<details open>
    <summary>npm</summary>

```sh
npm run start
```

</details>

## Configuration

The `websites.json` file contains the configuration for the application. The file is structured as follows:

```json
[
  {
    "name": "Example",
    "type": "example-type",
    "url": "https://example.com",
    "selector": "#id",
    "content": "Example text",
    "notify": true
  }
]
```

- `name`: The name of the item.
- `type`: Some groupable type for display purposes.
- `url`: The URL of the website.
- `selector`: CSS selector of the item to search (ex. add to cart button).
- `content`: The interval in seconds between searches.

## License

This project is licensed under the [MIT License](LICENSE).
