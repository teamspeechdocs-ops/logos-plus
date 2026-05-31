# LOGOS+ — Setup Guide (for people who've never done this)

This walks you from the zip file to a working website, assuming **no prior
experience**. It takes about 20–30 minutes the first time. You do not need to
know how to code. You will copy, paste, and click.

You'll create two free accounts (GitHub and Netlify), and you never have to pay
anything for normal use.

---

## What you're building, in plain terms

- Your search site lives on **Netlify** (free hosting for websites).
- Netlify gets the website files from **GitHub** (a place that stores code).
- When you search, the site quietly asks the official openCaselist server for
  results, using *your* login token. The token stays in your browser.

You'll do this in three parts: **A)** put the files on GitHub, **B)** connect
Netlify to GitHub, **C)** get your token and search.

---

## Before you start

- The file `logos-plus.zip` (you already have it).
- **Unzip it.** You should end up with a folder called `logos-plus` that
  contains: a `public` folder, a `netlify` folder, `netlify.toml`, and some
  `.md` files. Keep this folder handy.

---

# PART A — Put the files on GitHub

### A1. Make a free GitHub account
1. Go to **https://github.com** and click **Sign up**.
2. Follow the prompts (email, password, username). Verify your email.

### A2. Create a new, empty repository ("repo" = a project folder online)
1. Once logged in, click the **+** in the top-right corner → **New repository**.
2. **Repository name:** type `logos-plus` (anything is fine).
3. Leave it set to **Public** (Private also works; Public is simplest).
4. Do **not** check "Add a README" — leave all those boxes unchecked.
5. Click **Create repository**.

### A3. Upload your files
You'll land on a page with setup instructions — ignore those. Instead:
1. Near the middle of that page, find and click the link
   **"uploading an existing file"** (it's in a sentence of options).
   - If you don't see it: go to your repo, click **Add file** →
     **Upload files**.
2. Open your unzipped `logos-plus` folder on your computer.
3. **Select everything *inside* it** (the `public` and `netlify` folders,
   `netlify.toml`, and the `.md` files) and **drag it all** into the upload
   box in your browser.
   - Important: drag the **contents**, not the outer `logos-plus` folder
     itself. The `netlify.toml` file must end up at the top level of the repo.
4. Wait for the files to finish uploading (you'll see them listed).
5. Scroll down, click the green **Commit changes** button.

Your code is now on GitHub. 

---

# PART B — Connect Netlify and publish the site

### B1. Make a free Netlify account
1. Go to **https://www.netlify.com** and click **Sign up**.
2. Choose **"Sign up with GitHub"** — this is the easiest, because it links
   the two automatically. Approve the permission prompt.

### B2. Import your project
1. In Netlify, click **Add new site** (sometimes **Add new project**) →
   **Import an existing project**.
2. Choose **GitHub** (often labeled "Deploy with GitHub").
3. If asked, **authorize** Netlify to see your repositories. You can allow all
   repos, or just pick `logos-plus`.
4. From the list, click your **logos-plus** repository.

### B3. Deploy
1. Netlify shows a "deploy settings" screen. **You don't need to change
   anything** — the included `netlify.toml` already fills in the correct
   settings (publish folder, functions folder).
   - If any field is blank and it asks, set **Publish directory** to `public`
     and **Functions directory** to `netlify/functions`. Usually it's
     automatic.
2. Click **Deploy** (or **Deploy site** / **Deploy logos-plus**).
3. Wait ~1 minute. When it finishes, Netlify shows a live web address near the
   top, something like `https://random-words-12345.netlify.app`.

### B4. (Optional) Give it a nicer name
1. **Site configuration → Change site name**, type something like
   `your-name-logos`, save. Your address becomes
   `https://your-name-logos.netlify.app`.

Click your site link — the dark green/gold LOGOS+ page should load. 

---

# PART C — Get your token and search

The site can load, but it needs **your** openCaselist token to actually fetch
results. The token is like a temporary key that proves you're logged in.

### C1. Find your token (do this in a desktop browser, e.g. Chrome)
1. In one tab, go to **https://opencaselist.com** and **log in** normally
   (with your Tabroom account).
2. With that tab open, press **F12** to open "Developer Tools."
   (Or right-click anywhere on the page → **Inspect**.)
3. Along the top of the panel that opens, find the tab named **Application**.
   - If you don't see it, click the **»** arrow to reveal hidden tabs.
4. On the **left side** of that panel, look for **Cookies**, click the little
   arrow to expand it, and click **https://opencaselist.com** underneath.
5. A table appears. Find the row whose **Name** is **`caselist_token`**.
6. Click that row, then **copy the entire value** in the **Value** column
   (it's a long string of letters/numbers). That's your token.

### C2. Paste it into your site
1. Go to your Netlify site (`https://...netlify.app`).
2. In the **caselist_token** box at the top, paste the value.
3. Click **Save**. The box border turns gold — that means it's stored
   (only in this browser tab; it's never sent to your website's files).

### C3. Search
1. Type a search term (e.g. a topic, author, or tag).
2. Make sure **HS Policy** and/or **College Policy** is checked.
3. Pick **up to 3 seasons** (the current season is pre-selected).
4. Click **Search**. Results appear below; each title links to the page on
   opencaselist.com.

That's it — you have a working search site.

---

# Keeping it working

- **The token expires.** If searches suddenly say "token may have expired,"
  just repeat **Part C1–C2** to grab a fresh token and Save it again. This is
  normal and happens periodically.
- **Your token is personal.** Don't share your site's address *together with*
  your token, and don't paste your token anywhere public. (The site is built so
  the token isn't saved into the public files — but treat the token itself like
  a password.)
- **Nothing to maintain yearly.** The season list rolls forward by date on its
  own; the new season shows up after the summer.

---

# If something goes wrong

**The page loads but searching does nothing / shows a proxy error.**
- Make sure you deployed through Netlify (the search needs Netlify's
  "function" to run). Opening the `index.html` file directly from your
  computer will **not** work — searching only works on the live Netlify site.

**"Missing token" even though I pasted it.**
- Click **Save** after pasting. If you closed the tab, the token clears by
  design — paste and Save again.

**A season returns no results.**
- That season's caselist may not be filled in yet (especially the newest one
  early in the year). Try a previous season.

**I edited a file and want to update the live site.**
- On GitHub, open the file, click the pencil ✏️ icon, make changes, click
  **Commit changes**. Netlify automatically rebuilds within a minute.

---

# A note on being a good citizen

openCaselist is run by volunteers for the debate community. This site is built
to be gentle on their server — it limits how many requests go out at once and
caps you to 3 seasons per search. Please don't try to remove those limits. The
person who gave you token access did so in good faith; staying light keeps that
access welcome for everyone.
