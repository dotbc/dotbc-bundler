DEBUG?="dotbc*,superagent*,spotify*,bmi*"
PLUGINS=bmi monegraph spotify

build: 
	npm run build;

build-electron-dev:
	./scripts/electron/mac/package-dev.sh

build-electron-staging:
	./scripts/electron/mac/package-staging.sh

build-electron-prod:
	./scripts/electron/mac/package-prod.sh

install: install-tools
	npm i; \
  bower install;

install-plugins:
	-mkdir .plugins
	for plugin in $(PLUGINS); do cd .plugins && git clone git@github.com:dotbc/$$plugin-plugin.git $$plugin && cd $$plugin && npm i && cd ../..; done

install-tools:
	if test `which bower`; then \
	  echo 'bower installed. continuing'; \
	else \
	  echo 'installing bower'; \
	  npm i -g install bower; \
	fi
	if test `which ember`; then \
	  echo 'ember-cli installed. continuing'; \
	else \
	  echo 'installing ember-cli'; \
	  npm i -g ember-cli; \
	fi
	if test `which watchman`; then \
	  echo 'watchman installed. continuing'; \
	else \
	  echo 'installing watchman'; \
	  brew install watchman; \
	fi
	if test `which phantomjs`; then \
	  echo 'phantomjs installed. continuing'; \
	else \
	  echo 'installing phantomjs'; \
	  brew install phantomjs; \
	fi

open: 
	open http://localhost:4200;

run: start

run-electron: start-electron

start: build
	ember server;

start-electron:
	DEBUG=$(DEBUG) \
	ember electron;

test: 
	ember test;
