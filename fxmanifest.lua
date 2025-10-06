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

fx_version 'cerulean'
game 'gta5'

author 'DevAL - ALKiS'
description 'Advanced Crosshair System for FiveM'
version '1.0.0'

-- Client Scripts
client_scripts {
    'Config/Main.lua',
    'Client/Main.lua'
}

-- UI Files
ui_page 'Html/Crosshair.html'

files {
    'Html/Crosshair.html',
    'Html/Css/Crosshair.css',
    'Html/Js/Crosshair.js',
    'Html/Images/Crosshairs/*.png',
    'Html/Webfonts/*.ttf'
}


-- Resource Information
lua54 'yes'
