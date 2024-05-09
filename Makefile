dev:
  just build
  node --run dev

dist:
  node --run electron dist

tidy:
  node --run format

build:
  node --run build

bundle:
  just build
  just dist