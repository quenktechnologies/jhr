./: lib test
	touch $@

lib: $(shell find src -type f)
	rm -R lib 2> /dev/null || true 
	mkdir lib
	cp -R -u src/* lib
	./node_modules/.bin/tsc --project lib

test: lib test/feat/browser/public
	touch $@

test/feat/browser/public: test/feat/browser/public/test.js
	touch $@

test/feat/browser/public/test.js: test/feat/browser/build/run.js
	./node_modules/.bin/browserify test/feat/browser/build/run.js > $@

test/feat/browser/build/run.js: $(shell find test/feat/browser/suite -type f) lib
	@rm -R test/feat/browser/build || true
	@cp -R test/feat/browser/suite test/feat/browser/build
	./node_modules/.bin/tsc -p test/feat/browser/build
	cd test/feat/browser/build && \
	find . -name \*_test.js | \
	sed 's/[^ ]*/require("&");/g' >> run.js

.PHONY: docs
docs: src
	./node_modules/.bin/typedoc --out docs \
	  --excludeExternals \
	  --excludeNotExported \
	  --tsconfig src/tsconfig.json
	 touch docs/.nojekyll
