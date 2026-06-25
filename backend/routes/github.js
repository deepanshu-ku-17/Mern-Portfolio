import express from 'express'

const router = express.Router()
const GITHUB_USERNAME = 'deepanshu-ku-17'

// GET /api/github — proxies GitHub API to avoid rate limiting
router.get('/', async (req, res) => {
  try {
    const headers = { 'Accept': 'application/vnd.github.v3+json' }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`, { headers }),
    ])

    const user = await userRes.json()
    const repos = await reposRes.json()

    res.json({ user, repos: Array.isArray(repos) ? repos : [] })
  } catch (err) {
    console.error('GitHub fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch GitHub data' })
  }
})

export default router
