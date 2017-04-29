import storage from '../common/services/storage';
import userOptions from '../common/services/user-options';

// Save options to chrome.storage.sync.
function saveOptions(form) {
  const data = {
    targetLanguage: form.elements.targetLanguage.value,
    behavior: form.elements.behavior.value,
    ttsEnabled: form.elements.ttsEnabled.checked
  };

  userOptions.set(data).then(() => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

// Restore the form state using the preferences stored in the storage.
function restoreOptions(form) {
  userOptions.get().then(options => {
    form.elements.targetLanguage.value = options.targetLanguage;
    form.elements.behavior.value = options.behavior;
    form.elements.ttsEnabled.checked = options.ttsEnabled;
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('options-form');

  restoreOptions(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveOptions(form);
  });
});