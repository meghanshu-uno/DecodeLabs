const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'client', 'js', 'script.js');
let content = fs.readFileSync(scriptPath, 'utf8');

// 1. Add API_BASE_URL and make TRACKS_DATA a let
content = content.replace(
  /const TRACKS_DATA = \[[\s\S]*?\];/m,
  `const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.myprod.com';\n  let TRACKS_DATA = [];`
);

// 2. Modify handleFormSubmit
const formSubmitRegex = /function handleFormSubmit\(e\) \{([\s\S]*?)const submitText = DOM\.submitBtn\.querySelector\('\.submit-text'\);\n\s*const spinner = DOM\.submitBtn\.querySelector\('\.spinner'\);\n\s*if \(submitText\) submitText\.textContent = 'Processing Application\.\.\.';\n\s*if \(spinner\) spinner\.hidden = false;\n\s*DOM\.submitBtn\.disabled = true;\n\s*setTimeout\(\(\) => \{([\s\S]*?)\}, 1000\);\n\s*\}/m;

content = content.replace(formSubmitRegex, (match, before, after) => {
  return `function handleFormSubmit(e) {${before}const submitText = DOM.submitBtn.querySelector('.submit-text');
    const spinner = DOM.submitBtn.querySelector('.spinner');
    if (submitText) submitText.textContent = 'Processing Application...';
    if (spinner) spinner.hidden = false;
    DOM.submitBtn.disabled = true;

    fetch(\`\${API_BASE_URL}/api/v1/consultations\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameVal, email: emailVal, message: DOM.messageTextarea.value })
    })
    .then(res => res.json())
    .then(data => {
      if (submitText) submitText.textContent = 'Submit Application Request';
      if (spinner) spinner.hidden = true;
      DOM.submitBtn.disabled = false;
      DOM.consultationForm.reset();
      if (DOM.messageCharCount) DOM.messageCharCount.textContent = '0 / 250';
      showToast(\`Thank you, \${nameVal}! Your syllabus request and consultation have been scheduled.\`, 'success');
    })
    .catch(err => {
      if (submitText) submitText.textContent = 'Submit Application Request';
      if (spinner) spinner.hidden = true;
      DOM.submitBtn.disabled = false;
      showToast('There was an error submitting your request.', 'error');
    });
  }`;
});

// 3. Modify init() to fetch tracks
const initRegex = /function init\(\) \{([\s\S]*?)\}/m;
content = content.replace(initRegex, `async function init() {$1}`);
content = content.replace(
  /updateBookmarkBadges\(\);/g,
  `try {
      const res = await fetch(\`\${API_BASE_URL}/api/v1/tracks\`);
      const data = await res.json();
      if (data.status === 'success') {
        TRACKS_DATA = data.data.tracks;
      }
    } catch (e) {
      console.error(e);
    }
    updateBookmarkBadges();`
);

// 4. Modify Bookmark handling
const toggleBookmarkRegex = /function toggleTrackBookmark\(trackId\) \{([\s\S]*?)\}/m;
content = content.replace(toggleBookmarkRegex, `async function toggleTrackBookmark(trackId) {
    try {
      const res = await fetch(\`\${API_BASE_URL}/api/v1/bookmarks\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId })
      });
      const data = await res.json();
      
      const isBookmarked = data.data.bookmarked;
      
      if (isBookmarked) {
        if (!state.savedTrackIds.includes(trackId)) state.savedTrackIds.push(trackId);
        showToast('Track saved to your bookmarks', 'success');
      } else {
        state.savedTrackIds = state.savedTrackIds.filter(id => id !== trackId);
        showToast('Track removed from bookmarks', 'info');
      }
      
      localStorage.setItem('nexora_saved_tracks', JSON.stringify(state.savedTrackIds));
      updateBookmarkBadges();
      renderTracks();
      if (state.activeModal === DOM.trackModal) {
        updateModalBookmarkBtn(trackId);
      }
    } catch (err) {
      showToast('Error toggling bookmark', 'error');
    }
  }`);

// 5. Fetch bookmarks initially
content = content.replace(
  /try \{\s*const res = await fetch\(`\$\{API_BASE_URL\}\/api\/v1\/tracks`\);/,
  `try {
      const bookRes = await fetch(\`\${API_BASE_URL}/api/v1/bookmarks\`);
      const bookData = await bookRes.json();
      if (bookData.status === 'success') {
        state.savedTrackIds = bookData.data.bookmarks.map(b => b.track.trackId);
        localStorage.setItem('nexora_saved_tracks', JSON.stringify(state.savedTrackIds));
      }
    } catch(e) {}
    try {
      const res = await fetch(\`\${API_BASE_URL}/api/v1/tracks\`);`
);

fs.writeFileSync(scriptPath, content, 'utf8');
console.log('script.js patched successfully!');
