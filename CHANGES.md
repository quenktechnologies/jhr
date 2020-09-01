# JHR Changelog

## [2.6.18] - 2020-08-31

### Changed
- The JSONParser now has a lenient that will not throw errors if it cannot parse
the request body. Instead `undefined` will be provided. Be safe!

## [2.6.17] - 2020-08-30

### Added

- Started a Changelog!

### Changed
- Improved cookie handling to avoid sending `Set-Cookie` syntax in the 
`Cookie` header.
