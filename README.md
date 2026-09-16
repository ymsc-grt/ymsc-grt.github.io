# GRT@YMSC static website

This is a dependency-free, bilingual static website. It contains only ordinary HTML, CSS, JavaScript, and SVG files. There is no Jekyll, Ruby, package manager, database, or build step.

## Preview locally

Double-click `index.html`. The site works directly from the extracted folder.

For a more deployment-like preview, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. Stop the server with `Ctrl+C`.

## Publish on GitHub Pages

1. Create the repository `ymsc-grt/ymsc-grt.github.io`.
2. Upload the **contents** of this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/ (root)`.

No further configuration is needed.

## Updating the website with GitHub

Anyone who edits the repository must have write access to the `ymsc-grt` organization or to this repository. Ask an organization owner to add you if GitHub says you do not have permission to push.

### Recommended for beginners: GitHub Desktop

1. Install [GitHub Desktop](https://desktop.github.com/) and sign in to your GitHub account.
2. Choose **File → Clone repository**.
3. Select `ymsc-grt/ymsc-grt.github.io` from the list. If it is not listed, choose **URL** and enter:

   ```text
   https://github.com/ymsc-grt/ymsc-grt.github.io.git
   ```

4. Choose a local folder and click **Clone**. This creates a working copy on your computer. Do not edit files inside the downloaded ZIP after this point; edit the files in this cloned folder.
5. Before beginning any update, open GitHub Desktop, select this repository, and click **Fetch origin**, followed by **Pull origin** if that button appears. This downloads changes made by other members.
6. Edit the appropriate file in a plain-text editor such as Visual Studio Code or Notepad++. Save it without changing the filename or extension.
7. Preview the site locally and check both English and Chinese views. Instructions are in [Preview locally](#preview-locally).
8. Return to GitHub Desktop. The **Changes** tab shows exactly what you changed. Review the highlighted lines and make sure no unrelated files were changed.
9. In the lower-left corner, enter a short summary such as `Add October 23 seminar`, then click **Commit to main**. A commit is a saved, labelled version of your changes on your computer.
10. Click **Push origin** to send the commit to GitHub. Pushing is the step that actually updates the shared repository.
11. Wait one or two minutes, then check <https://ymsc-grt.github.io/>. GitHub Pages normally republishes the site automatically after a push.

If **Pull origin** reports a conflict, do not discard either version or force-push. Ask the other editor what they changed, resolve the conflicting lines together, preview again, and then commit the resolution.

### Command-line alternative

Install [Git](https://git-scm.com/), open a terminal, and clone the repository once:

```bash
git clone https://github.com/ymsc-grt/ymsc-grt.github.io.git
cd ymsc-grt.github.io
```

Before each editing session, update your copy:

```bash
git pull --ff-only
```

After editing and previewing, review and publish your changes:

```bash
git status
git diff
git add assets/js/seminars.js
git commit -m "Add October 23 seminar"
git push
```

Replace `assets/js/seminars.js` with the file or files you actually changed. Run `git status` again afterward; it should say that your working tree is clean. If `git pull --ff-only` or `git push` fails because someone else updated the repository, stop and pull their changes before trying again. Do not use `git push --force` on this website repository.

## Edit the site

- `index.html` contains the homepage and short upcoming schedule.
- `seminars.html` contains the complete schedule and abstracts.
- `about.html` contains the group description and organizers.
- `assets/css/style.css` controls appearance.
- `assets/js/language.js` controls the English/中文 selector.
- `assets/js/seminars.js` contains every seminar entry and generates both seminar lists.

Outside the seminar data, each English block is marked `data-lang-content="en"`; the matching Chinese block is marked `data-lang-content="zh"`. Update both versions when possible. Seminar entries are more forgiving: their Chinese fields may be omitted, as explained below.

## Add or remove a seminar

You only need to edit `assets/js/seminars.js`; the homepage and full schedule update from the same list.

To add a seminar, copy one complete entry inside the `seminars` list, including its opening `{` and closing `},`, and replace its contents. Each entry has short comments and uses ordinary quoted text. Keep these points in mind:

For example, an English-only entry is valid:

```js
{
  id: "2026-11-06-example-speaker",
  year: 2026, month: 11, day: 6,
  titleEn: "Example seminar title",
  speakerEn: "Example Speaker · Example University",
  abstractEn: "The English abstract goes here."
},
```

To add Chinese text later, add any available fields such as `titleZh`, `speakerZh`, and `abstractZh` to the same entry. It is not necessary to add empty Chinese fields.

- Give every entry a unique `id` using lowercase letters, numbers, and hyphens. The homepage uses this ID to link directly to the talk on the seminar page.
- Enter the date once as numbers, for example `year: 2026, month: 9, day: 18`. The script automatically produces `Friday, September 18, 2026`, `2026年9月18日，星期五`, and both month badges.
- Set `cancelled: true` for a week without a talk.
- Chinese fields are optional. If `titleZh`, `abstractZh`, `speakerZh`, or another Chinese field is blank or omitted, the corresponding English value is automatically shown in the Chinese view. Thus an English-only seminar remains complete and readable in both views.
- If `titleEn` is blank or omitted, the site displays `TBA`. If `abstractEn` is blank or omitted, it displays `TBA` on the full schedule.
- Missing speakers are omitted cleanly. Other missing fields use neutral placeholders instead of displaying `undefined`.

To remove a seminar, delete its complete `{ ... },` entry from `assets/js/seminars.js`. To change the order, move the complete entry up or down in the list.

### No-JavaScript fallback

If JavaScript is disabled or fails to load, the site still shows all ordinary page content and a bilingual text-only schedule on `seminars.html`. The nonfunctional language buttons are hidden automatically. The homepage provides a bilingual link to that fallback schedule.

The interactive schedules are maintained in `assets/js/seminars.js`. After changing them, also update the blocks inside `<noscript>...</noscript>` in `seminars.html` so visitors without JavaScript see the current schedule. This fallback is ordinary HTML and can be edited by copying or deleting a complete `<article class="seminar-item">...</article>` block.

The selector remembers the visitor's choice. A link ending in `?lang=zh` opens in Chinese, for example <https://ymsc-grt.github.io/seminars.html?lang=zh>.
