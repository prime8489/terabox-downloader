import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes('terabox')) {
    return res.status(400).json({ error: 'Invalid Terabox URL' });
  }

  try {
    const response = await axios.get(`https://terabox-dl.vercel.app/api?link=${encodeURIComponent(url)}`);
    if (response.data && response.data.download_url) {
      res.status(200).json({
        file_name: response.data.name,
        size: response.data.size,
        download_link: response.data.download_url
      });
    } else {
      res.status(500).json({ error: 'Failed to get download link' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
}
