# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.3.0 (2025-05-13)

### UI and UX Improvements

- Enhanced `ProfileCompletion` component with visual feedback and responsive layout
- Updated `Welcome` component styles, added GitHub and Discord links, and improved placeholder text
- Improved layout responsiveness across `Links`, `Sidebar`, and other components
- Refined component styles with better spacing, gradients, and accessibility enhancements

### Refactors and Naming Consistency

- Renamed all mentions of "Dev Hunter" to "Hunter" throughout the UI
- Rebranded "Feed" as "Hunt Line", including updated routes and components
- Replaced the term "Followers" with "Hunters" for consistent branding
- Simplified sidebar state handling and reorganized related logic
- Cleaned up class names and removed redundant styles for better maintainability

### Fixes and General Improvements

- Improved avatar rendering responsiveness
- Adjusted padding and spacing across various components
- Enhanced test coverage configuration and updated internal documentation

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
