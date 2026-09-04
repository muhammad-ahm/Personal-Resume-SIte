# Responsive Testing Checklist

Chrome/Edge mein site kholein → Right-click → Inspect → Toggle Device Toolbar (Ctrl+Shift+M).
Har width pe ye check karein:

## Widths to Test
- [ ] **280px** (Galaxy Fold, smallest common device)
- [ ] **320px** (iPhone SE)
- [ ] **375px** (iPhone 12/13/14)
- [ ] **414px** (iPhone Plus models)
- [ ] **600px** (small tablets, phones landscape)
- [ ] **768px** (iPad portrait)
- [ ] **900px** (breakpoint boundary — check layout switches cleanly here)
- [ ] **1024px** (iPad landscape / small laptop)
- [ ] **1440px** (standard laptop)
- [ ] **1920px** (large desktop)

## What to Look For at Each Width
- [ ] No horizontal scrollbar appears
- [ ] Text doesn't overflow its container or get cut off
- [ ] Buttons/links are easily tappable (not too close together)
- [ ] Images load and maintain proportion (not stretched/squished)
- [ ] Nav bar doesn't wrap awkwardly or overlap content
- [ ] Contact form fields are usable and readable
- [ ] Dark mode toggle works and looks correct at every width

## Orientation
- [ ] Rotate a phone-sized viewport to landscape — check header/hero don't take up the whole screen height

## Real Devices (if available)
- [ ] Test on an actual iPhone and an actual Android phone if possible — emulators are close but not 100% identical to real rendering/touch behavior

## Browsers
- [ ] Chrome
- [ ] Safari (especially if targeting iOS clients — Safari handles flexbox/some CSS slightly differently)
- [ ] Firefox

