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
	npx jest
