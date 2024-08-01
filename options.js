document.addEventListener('DOMContentLoaded', function () {
  // Load saved settings from chrome storage and populate the form fields
  chrome.storage.local.get(['jiraHost', 'jiraProject', 'openNewTab', 'userName'], function (result) {
    if (result.jiraHost) {
      document.getElementById('jiraHost').value = result.jiraHost;
    }
    if (result.jiraProject) {
      document.getElementById('jiraProject').value = result.jiraProject;
    }
    if (result.userName) {
      document.getElementById('userName').value = result.userName;
    }
    document.getElementById('openNewTab').checked = result.openNewTab;
  });

  // Save settings when the save button is clicked
  document.getElementById('saveButton').addEventListener('click', function () {
    const jiraHost = document.getElementById('jiraHost').value;
    const jiraProject = document.getElementById('jiraProject').value;
    const openNewTab = document.getElementById('openNewTab').checked;
    const userName = document.getElementById('userName').value;

    // Save settings to chrome storage
    chrome.storage.local.set({ jiraHost: jiraHost, jiraProject: jiraProject, userName: userName, openNewTab: openNewTab }, function () {
      // Show success notification
      showSuccessNotification();
    });
  });

  function showSuccessNotification() {
    // Show Bootstrap alert
    const alert = document.getElementById('successAlert');
    if (alert) {
      alert.classList.remove('d-none');
      setTimeout(() => alert.classList.add('d-none'), 3000); // Hide after 3 seconds
    }
  }
});
