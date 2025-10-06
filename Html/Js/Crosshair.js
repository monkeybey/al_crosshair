// Global variables
let currentSelectedCrosshair = 1;
let currentSettings = {
    size: 1.0,
    opacity: 1.0,
    showReticle: 'on', // 'on', 'aim', 'off'
    disableGtaReticle: true  // Default: GTA reticle disabled (button shows "OFF")
};
let originalSettings = {}; // Store original settings when menu opens
let originalSelectedCrosshair = 1; // Store original crosshair when menu opens
let allCrosshairs = [];
let currentFilter = 'all';
let favorites = []; // Array to store favorite crosshair IDs

// Load favorites from storage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('al_crosshair_favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

// Save favorites to storage
function saveFavorites() {
    localStorage.setItem('al_crosshair_favorites', JSON.stringify(favorites));
}

// Toggle favorite status
function toggleFavorite(crosshairId) {
    const index = favorites.indexOf(crosshairId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites!', 'info');
    } else {
        favorites.push(crosshairId);
        showNotification('Added to favorites!', 'success');
    }
    saveFavorites();
    updateCrosshairFavorites();
    filterCrosshairs($('#search-input').val().toLowerCase());
    
    // Add visual feedback
    const crosshairElement = $(`.crosshair[data-crosshair-id="${crosshairId}"]`);
    crosshairElement.addClass('favorite-toggle');
}

// Update favorite indicators
function updateCrosshairFavorites() {
    $('.crosshair').each(function() {
        const crosshairId = parseInt($(this).data('crosshair-id'));
        const isFavorite = favorites.includes(crosshairId);
        
        if (isFavorite) {
            $(this).addClass('favorite');
            if (!$(this).find('.favorite-icon').length) {
                $(this).append('<i class="fas fa-star favorite-icon"></i>');
            }
        } else {
            $(this).removeClass('favorite');
            $(this).find('.favorite-icon').remove();
        }
    });
}

// Initialize when document is ready
$(document).ready(function() {
    // Load saved crosshair on startup
    $.post('https://' + GetParentResourceName() + '/loadCrosshair', JSON.stringify({}));
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup search functionality
    setupSearch();
    
    // Setup customization controls
    setupCustomizationControls();
    
    // Setup filter tabs
    setupFilterTabs();

    // Setup info button
    setupInfoButton();

    // Setup scroll buttons
    setupScrollButtons();

    // Setup notification system
    setupNotificationSystem();

    // Load favorites on startup
    loadFavorites();
    updateCrosshairFavorites();

    // Note: Settings are now loaded when menu is opened (F9) instead of on startup
    // This ensures the menu always shows the most recently saved values
    
    // Also request current crosshair from server
    $.post('https://' + GetParentResourceName() + '/getCurrentCrosshair', JSON.stringify({}));
});

// Setup all event listeners
function setupEventListeners() {
    // Close button
    $('#btn-close').click(function() {
        // Revert to original settings if not saved
        revertToOriginalSettings();
        
        $('#wrap').hide();
        $.post('https://' + GetParentResourceName() + '/quit', JSON.stringify({}));
    });

    // Save button
    $('#btn-save').click(function() {
        applySettings();
        // Close menu instantly after saving
        $('#wrap').hide();
        $.post('https://' + GetParentResourceName() + '/quit', JSON.stringify({}));
    });

    // Reset button
    $('#btn-reset').click(function() {
        resetSettings();
    });

    // Escape key to close
    document.onkeyup = function(event) {
        if (event.key === 'Escape') {
            // Revert to original settings if not saved
            revertToOriginalSettings();
            
            $('#wrap').hide();
            $.post('https://' + GetParentResourceName() + '/quit', JSON.stringify({}));
        }
    };

    // Listen for NUI messages
    window.addEventListener('message', function(event) {
        const data = event.data;
        
        switch(data.curAction) {
            case 'open_menu_fast':
                // Instant menu opening - show immediately
                $('#wrap').show();
                
                // Load saved settings from server
                if (data.savedSettings) {
                    // Handle legacy boolean format and new string format
                    let showReticleMode = 'on';
                    if (data.savedSettings.showReticle === true) {
                        showReticleMode = 'on';
                    } else if (data.savedSettings.showReticle === false) {
                        showReticleMode = 'off';
                    } else if (typeof data.savedSettings.showReticle === 'string') {
                        showReticleMode = data.savedSettings.showReticle;
                    }
                    
                    currentSettings = {
                        size: data.savedSettings.size || 1.0,
                        opacity: data.savedSettings.opacity || 1.0,
                        showReticle: showReticleMode,
                        disableGtaReticle: data.savedSettings.disableGtaReticle !== undefined ? data.savedSettings.disableGtaReticle : true
                    };
                    
                    // Update UI with loaded settings
                    $('#size-slider').val(currentSettings.size);
                    $('#size-value').text(Math.round(currentSettings.size * 100) + '%');
                    $('#opacity-slider').val(currentSettings.opacity);
                    $('#opacity-value').text(Math.round(currentSettings.opacity * 100) + '%');
                    
                    // Update cycling button state
                    setReticleMode(currentSettings.showReticle);
                    
                    // GTA 5 Reticle is now disabled (Coming Soon)
                    $('#disable-gta-reticle-btn').removeClass('active').addClass('disabled coming-soon').find('.btn-text').text('Coming Soon');
                }
                
                // Update current crosshair if provided from server
                if (data.currentCrosshair) {
                    currentSelectedCrosshair = parseInt(data.currentCrosshair);
                }
                
                // Show loading state while crosshairs load
                showLoadingState();
                
                // Store original settings for potential revert (these are the saved settings)
                originalSettings = { ...currentSettings };
                originalSelectedCrosshair = currentSelectedCrosshair;
                
                // Update displays with saved settings
                updateLivePreview();
                updateCrosshairDisplay();
                break;
                
            case 'load_crosshairs_data':
                // Load crosshair data in background
                allCrosshairs = data.crosshairs;
                generateCrosshairs(allCrosshairs, true);
                hideLoadingState();
                break;
                
            case 'open_menu':
                // Fallback for compatibility
                $('#wrap').show();
                allCrosshairs = data.crosshairs;
                
                // Update current crosshair if provided from server
                if (data.currentCrosshair) {
                    currentSelectedCrosshair = parseInt(data.currentCrosshair);
                }
                
                generateCrosshairs(allCrosshairs, true);
                
                // Store original settings for potential revert
                originalSettings = { ...currentSettings };
                originalSelectedCrosshair = currentSelectedCrosshair;
                break;
                
            case 'load_crosshair':
                currentSelectedCrosshair = parseInt(data.crosshair_kvp);
                updateLivePreview();
                updateCrosshairDisplay();
                
                // Update the active crosshair in the grid
                $('.crosshair').removeClass('active');
                $(`.crosshair[data-crosshair-id="${currentSelectedCrosshair}"]`).addClass('active');
                break;
                
            case 'update_crosshair':
                currentSelectedCrosshair = parseInt(data.crosshair);
                updateCrosshairDisplay();
                
                // If the menu is open, also update the UI selection
                if ($('#wrap').is(':visible')) {
                    $('.crosshair').removeClass('active');
                    $(`.crosshair[data-crosshair-id="${currentSelectedCrosshair}"]`).addClass('active');
                    updateLivePreview();
                }
                break;
                
            case 'display_crosshair':
                // If GTA 5 reticle is enabled, always hide our custom crosshair
                if (!currentSettings.disableGtaReticle) {
                    $('#type').hide();
                    break;
                }
                
                // Handle three states: on, aim, off
                if (currentSettings.showReticle === 'on') {
                    // Always show the crosshair
                    $('#type').show();
                } else if (currentSettings.showReticle === 'aim') {
                    // Only show when aiming - respect the data.boolean value from Lua script
                    if (data.boolean) {
                        $('#type').show();
                    } else {
                        $('#type').hide();
                    }
                } else if (currentSettings.showReticle === 'off') {
                    // Never show the crosshair
                    $('#type').hide();
                }
                break;
                
            case 'disable':
                $('#wrap').hide();
                break;
                
            case 'revert_to_saved':
                // Revert to saved settings when F9 closes menu
                if (data.savedSettings) {
                    // Handle legacy boolean format and new string format
                    let showReticleMode = 'on';
                    if (data.savedSettings.showReticle === true) {
                        showReticleMode = 'on';
                    } else if (data.savedSettings.showReticle === false) {
                        showReticleMode = 'off';
                    } else if (typeof data.savedSettings.showReticle === 'string') {
                        showReticleMode = data.savedSettings.showReticle;
                    }
                    
                    currentSettings = {
                        size: data.savedSettings.size || 1.0,
                        opacity: data.savedSettings.opacity || 1.0,
                        showReticle: showReticleMode,
                        disableGtaReticle: data.savedSettings.disableGtaReticle !== undefined ? data.savedSettings.disableGtaReticle : true
                    };
                    
                    // Update original settings to saved values
                    originalSettings = { ...currentSettings };
                }
                
                if (data.currentCrosshair) {
                    currentSelectedCrosshair = parseInt(data.currentCrosshair);
                    originalSelectedCrosshair = currentSelectedCrosshair;
                }
                
                // Update displays with saved settings
                updateCrosshairDisplay();
                break;
                
        case 'show_notification':
            // Handle notifications from Lua
            showNotification(data.message, data.type);
            break;
        case 'notification_config':
            // Update notification config from Lua
            updateNotificationConfig(data.config);
            break;
        }
    });
}

// Setup search functionality
function setupSearch() {
    $('#search-input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        filterCrosshairs(searchTerm);
    });
}

// Cycle through reticle modes (on -> aim -> off -> on)
function cycleReticleMode() {
    const modes = ['on', 'aim', 'off'];
    const currentIndex = modes.indexOf(currentSettings.showReticle);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    setReticleMode(nextMode);
}

// Set reticle mode (on/aim/off)
function setReticleMode(mode) {
    // Update button appearance
    const button = $('#reticle-mode-btn');
    const buttonText = button.find('.btn-text');
    
    // Update button text and state
    if (mode === 'on') {
        buttonText.text('ON');
        button.addClass('active');
    } else if (mode === 'aim') {
        buttonText.text('AIM');
        button.addClass('active');
    } else if (mode === 'off') {
        buttonText.text('OFF');
        button.removeClass('active');
    }
    
    // Update settings
    currentSettings.showReticle = mode;
    
    // Update preview only - no auto-save
    updateCrosshairDisplay();
}

// Setup customization controls
function setupCustomizationControls() {
    // Size slider
    $('#size-slider').on('input', function() {
        const size = parseFloat($(this).val());
        currentSettings.size = size;
        $('#size-value').text(Math.round(size * 100) + '%');
        updateLivePreview();
        updateCrosshairDisplay();
        // Note: No auto-save - only update preview
    });

    // Opacity slider
    $('#opacity-slider').on('input', function() {
        const opacity = parseFloat($(this).val());
        currentSettings.opacity = opacity;
        $('#opacity-value').text(Math.round(opacity * 100) + '%');
        updateLivePreview();
        updateCrosshairDisplay();
        // Note: No auto-save - only update preview
    });

    // Single cycling reticle toggle button
    $('#reticle-mode-btn').click(function() {
        cycleReticleMode();
    });

    // GTA 5 reticle toggle button - DISABLED (Coming Soon)
    $('#disable-gta-reticle-btn').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Show coming soon notification
        showNotification('GTA 5 Reticle toggle coming soon!', 'info');
        
        // Add visual feedback for disabled state
        $(this).addClass('disabled-click');
        setTimeout(() => {
            $(this).removeClass('disabled-click');
        }, 200);
        
        return false;
    });
}

// Setup filter tabs
function setupFilterTabs() {
    $('.filter-tab').click(function() {
        $('.filter-tab').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        filterCrosshairs($('#search-input').val().toLowerCase());
    });
}

// Setup info button
function setupInfoButton() {
    $('.header-left i.fa-info-circle').click(function() {
        showInfoModal();
    });
}

// Setup scroll buttons
function setupScrollButtons() {
    $('#scroll-up').click(function() {
        scrollCrosshairs('up');
    });
    
    $('#scroll-down').click(function() {
        scrollCrosshairs('down');
    });
    
    // Also add keyboard support
    $(document).keydown(function(e) {
        if ($('#wrap').is(':visible')) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollCrosshairs('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollCrosshairs('down');
            }
        }
    });
    
    // Update scroll button states when scrolling
    $('#crosshair-scrollable').on('scroll', function() {
        updateScrollButtonStates();
    });
    
    // Initial state update
    updateScrollButtonStates();
}

// Setup notification system
function setupNotificationSystem() {
    // Initialize notification popup as hidden
    $('#notification-popup').removeClass('show');
}

// Update scroll button states
function updateScrollButtonStates() {
    const container = $('#crosshair-scrollable');
    const scrollTop = container.scrollTop();
    const scrollHeight = container[0].scrollHeight;
    const clientHeight = container[0].clientHeight;
    
    const upButton = $('#scroll-up');
    const downButton = $('#scroll-down');
    
    // Disable up button if at top
    if (scrollTop <= 0) {
        upButton.addClass('disabled');
    } else {
        upButton.removeClass('disabled');
    }
    
    // Disable down button if at bottom
    if (scrollTop >= scrollHeight - clientHeight - 5) { // 5px tolerance
        downButton.addClass('disabled');
    } else {
        downButton.removeClass('disabled');
    }
}

// Scroll crosshairs function
function scrollCrosshairs(direction) {
    const container = $('#crosshair-scrollable');
    const scrollAmount = 150; // pixels to scroll (adjusted for better UX)
    
    // Check if button is disabled
    const button = direction === 'up' ? $('#scroll-up') : $('#scroll-down');
    if (button.hasClass('disabled')) {
        return; // Don't scroll if button is disabled
    }
    
    // Add visual feedback to the button
    button.addClass('scrolling');
    
    if (direction === 'up') {
        container.scrollTop(container.scrollTop() - scrollAmount);
        button.removeClass('scrolling');
        updateScrollButtonStates();
    } else if (direction === 'down') {
        container.scrollTop(container.scrollTop() + scrollAmount);
        button.removeClass('scrolling');
        updateScrollButtonStates();
    }
}

// Filter crosshairs based on search and filter
function filterCrosshairs(searchTerm) {
    $('.crosshair').each(function() {
        const crosshairText = $(this).find('span').text().toLowerCase();
        const crosshairNumber = getCrosshairNumber(this);
        const crosshairId = parseInt($(this).data('crosshair-id'));
        
        let shouldShow = true;
        
        // Apply search filter
        if (searchTerm && !crosshairText.includes(searchTerm)) {
            shouldShow = false;
        }
        
        // Apply category filter
        if (currentFilter !== 'all') {
            if (currentFilter === 'favorites') {
                shouldShow = favorites.includes(crosshairId);
            } else if (currentFilter === 'white') {
                // White crosshairs are typically the first 30 (1-30)
                // These are usually simple, clean white designs
                if (crosshairNumber < 1 || crosshairNumber > 30) { 
                    shouldShow = false; 
                }
            } else if (currentFilter === 'colorful') {
                // Colorful crosshairs are typically 31-60
                // These have more colors and effects
                if (crosshairNumber < 31 || crosshairNumber > 60) { 
                    shouldShow = false; 
                }
            } else if (currentFilter === 'animated') {
                // Animated crosshairs are typically 61-90
                // These have animation effects
                if (crosshairNumber < 61 || crosshairNumber > 90) { 
                    shouldShow = false; 
                }
            }
        }
        
        if (shouldShow) { $(this).show(); } else { $(this).hide(); }
    });
}

// Update live preview
function updateLivePreview() {
    const crosshairImage = `./Images/Crosshairs/${currentSelectedCrosshair}.png`;
    const previewImg = $('#preview-crosshair img');
    const crosshairName = $('.crosshair-name');
    const crosshairSize = $('.crosshair-size');
    
    previewImg.attr('src', crosshairImage);
    crosshairName.text(`Crosshair ${String(currentSelectedCrosshair).padStart(3, '0')}`);
    crosshairSize.text(`Size: ${Math.round(currentSettings.size * 100)}%`);
}

// Update crosshair display with current settings
function updateCrosshairDisplay() {
    const crosshairImage = `./Images/Crosshairs/${currentSelectedCrosshair}.png`;
    const typeElement = $('#type');
    
    typeElement.attr('src', crosshairImage);
    typeElement.css({
        'transform': `translate(-50%, -50%) scale(${currentSettings.size})`,
        'opacity': currentSettings.opacity
    });
    
    // If GTA 5 reticle is enabled, hide our custom crosshair
    if (!currentSettings.disableGtaReticle) {
        typeElement.hide();
        return;
    }
    
    // Handle three states: on, aim, off
    if (currentSettings.showReticle === 'on') {
        // Always show the crosshair
        typeElement.show();
    } else if (currentSettings.showReticle === 'aim') {
        // Only show when aiming (controlled by the Lua script)
        // Don't change visibility here - let the Lua script control it based on aiming state
    } else if (currentSettings.showReticle === 'off') {
        // Never show the crosshair
        typeElement.hide();
    }
}

// Revert to original settings
function revertToOriginalSettings() {
    // Restore original settings
    currentSettings = { ...originalSettings };
    currentSelectedCrosshair = originalSelectedCrosshair;
    
    // Update UI to reflect original settings
    $('#size-slider').val(currentSettings.size);
    $('#size-value').text(Math.round(currentSettings.size * 100) + '%');
    $('#opacity-slider').val(currentSettings.opacity);
    $('#opacity-value').text(Math.round(currentSettings.opacity * 100) + '%');
    
    // Update cycling button state
    setReticleMode(currentSettings.showReticle);
    
    // GTA 5 Reticle is now disabled (Coming Soon)
    $('#disable-gta-reticle-btn').removeClass('active').addClass('disabled coming-soon').find('.btn-text').text('Coming Soon');
    
    // Update crosshair selection
    $('.crosshair').removeClass('active');
    $(`.crosshair[data-crosshair-id="${currentSelectedCrosshair}"]`).addClass('active');
    
    // Update displays
    updateLivePreview();
    updateCrosshairDisplay();
    
    // Notify server to revert crosshair display
    $.post('https://' + GetParentResourceName() + '/selectCrosshair', JSON.stringify({
        crosshair: currentSelectedCrosshair
    }));
}

// Apply settings
function applySettings() {
    // Save settings to server
    $.post('https://' + GetParentResourceName() + '/applySettings', JSON.stringify({
        crosshair: currentSelectedCrosshair,
        settings: currentSettings
    }), function(response) {
        if (response === 'ok') {
            // Update original settings to current state (new baseline)
            originalSettings = { ...currentSettings };
            originalSelectedCrosshair = currentSelectedCrosshair;
            
            // Update display
            updateCrosshairDisplay();
            
            // Show success message
            showNotification('Settings applied successfully!', 'success');
        } else {
            showNotification('Failed to save settings!', 'error');
        }
    });
}

// Reset settings
function resetSettings() {
    currentSettings = {
        size: 1.7,  // 170%
        opacity: 1.0,
        showReticle: 'on',
        disableGtaReticle: true
    };
    
    // Update UI
    $('#size-slider').val(1.7);
    $('#size-value').text('170%');
    $('#opacity-slider').val(1.0);
    $('#opacity-value').text('100%');
    setReticleMode('on');
    $('#disable-gta-reticle-btn').removeClass('active').addClass('disabled coming-soon').find('.btn-text').text('Coming Soon');
    
    // Select crosshair 001
    currentSelectedCrosshair = 1;
    $('.crosshair').removeClass('active');
    $('.crosshair').first().addClass('active');
    
    updateLivePreview();
    updateCrosshairDisplay();
    
    showNotification('Settings reset to default!', 'info');
}

// Single Notification System
let notificationConfig = {
    enabled: true,
    debounceEnabled: true,
    debounceTime: 2000,
    maxQueueSize: 10,
    showIcons: true,
    animationDuration: 300,
    stackNotifications: false, // Only show one at a time
    types: {
        success: { icon: 'check', color: '#10b981', duration: 3000 },
        error: { icon: 'times', color: '#ef4444', duration: 4000 },
        warning: { icon: 'exclamation-triangle', color: '#f59e0b', duration: 3500 },
        info: { icon: 'info-circle', color: '#3b82f6', duration: 3000 }
    },
    debugMode: false
};
let notificationDebounce = {
    lastNotifications: new Map(),
    debounceTime: 2000,
    maxQueueSize: 10
};
let notificationQueue = [];
let isShowingNotification = false;

// Update notification config from Lua
function updateNotificationConfig(config) {
    notificationConfig = { ...notificationConfig, ...config };
    notificationDebounce.debounceTime = config.debounceTime || 2000;
    notificationDebounce.maxQueueSize = config.maxQueueSize || 5;
    
    if (config.debugMode) {
        console.log('[al_crosshair] Notification config updated:', config);
    }
}

// Single Notification System
function showNotification(message, type) {
    // Check if notifications are enabled
    if (!notificationConfig.enabled) {
        return;
    }
    
    // Check debounce first (if enabled)
    if (notificationConfig.debounceEnabled && !checkNotificationDebounce(message, type)) {
        if (notificationConfig.debugMode) {
            console.log('[al_crosshair] Notification debounced:', message);
        }
        return; // Ignore duplicate notification
    }
    
    // If already showing a notification and not stacking, add to queue
    if (isShowingNotification && !notificationConfig.stackNotifications) {
        // Prevent infinite queuing
        if (notificationQueue.length >= notificationConfig.maxQueueSize) {
            if (notificationConfig.debugMode) {
                console.log('[al_crosshair] Notification queue full, ignoring:', message);
            }
            return;
        }
        
        // Add to queue
        const typeConfig = notificationConfig.types[type] || notificationConfig.types.info;
        notificationQueue.push({
            message: message,
            type: type,
            duration: typeConfig.duration,
            timestamp: Date.now()
        });
        
        if (notificationConfig.debugMode) {
            console.log('[al_crosshair] Notification queued:', message, '(queue size:', notificationQueue.length + ')');
        }
        return;
    }
    
    // Show notification immediately
    displayNotification(message, type);
}

// Check if notification should be debounced (prevent spam)
function checkNotificationDebounce(message, type) {
    const now = Date.now();
    const messageKey = message + "_" + (type || 'info');
    
    // Check if this exact message was shown recently
    if (notificationDebounce.lastNotifications.has(messageKey)) {
        const timeSinceLast = now - notificationDebounce.lastNotifications.get(messageKey);
        if (timeSinceLast < notificationDebounce.debounceTime) {
            // Still within debounce period, ignore
            return false;
        }
    }
    
    // Update last notification time for this message
    notificationDebounce.lastNotifications.set(messageKey, now);
    
    // Clean up old entries to prevent memory leaks
    cleanupNotificationDebounce();
    
    return true;
}

// Clean up old debounce entries to prevent memory leaks
function cleanupNotificationDebounce() {
    const now = Date.now();
    const cleanupTime = notificationDebounce.debounceTime * 2; // Keep entries for 2x debounce time
    
    for (const [messageKey, timestamp] of notificationDebounce.lastNotifications.entries()) {
        if ((now - timestamp) > cleanupTime) {
            notificationDebounce.lastNotifications.delete(messageKey);
        }
    }
}

// Display single notification
function displayNotification(message, type) {
    const typeConfig = notificationConfig.types[type] || notificationConfig.types.info;
    
    // Clear any existing notifications
    $('#notification-list').empty();
    
    // Create notification element
    const notificationElement = $(`
        <div class="notification-item ${type}" data-timestamp="${Date.now()}">
            <i class="fas fa-${typeConfig.icon} notification-icon"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" title="Dismiss">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `);
    
    // Add to notification list
    $('#notification-list').append(notificationElement);
    
    // Show notification popup
    $('#notification-popup').addClass('show');
    
    // Set showing flag
    isShowingNotification = true;
    
    // Auto-remove after duration
    setTimeout(() => {
        removeNotification(notificationElement);
    }, typeConfig.duration);
    
    // Add close functionality
    notificationElement.find('.notification-close').click(function() {
        removeNotification(notificationElement);
    });
    
    // Notify Lua that notification was shown
    $.post('https://al_crosshair/notificationDismissed', JSON.stringify({}));
    
    if (notificationConfig.debugMode) {
        console.log('[al_crosshair] Notification displayed:', message, type);
    }
}

// Remove notification with animation
function removeNotification(element) {
    element.addClass('removing');
    setTimeout(() => {
        element.remove();
        isShowingNotification = false;
        
        // Hide notification popup
        $('#notification-popup').removeClass('show');
        
        // Process next notification in queue after a short delay
        setTimeout(() => {
            processNextNotification();
        }, 500);
    }, 300);
}

// Process next notification in queue
function processNextNotification() {
    if (notificationQueue.length > 0 && !isShowingNotification) {
        const nextNotification = notificationQueue.shift();
        if (nextNotification) {
            displayNotification(nextNotification.message, nextNotification.type);
        }
    }
}


// Clear all notifications
function clearAllNotifications() {
    // Clear the queue
    notificationQueue = [];
    
    // Remove current notification
    $('#notification-list').empty();
    $('#notification-popup').removeClass('show');
    
    // Reset showing flag
    isShowingNotification = false;
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        'success': 'check',
        'error': 'times',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Show info modal
function showInfoModal() {
    // Remove existing modal
    $('.info-modal').remove();
    
    const modal = $(`
        <div class="info-modal">
            <div class="info-modal-content">
                <div class="info-modal-header">
                    <h3><i class="fas fa-info-circle"></i> Quick Info</h3>
                    <button class="info-modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="info-modal-body">
                    <div class="info-section">
                        <h4><i class="fas fa-star"></i> Favorites</h4>
                        <p>Right-click crosshairs to favorite them</p>
                    </div>
                    <div class="info-section">
                        <h4><i class="fas fa-filter"></i> Categories</h4>
                        <ul>
                            <li><strong>White:</strong> Simple (1-30)</li>
                            <li><strong>Colorful:</strong> Vibrant (31-60)</li>
                            <li><strong>Animated:</strong> Dynamic (61-90)</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h4><i class="fas fa-cog"></i> Settings</h4>
                        <ul>
                            <li><strong>Size:</strong> 50%-300%</li>
                            <li><strong>Opacity:</strong> 10%-100%</li>
                            <li><strong>Show:</strong> Always or when aiming</li>
                            <li><strong>GTA 5:</strong> Custom or default</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Add close functionality
    modal.find('.info-modal-close').click(function() {
        modal.remove();
    });
    
    // Close on outside click
    modal.click(function(e) {
        if (e.target === this) {
            modal.remove();
        }
    });
    
    // Close on escape key
    $(document).one('keyup', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
    
    $('#crosshair-menu').append(modal);
    
    // Show modal
    modal.addClass('show');
}

// Generate crosshairs
function generateCrosshairs(crosshairs, isInitialLoad) {
    const container = document.getElementById('crosshair-scrollable');
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Pre-create all crosshair elements
    const crosshairElements = [];
    for (let i = 1; i <= 90; i++) {
        const crosshairElement = document.createElement('div');
        crosshairElement.className = 'crosshair';
        crosshairElement.setAttribute('data-crosshair-id', i);
        crosshairElement.innerHTML = `
            <img src="./Images/Crosshairs/${i}.png" alt="Crosshair ${i}" loading="lazy">
            <span>Crosshair ${String(i).padStart(3, '0')}</span>
        `;
        
        // Left click to select
        crosshairElement.addEventListener('click', function() {
            $('.crosshair').removeClass('active');
            $(this).addClass('active');
            
            currentSelectedCrosshair = i;
            updateLivePreview();
            updateCrosshairDisplay();
            
            // Note: No auto-save - only update preview
        });
        
        // Right click for instant favorite toggle
        crosshairElement.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            toggleFavorite(i);
        });
        
        crosshairElements.push(crosshairElement);
    }
    
    // Append all elements at once for better performance
    crosshairElements.forEach(element => fragment.appendChild(element));
    container.innerHTML = '';
    container.appendChild(fragment);
    
    if (isInitialLoad) {
        // Don't override the current selected crosshair - it should already be set from saved data
        // Just update the UI to reflect the current selection
        $('.crosshair').removeClass('active');
        const activeCrosshair = $(`.crosshair[data-crosshair-id="${currentSelectedCrosshair}"]`);
        if (activeCrosshair.length > 0) {
            activeCrosshair.addClass('active');
        } else {
            // Fallback to first crosshair if the selected one doesn't exist
            $('.crosshair').first().addClass('active');
            currentSelectedCrosshair = 1;
        }
        updateLivePreview();
    }
    
    updateCrosshairFavorites();
}

// Show context menu
function showContextMenu(e, crosshairId) {
    const isFavorite = favorites.includes(crosshairId);
    const menuItems = [
        {
            text: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
            icon: isFavorite ? 'fas fa-star' : 'far fa-star',
            action: () => toggleFavorite(crosshairId)
        },
        {
            text: 'Select Crosshair',
            icon: 'fas fa-check',
            action: () => {
                $('.crosshair').removeClass('active');
                $(`.crosshair[data-crosshair-id="${crosshairId}"]`).addClass('active');
                currentSelectedCrosshair = crosshairId;
                updateLivePreview();
                updateCrosshairDisplay();
            }
        }
    ];
    
    // Remove existing context menu
    $('.context-menu').remove();
    
    // Create context menu
    const contextMenu = $('<div class="context-menu"></div>');
    menuItems.forEach(item => {
        const menuItem = $(`
            <div class="context-menu-item">
                <i class="${item.icon}"></i>
                <span>${item.text}</span>
            </div>
        `);
        menuItem.click(item.action);
        contextMenu.append(menuItem);
    });
    
    // Position and show context menu
    contextMenu.css({
        position: 'fixed',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        zIndex: 10000
    });
    
    $('body').append(contextMenu);
    
    // Hide context menu when clicking outside
    $(document).one('click', function() {
        $('.context-menu').remove();
    });
}

// Get crosshair number from element
function getCrosshairNumber(element) {
    const span = element.querySelector('span');
    const match = span.textContent.match(/\d+/);
    return match ? parseInt(match[0]) : null;
}

// Hide crosshair function
function HideCross() {
    $('#type').hide();
}

// Load saved settings
function loadSettings() {
    $.post('https://' + GetParentResourceName() + '/getSettings', JSON.stringify({}), function(settings) {
        if (settings) {
            // Handle legacy boolean format and new string format
            let showReticleMode = 'on';
            if (settings.showReticle === true) {
                showReticleMode = 'on';
            } else if (settings.showReticle === false) {
                showReticleMode = 'off';
            } else if (typeof settings.showReticle === 'string') {
                showReticleMode = settings.showReticle;
            }
            
            currentSettings = {
                size: settings.size || 1.0,
                opacity: settings.opacity || 1.0,
                showReticle: showReticleMode,
                disableGtaReticle: settings.disableGtaReticle !== undefined ? settings.disableGtaReticle : true
            };
            
            // Initialize original settings to current settings
            originalSettings = { ...currentSettings };
            originalSelectedCrosshair = currentSelectedCrosshair;
            
            // Update UI with loaded settings
            $('#size-slider').val(currentSettings.size);
            $('#size-value').text(Math.round(currentSettings.size * 100) + '%');
            $('#opacity-slider').val(currentSettings.opacity);
            $('#opacity-value').text(Math.round(currentSettings.opacity * 100) + '%');
            
            // Update cycling button state
            setReticleMode(currentSettings.showReticle);
            
            // GTA 5 Reticle is now disabled (Coming Soon)
            $('#disable-gta-reticle-btn').removeClass('active').addClass('disabled coming-soon').find('.btn-text').text('Coming Soon');
            
            updateLivePreview();
            updateCrosshairDisplay();
        }
    });
}


// Show loading state
function showLoadingState() {
    // Remove existing loading state
    $('.loading-overlay').remove();
    
    const loadingOverlay = $(`
        <div class="loading-overlay">
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading crosshairs...</span>
            </div>
        </div>
    `);
    
    $('#crosshair-menu').append(loadingOverlay);
}

// Hide loading state
function hideLoadingState() {
    $('.loading-overlay').fadeOut(200, function() {
        $(this).remove();
    });
}

// Add loading overlay styles
const loadingStyles = `
<style>
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border-radius: 8px;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: #fff;
    font-size: 14px;
}

.loading-spinner i {
    font-size: 24px;
    color: #4c1d95;
}

.loading-spinner span {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
}
</style>
`;

// Add styles to head
$('head').append(loadingStyles);

// Test function for notifications (can be called from console for testing)
function testNotifications() {
    console.log('Testing notifications with anti-spam...');
    
    // Test rapid fire notifications to demonstrate anti-spam
    for (let i = 1; i <= 10; i++) {
        showNotification(`Test notification ${i}`, 'info');
    }
    
    console.log('Notice how only 3 notifications show at once, and they appear with 500ms cooldown');
}

// Test function for spam prevention
function testSpamPrevention() {
    console.log('Testing spam prevention...');
    
    // Try to spam notifications
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            showNotification(`Spam test ${i + 1}`, 'warning');
        }, i * 50); // Try to send every 50ms
    }
    
    console.log('Notice how notifications are queued and shown with proper spacing');
}

// Test function for integrated notifications
function testIntegratedNotifications() {
    console.log('Testing integrated notification system...');
    
    // Test different notification types
    showNotification('Settings applied successfully!', 'success');
    setTimeout(() => showNotification('Crosshair 001 has been selected and saved!', 'info'), 500);
    setTimeout(() => showNotification('Invalid crosshair ID provided', 'error'), 1000);
    setTimeout(() => showNotification('This is a warning message', 'warning'), 1500);
    
    console.log('Check the notification section in the crosshair menu');
}

// Make test functions available globally
window.testNotifications = testNotifications;
window.testSpamPrevention = testSpamPrevention;
window.testIntegratedNotifications = testIntegratedNotifications;