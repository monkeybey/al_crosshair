# Installation Guide - al_crosshair

This guide will walk you through installing and setting up the al_crosshair resource on your FiveM server.

## 📋 Prerequisites

Before installing al_crosshair, ensure you have:

- ✅ **FiveM Server** (any version)
- ✅ **Server Admin Access** (to modify server.cfg)
- ✅ **File System Access** (to upload files)
- ✅ **Basic FiveM Knowledge** (resource management)

## 🚀 Quick Installation

### Step 1: Download
1. Download the al_crosshair resource
2. Extract the files to your desired location

### Step 2: Upload to Server
1. Navigate to your FiveM server's `resources` folder
2. Create or navigate to the `[standalone]` folder
3. Upload the `al_crosshair` folder here

**Final path should be:**
```
resources/[standalone]/al_crosshair/
```

### Step 3: Add to Server Configuration
1. Open your `server.cfg` file
2. Add the following line:
   ```
   ensure al_crosshair
   ```
3. Save the file

### Step 4: Start the Server
1. Start your FiveM server
2. The resource should automatically load
3. Check the console for confirmation messages

## 📁 File Structure Verification

After installation, your file structure should look like this:

```
resources/[standalone]/al_crosshair/
├── Client/
│   └── Main.lua
├── Config/
│   └── Main.lua
├── Html/
│   ├── Crosshair.html
│   ├── Css/
│   │   └── Crosshair.css
│   ├── Js/
│   │   └── Crosshair.js
│   ├── Images/
│   │   └── Crosshairs/
│   │       ├── 1.png
│   │       ├── 2.png
│   │       └── ... (up to 90.png)
│   └── Webfonts/
│       ├── BebasNeuePro-Bold.ttf
│       ├── BebasNeuePro-Regular.ttf
│       └── ... (other font files)
├── fxmanifest.lua
├── LICENSE
├── README.md
├── CHANGELOG.md
└── INSTALL.md
```

## ⚙️ Configuration

### Basic Configuration (Optional)
The resource works out of the box with default settings. To customize:

1. Open `Config/Main.lua`
2. Modify the settings as needed
3. Save the file
4. Restart the resource

### Common Configuration Changes

#### Change Default Messages
```lua
al_crosshair_Main_Config.Text = {
    loaded_crosshair = 'Your custom message here!',
    selected_crosshair = 'Crosshair %d selected!',
    -- Add more custom messages
}
```

#### Adjust Notification Settings
```lua
al_crosshair_Main_Config.Notifications = {
    enabled = true,           -- Enable/disable notifications
    defaultDuration = 1000,  -- Notification duration (ms)
    debounceTime = 2000,     -- Anti-spam delay (ms)
    debugMode = false        -- Enable debug logging
}
```

## 🔧 Server Configuration

### server.cfg Example
```cfg
# Other server settings...

# Resources
ensure al_crosshair

# Other resources...
```

### Resource Loading Order
al_crosshair is standalone and doesn't require any specific loading order. It can be loaded:
- Before other resources
- After other resources
- At any point in your resource list

## ✅ Verification

### Check Installation
1. **Start your server**
2. **Join the server**
3. **Press F9** to open the crosshair menu
4. **Verify features work:**
   - Menu opens and closes
   - Crosshairs display correctly
   - Settings can be changed
   - Changes are saved

### Console Messages
Look for these messages in your server console:
```
[al_crosshair] Resource started with crosshair: 1
[al_crosshair] Loaded saved crosshair: 1
[al_crosshair] Loaded saved settings (v1.0.0)
```

### In-Game Testing
1. **Open menu** (F9)
2. **Select different crosshairs**
3. **Adjust size and opacity**
4. **Test display modes** (Always/Aim/Off)
5. **Save settings**
6. **Restart and verify persistence**

## 🛠️ Troubleshooting

### Common Issues

#### Resource Won't Start
**Problem**: Resource doesn't appear in server console
**Solutions**:
- Check file path is correct
- Verify `fxmanifest.lua` is present
- Check for typos in `server.cfg`
- Ensure resource name is exactly `al_crosshair`

#### Menu Won't Open
**Problem**: F9 doesn't open the menu
**Solutions**:
- Check if resource is running (`ensure al_crosshair`)
- Verify no conflicting keybinds
- Check console for error messages
- Try restarting the resource

#### Crosshairs Not Displaying
**Problem**: Crosshairs don't show in-game
**Solutions**:
- Check "Show Reticle" setting (should be ON or AIM)
- Verify size and opacity settings
- Check if GTA 5 reticle is disabled
- Ensure you're not in a restricted area

#### Settings Not Saving
**Problem**: Changes don't persist after restart
**Solutions**:
- Click the Save button (💾) before closing
- Check KVP storage permissions
- Verify no conflicting resources
- Check console for save errors

### Debug Mode
Enable debug mode for detailed logging:
```lua
al_crosshair_Main_Config.Notifications.debugMode = true
```

### Console Commands
Use these commands in your server console:
```
restart al_crosshair    # Restart the resource
stop al_crosshair      # Stop the resource
start al_crosshair     # Start the resource
```

## 🔄 Updates

### Updating the Resource
1. **Backup** your current configuration
2. **Download** the new version
3. **Replace** the old files (except your custom config)
4. **Restart** the resource
5. **Test** functionality

### Configuration Migration
- Settings are automatically migrated
- No manual migration needed
- Old settings are preserved

## 🗑️ Uninstallation

### Remove from Server
1. **Stop** the resource: `stop al_crosshair`
2. **Remove** from `server.cfg`
3. **Delete** the `al_crosshair` folder
4. **Restart** the server

### Clean Up Data (Optional)
Player settings are stored in KVP and will remain. To clean up:
1. Use a KVP management tool
2. Remove keys starting with `al_crosshair_`
3. Or leave them (they won't cause issues)

## 📞 Support

### Getting Help
- Check this installation guide
- Read the README.md for usage instructions
- Review the CHANGELOG.md for known issues
- Check console for error messages

### Reporting Issues
When reporting issues, include:
- Server version
- Resource version
- Error messages from console
- Steps to reproduce the issue
- Screenshots if applicable

## 📋 Checklist

Use this checklist to verify your installation:

- [ ] Files uploaded to correct location
- [ ] Resource added to server.cfg
- [ ] Server started successfully
- [ ] Resource loads without errors
- [ ] F9 opens the menu
- [ ] Crosshairs display correctly
- [ ] Settings can be changed
- [ ] Settings persist after restart
- [ ] No console errors
- [ ] All features working

## 🎯 Next Steps

After successful installation:

1. **Read the README.md** for detailed usage instructions
2. **Test all features** to ensure everything works
3. **Customize settings** if desired
4. **Inform players** about the new crosshair system
5. **Monitor performance** and adjust if needed

---

## 📄 Additional Resources

- [README.md](README.md) - Complete usage guide
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [LICENSE](LICENSE) - License information

---

**Installation completed successfully!** 🎉

*For support, contact DevAL - ALKiS*
