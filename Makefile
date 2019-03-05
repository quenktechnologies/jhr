./: lib test
	touch $@

lib: $(shell find src -type f)
	rm -R lib 2> /dev/null || true 
	mkdir lib
	cp -R -u src/* lib
	./node_modules/.bin/tsc --project lib

test: lib test/browser/public
	touch $@

test/browser/public: test/browser/public/test.js
	touch $@

test/browser/public/test.js: test/browser/build/run.js
	./node_modules/.bin/browserify test/browser/build/run.js > $@

test/browser/build/run.js: $(shell find test/browser/suite -type f) lib
	@rm -R test/browser/build || true
	@cp -R test/browser/suite test/browser/build
	./node_modules/.bin/tsc -p test/browser/build
	cd test/browser/build && \
	find . -name \*_test.js | \
	sed 's/[^ ]*/require("&");/g' >> run.js

.PHONY: docs
docs: src
	$(TYPEDOC) --out docs \
	  --excludeExternals \
	  --excludeNotExported \
	  --tsconfig src/tsconfig.json
	 touch docs/.nojekyll
