let ticketInput = null;

let settings = {
  baseJiraHost: "",
  jiraProject: "",
  userName: "user",
  openTab: true
};

/**
 * Retrieves settings from Chrome's local storage and updates the `settings` object.
 * Resolves the promise when done.
 */
const getSettings = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['jiraHost', 'jiraProject', 'openNewTab', 'userName'], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      if (result.jiraHost) {
        settings.baseJiraHost = result.jiraHost;
      }
      if (result.jiraProject) {
        settings.jiraProject = result.jiraProject;
      }
      if (result.userName) {
        settings.userName = result.userName;
      }
      settings.openTab = result.openNewTab;
      resolve();
    });
  });
}

/**
 * Constructs a URL based on the settings and ticket input, then either creates
 * or updates a tab with that URL, and saves the ticket to recent tickets.
 */
const goToAxi = () => {
  const link = `${settings.baseJiraHost}/browse/${settings.jiraProject}-${ticketInput.value}`;

  const callback = () => {
    saveRecentTicket(ticketInput.value).then(displayRecentTickets);
  };

  if (settings.openTab) {
    chrome.tabs.create({ url: link }, callback);
  } else {
    chrome.tabs.update({ url: link }, callback);
  }
}

/**
 * Saves the provided ticket to recent tickets in Chrome's local storage,
 * keeping only the most recent 10 tickets.
 */
const saveRecentTicket = (ticket) => new Promise((resolve, reject) => {
  chrome.storage.local.get({ recentTickets: [] }, function (result) {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
      return;
    }
    const recentTickets = Array.isArray(result.recentTickets) ? result.recentTickets : [];
    recentTickets.unshift({ ticketId: ticket, project: settings.jiraProject });
    if (recentTickets.length > 10) {
      recentTickets.pop();
    }
    chrome.storage.local.set({ recentTickets: recentTickets }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
});

/**
 * Retrieves recent tickets from Chrome's local storage and displays them
 * in the `recentTickets` list element. Uses a document fragment for efficient
 * DOM manipulation.
 */
const displayRecentTickets = () => {
  chrome.storage.local.get({ recentTickets: [] }, function (result) {
    const recentTickets = Array.isArray(result.recentTickets) ? result.recentTickets : [];
    const recentList = document.getElementById('recentTickets');
    recentList.textContent = ''; // Clear existing content

    const fragment = document.createDocumentFragment();
    recentTickets.forEach(ticket => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = ''; // Set href if needed
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const url = `${settings.baseJiraHost}/browse/${ticket.project}-${ticket.ticketId}`;
        chrome.tabs.create({ url: url });
      });
      link.textContent = `${ticket.project}-${ticket.ticketId}`;
      listItem.appendChild(link);
      fragment.appendChild(listItem);
    });

    recentList.appendChild(fragment);
  });
}

/**
 * Updates the UI with settings and recent tickets. Sets up event listeners
 * for the send button, ticket input field, and settings button.
 */
const afterDataFetched = () => {
  const sendButton = document.getElementById('sendButton');
  if (sendButton) {
    sendButton.innerText = `Go to ${settings.jiraProject}`;
    sendButton.addEventListener('click', goToAxi);
  }

  const settingsBtn = document.getElementById('openSettings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());
  }

  const welcomeMessage = document.getElementById('welcomeMessage');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Hi, ${settings.userName}`;
  }

  const currentHostSetting = document.getElementById('currentHostSetting');
  if (currentHostSetting) {
    const link = document.createElement('a');
    link.href = settings.baseJiraHost;
    link.textContent = settings.baseJiraHost;
    link.target = "_blank";
    currentHostSetting.textContent = '';
    currentHostSetting.appendChild(link);
  }

  ticketInput = document.getElementById('axiLinkInput');
  if (ticketInput) {
    displayRecentTickets();
    ticketInput.focus();
    ticketInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        goToAxi();
      }
    });
  }
}

/**
 * When the DOM content is fully loaded, fetch settings and update the UI.
 * Logs an error if fetching settings fails.
 */
document.addEventListener('DOMContentLoaded', () => {
  getSettings().then(afterDataFetched).catch(error => {
    console.error('Error fetching settings:', error);
  });
});
