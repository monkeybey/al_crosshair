[![Watch the video](https://www.youtube.com/watch?v=8GTyGc4x_Ao)

<img width="461" height="848" alt="image" src="https://github.com/user-attachments/assets/59589233-d2d0-42f8-b48a-1651ffb9c9e6" />

# al_crosshair - Advanced Crosshair System for FiveM

**Copyright (c) 2025 DevAL - ALKiS**

This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Configuration](#configuration)
- [Crosshair Categories](#crosshair-categories)
- [Controls](#controls)
- [Settings](#settings)
- [Troubleshooting](#troubleshooting)
- [Technical Details](#technical-details)
- [License](#license)

## 🎯 Overview

al_crosshair is an advanced crosshair system for FiveM that provides 90 unique crosshair designs with extensive customization options. The system features a modern, user-friendly interface with real-time preview, favorites system, and intelligent notification management.

## ✨ Features

### Core Features
- **90 Unique Crosshairs** - From simple white designs to colorful and animated crosshairs
- **Real-time Preview** - See changes instantly as you customize
- **Favorites System** - Mark your preferred crosshairs for quick access
- **Category Filtering** - Organize crosshairs by type (White, Colorful, Animated)
- **Search Functionality** - Find specific crosshairs quickly
- **Settings Persistence** - All settings are automatically saved and restored

### Customization Options
- **Size Control** - Adjust crosshair size from 50% to 300%
- **Opacity Control** - Fine-tune transparency from 10% to 100%
- **Display Modes** - Choose when to show the crosshair:
  - **Always On** - Crosshair visible at all times
  - **When Aiming** - Only appears when aiming weapons
  - **Off** - Completely hidden
- **GTA 5 Reticle Control** - Disable default GTA crosshair (Coming Soon)

### Advanced Features
- **Smart Notifications** - Anti-spam system with debouncing
- **Instant Menu** - Fast opening with immediate control disabling
- **Settings Revert** - Undo changes if you don't save
- **Keyboard Navigation** - Full keyboard support
- **Performance Optimized** - Efficient rendering and memory usage

## 🚀 Installation

1. **Download** the resource to your FiveM server's `resources` folder
2. **Extract** the files to `resources/[standalone]/al_crosshair/`
3. **Add** to your `server.cfg`:
   ```
   ensure al_crosshair
   ```
4. **Restart** your server or start the resource

### Requirements
- FiveM Server
- No additional dependencies (standalone resource)

## 🎮 How to Use

### Opening the Menu
- **Press F9** to open the crosshair menu
- **Press Escape** to close without saving changes

### Selecting a Crosshair
1. **Browse** through the 90 available crosshairs
2. **Click** on any crosshair to select it (preview only)
3. **Use filters** to narrow down options:
   - **All** - Show all crosshairs
   - **Favorites** - Show only favorited crosshairs
   - **White** - Simple white designs (1-30)
   - **Colorful** - Vibrant colored designs (31-60)
   - **Animated** - Dynamic animated designs (61-90)
4. **Search** by typing in the search box

### Managing Favorites
- **Right-click** any crosshair to add/remove from favorites
- **Filter by Favorites** to see only your preferred crosshairs
- Favorites are saved locally and persist between sessions

### Customizing Settings
1. **Size Slider** - Adjust crosshair size (50%-300%)
2. **Opacity Slider** - Control transparency (10%-100%)
3. **Show Reticle** - Toggle between Always/Aim/Off modes
4. **Live Preview** - See changes in real-time

### Saving Changes
- **Click Save** (💾) to apply and save all changes
- **Click Reset** (🔄) to restore default settings
- **Click Close** (❌) to exit without saving

## ⚙️ Configuration

### Basic Configuration
Edit `Config/Main.lua` to customize:

#### Messages
```lua
al_crosshair_Main_Config.Text = {
    loaded_crosshair = 'Your Crosshair has loaded!',
    selected_crosshair = 'Crosshair %d has been selected and saved!',
    -- Add your custom messages here
}
```

#### Notification Settings
```lua
al_crosshair_Main_Config.Notifications = {
    enabled = true,                    -- Enable/disable notifications
    defaultDuration = 800,            -- Default notification duration (ms)
    debounceEnabled = true,           -- Prevent notification spam
    debounceTime = 1000,              -- Debounce time (ms)
    maxQueueSize = 2,                 -- Max notifications in queue
    debugMode = false                 -- Enable debug logging
}
```

### Advanced Configuration
- **Crosshair Data** - Modify crosshair definitions in the config
- **Notification Types** - Customize notification appearance and behavior
- **Framework Integration** - Currently uses custom notification system

## 🎨 Crosshair Categories

### White Crosshairs (1-30)
- Simple, clean designs
- High contrast and visibility
- Perfect for competitive gameplay
- Minimal visual distraction

### Colorful Crosshairs (31-60)
- Vibrant and eye-catching designs
- Various color schemes
- Enhanced visual appeal
- Great for casual gameplay

### Animated Crosshairs (61-90)
- Dynamic and moving designs
- Eye-catching animations
- Unique visual effects
- Perfect for special occasions

## 🎯 Controls

### Menu Controls
- **F9** - Open/Close crosshair menu
- **Escape** - Close menu without saving
- **Arrow Keys** - Navigate crosshair grid
- **Mouse Wheel** - Scroll through crosshairs

### In-Menu Controls
- **Left Click** - Select crosshair
- **Right Click** - Toggle favorite
- **Sliders** - Adjust size and opacity
- **Buttons** - Toggle display modes

## 🔧 Settings

### Display Modes
- **ON** - Crosshair always visible
- **AIM** - Only visible when aiming
- **OFF** - Completely hidden

### Size Range
- **Minimum**: 50% (0.5x)
- **Maximum**: 300% (3.0x)
- **Step**: 10% increments

### Opacity Range
- **Minimum**: 10% (0.1)
- **Maximum**: 100% (1.0)
- **Step**: 10% increments

## 🛠️ Troubleshooting

### Common Issues

#### Menu Won't Open
- Check if resource is started: `ensure al_crosshair`
- Verify resource name is exactly `al_crosshair`
- Check console for error messages

#### Crosshair Not Showing
- Check "Show Reticle" setting (should be ON or AIM)
- Verify size and opacity settings
- Ensure you're not in a vehicle (if that's the issue)

#### Settings Not Saving
- Check if you clicked the Save button
- Verify KVP storage permissions
- Check console for save errors

#### Performance Issues
- Reduce notification frequency
- Disable debug mode
- Check for conflicting resources

### Debug Mode
Enable debug mode in config to see detailed logging:
```lua
al_crosshair_Main_Config.Notifications.debugMode = true
```

## 🔧 Technical Details

### Architecture
- **Client-side**: Lua scripts for game integration
- **UI**: HTML/CSS/JavaScript for interface
- **Storage**: KVP (Key-Value Pairs) for settings persistence
- **Notifications**: Custom notification system

### File Structure
```
al_crosshair/
├── Client/
│   └── Main.lua          # Main client logic
├── Config/
│   └── Main.lua          # Configuration settings
├── Html/
│   ├── Crosshair.html    # Main UI
│   ├── Css/
│   │   └── Crosshair.css # Styling
│   ├── Js/
│   │   └── Crosshair.js  # UI logic
│   └── Images/
│       └── Crosshairs/   # 90 crosshair images
├── fxmanifest.lua        # Resource manifest
└── LICENSE               # License information
```

### Performance Features
- **Caching System** - Reduces KVP reads
- **Debounced Notifications** - Prevents spam
- **Efficient Rendering** - Optimized UI updates
- **Memory Management** - Automatic cleanup

### Data Storage
- **Crosshair Selection** - Stored in KVP
- **Settings** - JSON format in KVP
- **Favorites** - Local storage
- **Backup System** - Dual storage for reliability

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.

### You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

### Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made
- **NonCommercial** — You may not use the material for commercial purposes

### Full License Text
See the [LICENSE](LICENSE) file for the complete license text.

---

## 🤝 Support

For support, bug reports, or feature requests, please contact the author or create an issue in the project repository.

**Author**: DevAL - ALKiS  
**Version**: 1.0.0  
**Last Updated**: 2025

---

*Made with ❤️ for the FiveM community*
