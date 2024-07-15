# Root-level scripts
.PHONY: help format electron web

help:
	@echo "Available commands:"
	@echo ""
	@echo "Root-level scripts:"
	@echo "  make format              - Format code using dprint"
	@echo "  make electron            - Run pnpm in the electron directory"
	@echo "  make web                 - Run pnpm in the web directory"
	@echo ""
	@echo "Web scripts:"
	@echo "  make web-dev             - Start the web development server"
	@echo "  make web-build           - Build the web application"
	@echo "  make web-start           - Start the web application"
	@echo "  make web-lint            - Lint the web application"
	@echo ""
	@echo "Electron scripts:"
	@echo "  make electron-clean      - Clean the electron build"
	@echo "  make electron-copy       - Copy web build to electron"
	@echo "  make electron-prepare    - Prepare the electron build"
	@echo "  make electron-dist       - Build electron distribution"
	@echo "  make electron-linux      - Build electron for Linux"
	@echo "  make electron-win        - Build electron for Windows"
	@echo "  make electron-mac        - Build electron for macOS"
	@echo "  make electron-postinstall- Install electron dependencies"
	@echo "  make electron-start      - Start the electron application"
	@echo "  make electron-build      - Build the electron application"
	@echo "  make electron-build-dev  - Build the electron application in development mode"
	@echo "  make electron-dev        - Start electron development environment"
	@echo "  make electron-electron-dev - Start electron development server"

format:
	dprint fmt

electron:
	pnpm --filter=./electron

web:
	pnpm --filter=./web

# Web scripts
.PHONY: web-dev web-build web-start web-lint

web-dev:
	pnpm web dev

web-build:
	pnpm web build

web-start:
	pnpm web start

web-lint:
	pnpm web lint

# Electron scripts
.PHONY: electron-clean electron-copy electron-prepare electron-dist electron-linux electron-win electron-mac electron-postinstall electron-start electron-build electron-build-dev electron-dev electron-electron-dev

electron-clean:
	pnpm electron clean

electron-copy:
	pnpm electron copy

electron-prepare:
	pnpm electron prepare

electron-dist:
	make web-build && pnpm electron dist

electron-linux:
	pnpm electron linux

electron-win:
	pnpm electron win

electron-mac:
	pnpm electron mac

electron-postinstall:
	pnpm electron postinstall

electron-start:
	pnpm electron start

electron-build:
	pnpm electron build

electron-build-dev:
	pnpm electron build:dev

electron-dev:
	pnpm electron dev

electron-electron-dev:
	pnpm electron electron:dev
