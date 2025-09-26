# api_pw_conduit

API test suite for the Conduit backend using playwright/test.

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

- All tests are located in `tests/`.
- Test data is generated dynamically in `utils/`.
- Controllers in `app/controllers/` encapsulate API logic.

## Dependencies

- [Playwright](https://playwright.dev/)
- [Joi](https://joi.dev/) (for schema validation)
- Node.js (v20+ recommended)

## Customization

- Extend controllers or add new test specs as needed.

## License

MIT