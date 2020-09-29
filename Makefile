install:
	npm install
start:
	node gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test:
	npx test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
