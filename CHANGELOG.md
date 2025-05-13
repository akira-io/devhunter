# Changelog

## 0.3.0 (2025-05-13)

* refactor: adjust layout and styling in profile and welcome components for improved responsiveness ([582be82](https://github.com/akira-io/devhunter/commit/582be82))
* refactor: change 'Explorar' link sidebar position ([3fc5bee](https://github.com/akira-io/devhunter/commit/3fc5bee))
* refactor: enhance Comment model with type hints and improve likes relationship handling ([59502a8](https://github.com/akira-io/devhunter/commit/59502a8))
* refactor: improve type handling and update test coverage command ([a16bd32](https://github.com/akira-io/devhunter/commit/a16bd32))
* refactor: remove gradient styling from tab lists in public profile ([2ea3aee](https://github.com/akira-io/devhunter/commit/2ea3aee))
* refactor: reorder import statements in profile.tsx for improved readability ([27eb722](https://github.com/akira-io/devhunter/commit/27eb722))
* refactor: resolve type issues in HuntResource and improve property access handling ([23aa366](https://github.com/akira-io/devhunter/commit/23aa366))
* refactor: simplify UserInfo component and adjust user menu layout for better clarity ([116f161](https://github.com/akira-io/devhunter/commit/116f161))
* refactor: update database connection settings and modify hunts table schema ([39015e4](https://github.com/akira-io/devhunter/commit/39015e4))
* chore: add 'commitlint' to infolist in peck.json ([5a2fcdc](https://github.com/akira-io/devhunter/commit/5a2fcdc))
* chore: add commitlint and husky for commit message linting ([1a6d8de](https://github.com/akira-io/devhunter/commit/1a6d8de))
* chore: add ESLint directive to commitlint config file ([d322bfa](https://github.com/akira-io/devhunter/commit/d322bfa))
* chore: add Laravel Horizon package and schedule command for snapshots ([b11c17c](https://github.com/akira-io/devhunter/commit/b11c17c))
* chore: convert commitlint config to ES module syntax ([306da3e](https://github.com/akira-io/devhunter/commit/306da3e))
* chore: format frontend ([dbb248a](https://github.com/akira-io/devhunter/commit/dbb248a))
* chore: refactor comment retrieval to include like status and improve code clarity ([268f7dd](https://github.com/akira-io/devhunter/commit/268f7dd))
* chore: rename commitlint config file and set package type to module ([897c823](https://github.com/akira-io/devhunter/commit/897c823))
* chore: simplify Node dependency installation in CI workflow ([6e39be0](https://github.com/akira-io/devhunter/commit/6e39be0))
* chore: switch from npm to yarn for dependency management in CI workflow ([2c14f1e](https://github.com/akira-io/devhunter/commit/2c14f1e))
* chore: switch Node dependency installation from Yarn to npm in CI workflow ([868d3db](https://github.com/akira-io/devhunter/commit/868d3db))
* chore: update test coverage threshold to 71.5 for improved accuracy ([6800446](https://github.com/akira-io/devhunter/commit/6800446))
* chore(deps): bump league/commonmark ([4c9ed6a](https://github.com/akira-io/devhunter/commit/4c9ed6a))
* fix: adjust grid layout for onboarding section to improve responsiveness on small screens ([b2c7dda](https://github.com/akira-io/devhunter/commit/b2c7dda))
* fix: update comment deletion and hunt destruction routes to return back instead of redirecting ([2ec274f](https://github.com/akira-io/devhunter/commit/2ec274f))
* fix: update FollowButton variant and enhance profile background styling for improved aesthetics ([c22e741](https://github.com/akira-io/devhunter/commit/c22e741))
* fix: update layout and styling in public profile for improved responsiveness and visual consistency ([43653d6](https://github.com/akira-io/devhunter/commit/43653d6))
* feat: add gradient styling to tab lists in public profile ([d71689a](https://github.com/akira-io/devhunter/commit/d71689a))
* feat: add gradient styling to tab lists in public profile for improved visual appeal ([a8a0e09](https://github.com/akira-io/devhunter/commit/a8a0e09))
* feat: add optional ligatures prop to HuntCard and adjust layout for improved responsiveness ([21b98bc](https://github.com/akira-io/devhunter/commit/21b98bc))
* feat: enhance profile background with brightness and grayscale effects for improved aesthetics ([643684a](https://github.com/akira-io/devhunter/commit/643684a))
* feat: enhance public profile with dynamic tab lists and about section ([cf01759](https://github.com/akira-io/devhunter/commit/cf01759))
* feat: implement public profile functionality with follow/unfollow buttons ([18d00dd](https://github.com/akira-io/devhunter/commit/18d00dd))

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.2.0 (2025-05-06)

### Features

- Introduced the Finder component with user search functionality
- Added hunts: users can now create, like, and comment on hunts
- Implemented comment support with like and delete actions
- Added command dialog for faster search interactions
- Integrated Pan analytics to improve insights and metrics

### UI and UX Improvements

- Enhanced the ProfileCompletion component with visual feedback and responsive layout
- Updated the Welcome component with new styles, GitHub and Discord links, and improved placeholder text
- Improved responsiveness for Links, Sidebar, and other layout elements
- Refined styles across components with better spacing, gradients, and accessibility features

### Refactors and Naming Consistency

- Renamed "Dev Hunter" to "Hunter" throughout the interface
- Rebranded "Feed" to "Hunt Line" and updated routes and components accordingly
- Replaced "Followers" with "Hunters" for a more consistent brand language
- Simplified sidebar state handling and reorganized related logic
- Cleaned up class names and removed redundant styling for better maintainability

### Fixes and General Improvements

- Improved avatar rendering for better responsiveness
- Adjusted padding and spacing in multiple components
- Improved test coverage configuration and internal documentation

## 0.1.1 (2025-04-29)

### Added

- Docker setup for DevHunter via Laravel Sail. ([#50](https://github.com/akira-io/devhunter/pull/50))

### Fixed

- Comment formatting in `WelcomeController.php` improved for clarity. (`27a5c65`)
- Handled empty `users` array in Welcome component and ensured proper use of paginator data. (`ba837e4`)

### Changed

- Updated environment configuration and README to provide clearer setup instructions. (`67708dc`)

## 0.1.0 (2025-04-29)

### Added

- User follow/unfollow system.
- GitHub authentication and extended user profiles.
- `CreateHunt` and `FloatingCreateHunt` components.
- Onboarding flow with follow suggestions.
- Admin panel for platform management.
- Meilisearch integration via Laravel Scout.
- Profile editing for professional education and skills.
- Redesigned profile page with highlights, bio, social links, and follower count.
- `DevCount`, `NavUser`, and `Highlights` components.
- Cybersecurity skills in tech stack.
- Search debouncing.
- Images in README.
- Code of Conduct and Security Policy documents.

### Changed

- Enhanced frontend layout and mobile responsiveness.
- Improved onboarding suggestions with better randomization and structure.
- Added loading indicators to search input.
- Refined route names and search timeouts.
- Updated README and repository links.

### Fixed

- General UI inconsistencies and layout issues.

### Security

- Set up `laravel-debugbar` as a dev-only tool.
- Added Security Policy documentation.

### Infrastructure

- GitHub Actions: formatting, linting, Meilisearch setup.
- CI/CD: steps for PHP, Node.js, and wait-for-Meilisearch logic.
- `release-it` setup with custom changelog grouping.
- Dependabot integration for dependency updates.

### Maintenance

- Architectural tests and strict typing in controllers.
- Cleanup of `package.json` and configuration files.
- Updated changelog tooling and test coverage thresholds.
- Consistent formatting and typing across frontend using Prettier and TypeScript settings.
