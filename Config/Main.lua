--[[
    al_crosshair - Advanced Crosshair System for FiveM
    Copyright (c) 2025 DevAL - ALKiS

    This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
    To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/ or send a letter to 
    Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

    You are free to:
    - Share — copy and redistribute the material in any medium or format
    - Adapt — remix, transform, and build upon the material

    Under the following terms:
    - Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
    - NonCommercial — You may not use the material for commercial purposes.
--]]

 -- Config
al_crosshair_Main_Config = {}
--

-- Simple Message Configuration
al_crosshair_Main_Config.Text = {
    -- Main Messages (change these to customize)
    loaded_crosshair = 'Your Crosshair has loaded!',
    selected_crosshair = 'Crosshair %d has been selected and saved!',
    already_selected = 'Crosshair %d is already selected!',
    settings_applied = 'Settings applied successfully!',
    
    -- Help Messages
    help_menu_open = 'Press F9 to open the crosshair menu',
    help_crosshair_select = 'Click on any crosshair to select it',
    
    -- Error Messages
    error_save_failed = 'Failed to save crosshair settings',
    error_invalid_settings = 'Invalid settings provided',
    
    -- Success Messages
    success_crosshair_saved = 'Crosshair %d saved successfully!',
    success_settings_saved = 'All settings have been saved!',
    
    -- Warning Messages
    warning_invalid_size = 'Size must be between 0.1 and 3.0',
    warning_invalid_opacity = 'Opacity must be between 0.1 and 1.0'
}

-- Single Notification System Configuration
al_crosshair_Main_Config.Notifications = {
    -- Display settings
    enabled = true, -- Enable/disable notifications
    defaultDuration = 800, -- Default notification duration in milliseconds
    position = 'modal-top-right', -- Notification position inside modal
    
    -- Debounce settings (prevents spam)
    debounceEnabled = true, -- Enable debounce protection
    debounceTime = 1000, -- Time in milliseconds to ignore duplicate notifications
    maxQueueSize = 2, -- Maximum notifications in queue
    
    -- Visual settings
    showIcons = true, -- Show icons in notifications
    animationDuration = 300, -- Animation duration in milliseconds
    stackNotifications = true, -- Only show one notification at a time
    
    -- Notification types and their settings
    types = {
        success = {
            icon = 'check',
            color = '#10b981',
            duration = 3000
        },
        error = {
            icon = 'times',
            color = '#ef4444',
            duration = 4000
        },
        warning = {
            icon = 'exclamation-triangle',
            color = '#f59e0b',
            duration = 3500
        },
        info = {
            icon = 'info-circle',
            color = '#3b82f6',
            duration = 3000
        }
    },
    
    -- Advanced settings
    cleanupInterval = 10000, -- How often to clean up old debounce data (milliseconds)
    debugMode = false -- Enable debug logging for notifications
}
--

-- All Crosshairs
al_crosshair_Main_Config.Crosshairs = {
    [1] = { label = 'Crosshair 1', image = './Images/Crosshairs/1.png', category = 'white' },
  
	[2] = { label = 'Crosshair 2', image = './Images/Crosshairs/2.png', category = 'white' },
    
	[3] = { label = 'Crosshair 3', image = './Images/Crosshairs/3.png', category = 'white' },
    
	[4] = { label = 'Crosshair 4', image = './Images/Crosshairs/4.png', category = 'white' },
    
	[5] = { label = 'Crosshair 5', image = './Images/Crosshairs/5.png', category = 'white' },
    
	[6] = { label = 'Crosshair 6', image = './Images/Crosshairs/6.png', category = 'white' },
    
	[7] = { label = 'Crosshair 7', image = './Images/Crosshairs/7.png', category = 'white' },
    
	[8] = { label = 'Crosshair 8', image = './Images/Crosshairs/8.png', category = 'white' },
    
	[9] = { label = 'Crosshair 9', image = './Images/Crosshairs/9.png', category = 'white' },
    
	[10] = { label = 'Crosshair 10', image = './Images/Crosshairs/10.png', category = 'white' },
    
	[11] = { label = 'Crosshair 11', image = './Images/Crosshairs/11.png', category = 'white' },
    
	[12] = { label = 'Crosshair 12', image = './Images/Crosshairs/12.png', category = 'white' },
    
	[13] = { label = 'Crosshair 13', image = './Images/Crosshairs/13.png', category = 'white' },
    
	[14] = { label = 'Crosshair 14', image = './Images/Crosshairs/14.png', category = 'white' },
    
	[15] = { label = 'Crosshair 15', image = './Images/Crosshairs/15.png', category = 'white' },
    
	[16] = { label = 'Crosshair 16', image = './Images/Crosshairs/16.png', category = 'white' },
    
	[17] = { label = 'Crosshair 17', image = './Images/Crosshairs/17.png', category = 'white' },
    
	[18] = { label = 'Crosshair 18', image = './Images/Crosshairs/18.png', category = 'white' },
    
	[19] = { label = 'Crosshair 19', image = './Images/Crosshairs/19.png', category = 'white' },
    
	[20] = { label = 'Crosshair 20', image = './Images/Crosshairs/20.png', category = 'white' },
    
	[21] = { label = 'Crosshair 21', image = './Images/Crosshairs/21.png', category = 'white' },
    
	[22] = { label = 'Crosshair 22', image = './Images/Crosshairs/22.png', category = 'white' },
    
	[23] = { label = 'Crosshair 23', image = './Images/Crosshairs/23.png', category = 'white' },
    
	[24] = { label = 'Crosshair 24', image = './Images/Crosshairs/24.png', category = 'white' },
    
	[25] = { label = 'Crosshair 25', image = './Images/Crosshairs/25.png', category = 'white' },
    
	[26] = { label = 'Crosshair 26', image = './Images/Crosshairs/26.png', category = 'white' },
    
	[27] = { label = 'Crosshair 27', image = './Images/Crosshairs/27.png', category = 'white' },
    
	[28] = { label = 'Crosshair 28', image = './Images/Crosshairs/28.png', category = 'white' },
    
	[29] = { label = 'Crosshair 29', image = './Images/Crosshairs/29.png', category = 'white' },
    
	[30] = { label = 'Crosshair 30', image = './Images/Crosshairs/30.png', category = 'white' },
    
	[31] = { label = 'Crosshair 31', image = './Images/Crosshairs/31.png', category = 'colorful' },
    
	[32] = { label = 'Crosshair 32', image = './Images/Crosshairs/32.png', category = 'colorful' },
    
	[33] = { label = 'Crosshair 33', image = './Images/Crosshairs/33.png', category = 'colorful' },
    
	[34] = { label = 'Crosshair 34', image = './Images/Crosshairs/34.png', category = 'colorful' },
    
	[35] = { label = 'Crosshair 35', image = './Images/Crosshairs/35.png', category = 'colorful' },
    
	[36] = { label = 'Crosshair 36', image = './Images/Crosshairs/36.png', category = 'colorful' },
    
	[37] = { label = 'Crosshair 37', image = './Images/Crosshairs/37.png', category = 'colorful' },
    
	[38] = { label = 'Crosshair 38', image = './Images/Crosshairs/38.png', category = 'colorful' },
    
	[39] = { label = 'Crosshair 39', image = './Images/Crosshairs/39.png', category = 'colorful' },
    
	[40] = { label = 'Crosshair 40', image = './Images/Crosshairs/40.png', category = 'colorful' },
    
	[41] = { label = 'Crosshair 41', image = './Images/Crosshairs/41.png', category = 'colorful' },
    
	[42] = { label = 'Crosshair 42', image = './Images/Crosshairs/42.png', category = 'colorful' },
    
	[43] = { label = 'Crosshair 43', image = './Images/Crosshairs/43.png', category = 'colorful' },
    
	[44] = { label = 'Crosshair 44', image = './Images/Crosshairs/44.png', category = 'colorful' },
    
	[45] = { label = 'Crosshair 45', image = './Images/Crosshairs/45.png', category = 'colorful' },
    
	[46] = { label = 'Crosshair 46', image = './Images/Crosshairs/46.png', category = 'colorful' },
    
	[47] = { label = 'Crosshair 47', image = './Images/Crosshairs/47.png', category = 'colorful' },
    
	[48] = { label = 'Crosshair 48', image = './Images/Crosshairs/48.png', category = 'colorful' },
    
	[49] = { label = 'Crosshair 49', image = './Images/Crosshairs/49.png', category = 'colorful' },
    
	[50] = { label = 'Crosshair 50', image = './Images/Crosshairs/50.png', category = 'colorful' },
    
	[51] = { label = 'Crosshair 51', image = './Images/Crosshairs/51.png', category = 'colorful' },
    
	[52] = { label = 'Crosshair 52', image = './Images/Crosshairs/52.png', category = 'colorful' },
    
	[53] = { label = 'Crosshair 53', image = './Images/Crosshairs/53.png', category = 'colorful' },
    
	[54] = { label = 'Crosshair 54', image = './Images/Crosshairs/54.png', category = 'colorful' },
    
	[55] = { label = 'Crosshair 55', image = './Images/Crosshairs/55.png', category = 'colorful' },
    
	[56] = { label = 'Crosshair 56', image = './Images/Crosshairs/56.png', category = 'colorful' },
    
	[57] = { label = 'Crosshair 57', image = './Images/Crosshairs/57.png', category = 'colorful' },
    
	[58] = { label = 'Crosshair 58', image = './Images/Crosshairs/58.png', category = 'colorful' },
    
	[59] = { label = 'Crosshair 59', image = './Images/Crosshairs/59.png', category = 'colorful' },
    
	[60] = { label = 'Crosshair 60', image = './Images/Crosshairs/60.png', category = 'colorful' },

	[61] = { label = 'Crosshair 61', image = './Images/Crosshairs/61.png', category = 'animated' },

	[62] = { label = 'Crosshair 62', image = './Images/Crosshairs/62.png', category = 'animated' },

	[63] = { label = 'Crosshair 63', image = './Images/Crosshairs/63.png', category = 'animated' },

	[64] = { label = 'Crosshair 64', image = './Images/Crosshairs/64.png', category = 'animated' },

	[65] = { label = 'Crosshair 65', image = './Images/Crosshairs/65.png', category = 'animated' },

	[66] = { label = 'Crosshair 66', image = './Images/Crosshairs/66.png', category = 'animated' },

	[67] = { label = 'Crosshair 67', image = './Images/Crosshairs/67.png', category = 'animated' },

	[68] = { label = 'Crosshair 68', image = './Images/Crosshairs/68.png', category = 'animated' },

	[69] = { label = 'Crosshair 69', image = './Images/Crosshairs/69.png', category = 'animated' },

	[70] = { label = 'Crosshair 70', image = './Images/Crosshairs/70.png', category = 'animated' },

	[71] = { label = 'Crosshair 71', image = './Images/Crosshairs/71.png', category = 'animated' },

	[72] = { label = 'Crosshair 72', image = './Images/Crosshairs/72.png', category = 'animated' },

	[73] = { label = 'Crosshair 73', image = './Images/Crosshairs/73.png', category = 'animated' },

	[74] = { label = 'Crosshair 74', image = './Images/Crosshairs/74.png', category = 'animated' },

	[75] = { label = 'Crosshair 75', image = './Images/Crosshairs/75.png', category = 'animated' },

	[76] = { label = 'Crosshair 76', image = './Images/Crosshairs/76.png', category = 'animated' },

	[77] = { label = 'Crosshair 77', image = './Images/Crosshairs/77.png', category = 'animated' },

	[78] = { label = 'Crosshair 78', image = './Images/Crosshairs/78.png', category = 'animated' },

	[79] = { label = 'Crosshair 79', image = './Images/Crosshairs/79.png', category = 'animated' },

	[80] = { label = 'Crosshair 80', image = './Images/Crosshairs/80.png', category = 'animated' },

	[81] = { label = 'Crosshair 81', image = './Images/Crosshairs/81.png', category = 'animated' },

	[82] = { label = 'Crosshair 82', image = './Images/Crosshairs/82.png', category = 'animated' },

	[83] = { label = 'Crosshair 83', image = './Images/Crosshairs/83.png', category = 'animated' },

	[84] = { label = 'Crosshair 84', image = './Images/Crosshairs/84.png', category = 'animated' },

	[85] = { label = 'Crosshair 85', image = './Images/Crosshairs/85.png', category = 'animated' },

	[86] = { label = 'Crosshair 86', image = './Images/Crosshairs/86.png', category = 'animated' },

	[87] = { label = 'Crosshair 87', image = './Images/Crosshairs/87.png', category = 'animated' },

	[88] = { label = 'Crosshair 88', image = './Images/Crosshairs/88.png', category = 'animated' },

	[89] = { label = 'Crosshair 89', image = './Images/Crosshairs/89.png', category = 'animated' },

	[90] = { label = 'Crosshair 90', image = './Images/Crosshairs/90.png', category = 'animated' },
}
--

-- Framework - Custom Notification System (No Framework Required)
al_crosshair_Main_Config.Framework = 'custom'

-- Framework Resource Name - Not needed for custom notifications
al_crosshair_Main_Config.FrameworkResourceName = 'none'

-- Simple Configuration Options
al_crosshair_Main_Config.SimpleConfig = {
    -- Enable/disable notifications
    showNotifications = true,
    
    -- Show help messages
    showHelp = true,
    
    -- Message style presets (set one to true)
    messageStyle = {
        default = true,    -- Original messages
        friendly = false,  -- Warm and encouraging
        minimal = false,   -- Short and simple
        gaming = false     -- Energetic style
    }
}

-- ========================================
-- SIMPLE CONFIGURATION GUIDE
-- ========================================
--[[
    HOW TO CUSTOMIZE MESSAGES:
    
    1. CHANGE MESSAGES:
       - Find any message in the 'Text' section above
       - Change the text between the quotes
       - Save and restart the resource
       
    2. USE STYLE PRESETS:
       - Set one style to true in SimpleConfig.messageStyle
       - Set others to false
       
    3. PLACEHOLDERS:
       - %d = numbers (like crosshair ID)
       - %s = strings (like settings values)
       
    4. EXAMPLES:
       Original: selected_crosshair = 'Crosshair %d has been selected and saved!'
       Custom:   selected_crosshair = 'You chose crosshair %d - nice pick!'
       
    5. TIPS:
       - Keep messages short and clear
       - Test changes in-game
       - Use %d for numbers, %s for text
--]]
--