# Changelog

All notable changes to the al_crosshair project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Nothing yet

### Changed
- Nothing yet

### Deprecated
- Nothing yet

### Removed
- Nothing yet

### Fixed
- Nothing yet

### Security
- Nothing yet

---

## [1.0.0] - 2025-10-05

### Added
- **Initial Release** - Complete crosshair system for FiveM
- **90 Unique Crosshairs** - Three categories: White (1-30), Colorful (31-60), Animated (61-90)
- **Real-time Preview System** - Live preview of crosshair changes
- **Favorites Management** - Right-click to favorite/unfavorite crosshairs
- **Category Filtering** - Filter by All, Favorites, White, Colorful, Animated
- **Search Functionality** - Search through crosshairs by name
- **Size Control** - Adjustable crosshair size from 50% to 300%
- **Opacity Control** - Fine-tune transparency from 10% to 100%
- **Display Modes** - Three modes: Always On, When Aiming, Off
- **Settings Persistence** - All settings automatically saved and restored
- **Smart Notification System** - Anti-spam with debouncing and queuing
- **Instant Menu System** - Fast opening with immediate control disabling
- **Settings Revert** - Undo changes if not saved
- **Keyboard Navigation** - Full keyboard support including arrow keys
- **Performance Optimizations** - Efficient rendering and memory management
- **KVP Storage System** - Reliable data persistence with backup
- **Legacy Data Migration** - Automatic migration from old format
- **Modern UI Design** - Clean, responsive interface with animations
- **Loading States** - Visual feedback during crosshair loading
- **Scroll Controls** - Up/down buttons for crosshair navigation
- **Context Menus** - Right-click functionality for crosshairs
- **Info Modal** - Help information and usage tips
- **Error Handling** - Comprehensive error handling and validation
- **Debug Mode** - Optional debug logging for troubleshooting
- **Creative Commons License** - BY-NC 4.0 licensing

### Technical Details
- **Framework**: Standalone (No ESX or other frameworks required)
- **Language**: Lua (Client-side), HTML/CSS/JavaScript (UI)
- **Storage**: FiveM KVP (Key-Value Pairs)
- **Performance**: Optimized with caching and efficient rendering
- **Compatibility**: FiveM Server (any version)

### Files Added
- `Client/Main.lua` - Main client-side logic
- `Config/Main.lua` - Configuration and settings
- `fxmanifest.lua` - Resource manifest
- `Html/Crosshair.html` - Main UI interface
- `Html/Css/Crosshair.css` - Styling and animations
- `Html/Js/Crosshair.js` - UI logic and interactions
- `Html/Images/Crosshairs/` - 90 crosshair image files (1.png - 90.png)
- `Html/Webfonts/` - Custom font files
- `LICENSE` - Creative Commons BY-NC 4.0 license
- `README.md` - Complete documentation
- `CHANGELOG.md` - This changelog file
- `INSTALL.md` - Installation guide

### Known Issues
- GTA 5 Reticle toggle feature marked as "Coming Soon"
- Some crosshairs may not display properly on certain graphics settings
- Performance may vary on lower-end systems with all 90 crosshairs loaded

### Breaking Changes
- None (Initial release)

### Migration Notes
- This is the initial release, no migration needed
- Resource name must be exactly `al_crosshair` for proper functionality

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-10-05 | Initial release with full feature set |

---

## Contributing

When adding entries to this changelog, please follow these guidelines:

1. **Added** - New features
2. **Changed** - Changes to existing functionality
3. **Deprecated** - Soon-to-be removed features
4. **Removed** - Removed features
5. **Fixed** - Bug fixes
6. **Security** - Security improvements

### Entry Format
- Use present tense ("Add feature" not "Added feature")
- Use past tense for version entries ("Added feature" for completed changes)
- Group related changes together
- Include issue/PR numbers when applicable
- Be descriptive but concise

---

*This changelog is maintained by DevAL - ALKiS*
