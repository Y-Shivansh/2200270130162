import Url from '../model/Url.js';
import nanoid from '../utils/generateCode.js';

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) return res.status(400).json({ error: 'URL is required' });

    let code = shortcode || nanoid();
    const existing = await Url.findOne({ shortcode: code });
    if (existing) return res.status(409).json({ error: 'Shortcode already exists' });

    const expiry = new Date(Date.now() + validity * 60000);

    const newUrl = new Url({
      originalUrl: url,
      shortcode: code,
      expiry,
    });

    await newUrl.save();

    res.status(201).json({
      shortLink: `${process.env.BASE_URL}/${code}`,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) return res.status(404).json({ error: 'Short URL not found' });

    if (urlDoc.expiry < new Date()) {
      return res.status(410).json({ error: 'Short URL expired' });
    }

    urlDoc.clicks += 1;
    urlDoc.clickLogs.push({
      timestamp: new Date(),
      referrer: req.get('Referrer') || 'Direct',
      location: 'Unknown',
    });

    await urlDoc.save();
    res.redirect(urlDoc.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) return res.status(404).json({ error: 'Short URL not found' });

    res.status(200).json({
      originalUrl: urlDoc.originalUrl,
      clicks: urlDoc.clicks,
      createdAt: urlDoc.createdAt,
      expiry: urlDoc.expiry,
      clickLogs: urlDoc.clickLogs,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
