# ravenhollow.com

Website for the _What Makes You Tick?_ adventure game series.

## Build

All pages are static HTML. Pages are wrapped by header and footer markup managed for each section. Make updates to `_header` and `_footer` files then execute:

```shell
yarn build
```

Running the build script will reapply the latest header and footer markup to all site files. When adding or removing a site page, be sure to update the build script to match.
