# Push to GitHub

Your code is committed and ready to push. Follow these steps:

## Step 1: Create the repo on GitHub

1. Go to **https://github.com/new**
2. Repository name: `poker-mono-repo` (or any name you prefer)
3. Choose **Public** or **Private**
4. **Do NOT** add README, .gitignore, or license (we already have them)
5. Click **Create repository**

## Step 2: Push your code

Run this in Terminal (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd "/Users/avinash25/Desktop/PokerManagement system/poker-mono-repo-main"

git remote add origin https://github.com/YOUR_USERNAME/poker-mono-repo.git
git branch -M main
git push -u origin main
```

**If you use SSH instead:**
```bash
git remote add origin git@github.com:YOUR_USERNAME/poker-mono-repo.git
git push -u origin main
```

## Step 3: Invite collaborators

1. Go to your repo on GitHub
2. **Settings** → **Collaborators** → **Add people**
3. Enter their GitHub username or email

Done. Your team can clone with:
```bash
git clone https://github.com/YOUR_USERNAME/poker-mono-repo.git
```
