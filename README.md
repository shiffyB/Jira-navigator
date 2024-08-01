# Jira Ticket Manager Chrome Extension

## Overview

The **Jira Ticket Manager** Chrome extension allows users to quickly access Jira tickets by integrating with Jira's API. It provides functionalities to save recent tickets, navigate to specific tickets, and manage extension settings.

## Features

- **Access Jira Tickets:** Easily navigate to Jira tickets based on the provided settings.
- **Save Recent Tickets:** Keeps track of recently accessed tickets for quick access.
- **Manage Settings:** Configure Jira host, project, and user settings.
- **UI Updates:** View and manage recent tickets from the extension's popup.

## Installation

1. **Download the Extension:**

   - Clone this repository to your local machine:
     ```bash
     git clone https://github.com/yourusername/your-repo-name.git
     ```
   - Alternatively, download the repository as a ZIP file and extract it.

2. **Load the Extension into Chrome:**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the top-right corner.
   - Click the **Load unpacked** button.
   - Select the extracted folder or the folder where you cloned the repository.

3. **Verify the Installation:**

   - The extension should now appear in your Chrome toolbar.
   - Click the extension icon to open it and configure your settings.

4. **Update the Extension:**

   - If you make changes to the extension, you can reload it from the `chrome://extensions/` page by clicking the **Reload** button next to your extension.

   **Note:** If you download updates from the repository, repeat the loading process to update the extension.

   ## Usage

1. **Configure the Extension:**

   - Click on the extension icon in your Chrome toolbar.
   - The extension popup will open. Enter your Jira settings:
     - **Jira Host:** The base URL for your Jira instance (e.g., `https://jira.example.com`).
     - **Jira Project:** Your Jira project key (e.g., `PROJ`).
     - **Open New Tab:** Check this box if you want Jira tickets to open in a new tab. Uncheck to open in the current tab.
     - **User Name:** Your name or username to personalize the extension.

   - Click **Save Settings** to apply your changes.

2. **Using the Extension:**

   - After configuring, enter a Jira ticket ID (e.g., `PROJ-123`) into the input field.
   - Click **Go to [Your Jira Project]** or press `Enter` to navigate to the Jira ticket.
   - The extension will open the ticket in a new tab or the current tab based on your settings.

3. **View Recent Tickets:**

   - Recent tickets you’ve accessed will be listed in the popup.
   - Click on any recent ticket to quickly revisit it.

4. **Access Extension Settings:**

   - Click the settings icon to open the extension settings page.
   - Update your Jira settings as needed and save them.

**Note:** Ensure that you have configured the extension correctly to match your Jira instance and project settings. The extension requires access to your Jira URLs and project details to function properly.

## Code Overview

This Chrome extension provides a convenient way to navigate to Jira tickets and manage recent tickets. It consists of:

1. **`options.html`**: 
   - The settings page for configuring the Jira host, project key, user name, and whether to open tickets in a new tab.

2. **`options.js`**: 
   - JavaScript code for handling settings persistence and updating the UI based on user input. 
   - Retrieves and saves settings to Chrome's local storage and updates the UI accordingly.

3. **`popup.html`**: 
   - The popup interface for the extension, where users enter ticket IDs and view recent tickets.

4. **`popup.js`**: 
   - JavaScript code for handling ticket navigation and recent tickets management.
   - Uses Chrome's APIs to create or update tabs and manage recent ticket history.
  
- For any issues or questions, please open an issue on this GitHub repository or contact [7659951@gmail.com].



