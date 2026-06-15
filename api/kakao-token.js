export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { code, redirect_uri } = req.query

  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'code와 redirect_uri가 필요합니다.' })
  }

  try {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams({
        grant_type:   'authorization_code',
        client_id:    process.env.KAKAO_REST_KEY,
        redirect_uri,
        code,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return res.status(400).json({ error: data.error_description || data.error })
    }

    return res.status(200).json({ access_token: data.access_token })
  } catch (err) {
    return res.status(500).json({ error: '토큰 교환 실패: ' + err.message })
  }
}
