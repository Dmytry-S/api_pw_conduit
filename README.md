# api_pw_conduit

End-to-end API test suite for the Conduit backend using Playwright.

## Project Structure

- `app/controllers/`: API controller classes for Article and User operations.
- `tests/conduit/`: Playwright test specs for CRUD, search, favorite, comment, and user scenarios.
- `utils/`: Test data and validation schemas.
- `playwright.config.ts`: Playwright configuration (testDir, baseURL, reporter, etc.).
- `playwright-report/`: HTML test reports.
- `test-results/`: Raw test results.

## Features

- Article CRUD: create, read, update, delete.
- Search articles by title and tag.
- Favorite/unfavorite articles.
- Add/delete comments to articles.
- User login and update profile.
- Data validation with Joi schemas.

## Setup

1. **Install dependencies:**
	```bash
	npm install
	```

2. **Configure environment:**
	- Optionally create a `.env` file for custom environment variables.

3. **Run tests:**
	```bash
	npx playwright test
	```

4. **View HTML report:**
	```bash
	npx playwright show-report
	```

## Usage

- All tests are located in `tests/conduit/`.
- Test data is generated dynamically in `utils/`.
- Controllers in `app/controllers/` encapsulate API logic.

## Dependencies

- [Playwright](https://playwright.dev/)
- [Joi](https://joi.dev/) (for schema validation)
- Node.js (v16+ recommended)

## Customization

- Extend controllers or add new test specs as needed.

## License

MIT