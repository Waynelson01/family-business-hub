/**
 * Family Business Hub - Reminder System
 * This module handles sending reminders for data updates
 */

class ReminderSystem {
    constructor() {
        this.reminderSettings = this.loadSettings();
        this.familyMembers = this.loadFamilyMembers();
        this.dataItems = this.loadDataItems();
    }

    // Load settings from localStorage
    loadSettings() {
        const savedSettings = localStorage.getItem('reminderSettings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
        
        // Default settings
        return {
            weeklyReminders: true,
            overdueReminders: true,
            upcomingReminders: true,
            emailNotifications: true,
            appNotifications: true,
            reminderTime: '09:00', // 9 AM
            reminderDays: ['monday'] // Weekly on Monday
        };
    }

    // Load family members from localStorage
    loadFamilyMembers() {
        const savedMembers = localStorage.getItem('familyMembers');
        if (savedMembers) {
            return JSON.parse(savedMembers);
        }
        
        // Default family members
        return [
            { id: 1, name: 'John Smith', email: 'john@familybusiness.com', role: 'CEO', notifyUpdates: true },
            { id: 2, name: 'Sarah Smith', email: 'sarah@familybusiness.com', role: 'CFO', notifyUpdates: true },
            { id: 3, name: 'Mike Smith', email: 'mike@familybusiness.com', role: 'Operations', notifyUpdates: false },
            { id: 4, name: 'Lisa Johnson', email: 'lisa@familybusiness.com', role: 'Legal', notifyUpdates: true }
        ];
    }

    // Load data items from localStorage or use default
    loadDataItems() {
        const savedItems = localStorage.getItem('dataItems');
        if (savedItems) {
            return JSON.parse(savedItems);
        }
        
        // Return default data items if none saved
        return [];
    }

    // Save settings to localStorage
    saveSettings(settings) {
        this.reminderSettings = settings;
        localStorage.setItem('reminderSettings', JSON.stringify(settings));
    }

    // Check for items that need reminders
    checkForReminders() {
        const today = new Date();
        const overdueItems = [];
        const dueSoonItems = [];
        
        this.dataItems.forEach(item => {
            const lastUpdate = new Date(item.lastUpdated);
            const daysSinceUpdate = Math.floor((today - lastUpdate) / (1000 * 60 * 60 * 24));
            
            if (daysSinceUpdate > item.updateFrequency) {
                overdueItems.push(item);
            } else if (daysSinceUpdate > item.updateFrequency - 7) {
                dueSoonItems.push(item);
            }
        });

        return { overdueItems, dueSoonItems };
    }

    // Generate reminder content
    generateReminderContent(overdueItems, dueSoonItems) {
        let content = {
            subject: 'Family Business Hub - Data Update Reminder',
            html: '',
            text: ''
        };

        let html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #1f2937; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; color: #10b981;">Family Business Hub</h1>
                    <p style="margin: 10px 0 0 0; color: #d1d5db;">Data Update Reminder</p>
                </div>
                
                <div style="background-color: #f9fafb; padding: 20px;">
                    <p style="color: #374151; margin-bottom: 20px;">
                        Hello! This is your scheduled reminder to update business data in the Family Business Hub.
                    </p>
        `;

        let text = 'Family Business Hub - Data Update Reminder\n\n';
        text += 'Hello! This is your scheduled reminder to update business data.\n\n';

        if (overdueItems.length > 0) {
            html += `
                <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin-bottom: 20px;">
                    <h3 style="color: #dc2626; margin: 0 0 10px 0;">⚠️ OVERDUE ITEMS (${overdueItems.length})</h3>
                    <p style="color: #374151; margin-bottom: 10px;">These items require immediate attention:</p>
                    <ul style="color: #374151; margin: 0; padding-left: 20px;">
            `;
            
            text += `⚠️ OVERDUE ITEMS (${overdueItems.length}):\n`;
            
            overdueItems.forEach(item => {
                const daysSince = Math.floor((new Date() - new Date(item.lastUpdated)) / (1000 * 60 * 60 * 24));
                html += `<li><strong>${item.title}</strong> - ${daysSince} days overdue</li>`;
                text += `- ${item.title} - ${daysSince} days overdue\n`;
            });
            
            html += '</ul></div>';
            text += '\n';
        }

        if (dueSoonItems.length > 0) {
            html += `
                <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
                    <h3 style="color: #d97706; margin: 0 0 10px 0;">📅 DUE SOON (${dueSoonItems.length})</h3>
                    <p style="color: #374151; margin-bottom: 10px;">These items will be due within 7 days:</p>
                    <ul style="color: #374151; margin: 0; padding-left: 20px;">
            `;
            
            text += `📅 DUE SOON (${dueSoonItems.length}):\n`;
            
            dueSoonItems.forEach(item => {
                const daysSince = Math.floor((new Date() - new Date(item.lastUpdated)) / (1000 * 60 * 60 * 24));
                const daysUntilDue = item.updateFrequency - daysSince;
                html += `<li><strong>${item.title}</strong> - due in ${daysUntilDue} days</li>`;
                text += `- ${item.title} - due in ${daysUntilDue} days\n`;
            });
            
            html += '</ul></div>';
            text += '\n';
        }

        html += `
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="data-update.html" 
                           style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                            Update Data Now
                        </a>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                        You are receiving this because you are subscribed to Family Business Hub update reminders. 
                        You can manage your notification preferences in the Data Update Center.
                    </p>
                </div>
            </div>
        `;

        text += 'Update your data at: data-update.html\n\n';
        text += 'You can manage notification preferences in the Data Update Center.\n';

        content.html = html;
        content.text = text;
        
        return content;
    }

    // Send reminder emails (would integrate with email service)
    async sendEmailReminders(overdueItems, dueSoonItems) {
        const membersToNotify = this.familyMembers.filter(member => member.notifyUpdates);
        
        if (membersToNotify.length === 0) {
            console.log('No family members set to receive notifications');
            return;
        }

        const reminderContent = this.generateReminderContent(overdueItems, dueSoonItems);
        
        // In a real implementation, this would integrate with an email service like:
        // - SendGrid
        // - AWS SES
        // - Nodemailer with SMTP
        // - Emailjs for client-side sending
        
        for (const member of membersToNotify) {
            try {
                // Simulate email sending
                await this.simulateEmailSend(member.email, reminderContent);
                console.log(`Reminder sent to ${member.name} (${member.email})`);
            } catch (error) {
                console.error(`Failed to send reminder to ${member.name}:`, error);
            }
        }
    }

    // Simulate email sending (replace with actual email service)
    async simulateEmailSend(email, content) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() < 0.95) {
                    resolve({ status: 'sent', email });
                } else {
                    reject(new Error('Email service unavailable'));
                }
            }, 1000);
        });
    }

    // Show in-app notifications
    showInAppNotification(overdueItems, dueSoonItems) {
        if (!this.reminderSettings.appNotifications) return;

        const totalItems = overdueItems.length + dueSoonItems.length;
        
        if (totalItems === 0) return;

        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 bg-yellow-600 text-white p-4 rounded-lg shadow-lg max-w-sm';
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium">Data Update Reminder</h3>
                    <div class="mt-2 text-sm">
                        <p>${overdueItems.length} overdue, ${dueSoonItems.length} due soon</p>
                    </div>
                    <div class="mt-3">
                        <button onclick="window.location.href='data-update.html'" 
                                class="bg-white text-yellow-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                            Update Now
                        </button>
                        <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" 
                                class="ml-2 text-yellow-200 hover:text-white text-sm">
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    // Main function to check and send reminders
    async checkAndSendReminders() {
        const { overdueItems, dueSoonItems } = this.checkForReminders();
        
        if (overdueItems.length === 0 && dueSoonItems.length === 0) {
            console.log('All data is up to date - no reminders needed');
            return;
        }

        // Send email reminders if enabled
        if (this.reminderSettings.emailNotifications) {
            await this.sendEmailReminders(overdueItems, dueSoonItems);
        }

        // Show in-app notification if enabled
        if (this.reminderSettings.appNotifications) {
            this.showInAppNotification(overdueItems, dueSoonItems);
        }
    }

    // Schedule automatic reminders
    scheduleReminders() {
        // Check every hour for overdue items
        setInterval(() => {
            const { overdueItems } = this.checkForReminders();
            if (overdueItems.length > 0 && this.reminderSettings.overdueReminders) {
                this.showInAppNotification(overdueItems, []);
            }
        }, 60 * 60 * 1000); // 1 hour

        // Check for upcoming due items daily
        setInterval(() => {
            if (this.reminderSettings.upcomingReminders) {
                this.checkAndSendReminders();
            }
        }, 24 * 60 * 60 * 1000); // 24 hours
    }

    // Initialize the reminder system
    init() {
        this.scheduleReminders();
        
        // Check immediately on page load
        setTimeout(() => {
            this.checkAndSendReminders();
        }, 5000); // Wait 5 seconds after page load
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReminderSystem;
}

// Initialize globally if in browser
if (typeof window !== 'undefined') {
    window.ReminderSystem = ReminderSystem;
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.familyReminderSystem = new ReminderSystem();
            window.familyReminderSystem.init();
        });
    } else {
        window.familyReminderSystem = new ReminderSystem();
        window.familyReminderSystem.init();
    }
}