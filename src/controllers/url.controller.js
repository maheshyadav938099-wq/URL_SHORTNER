import shortid from "shortid";
import URL from "../models/url.model.js";

const shorturl = async (req, res) => {

    const { redirectURL } = req.body;
    console.log(req.body);

    if (!redirectURL) {
        return res.status(400).json({
            message: "URL is required"
        });
    }

    const shortId = shortid.generate();

    const newUrl = await URL.create({
        sorturlid: shortId,
        redirectURL: redirectURL
    });

    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const host = req.get("host") || "localhost:3000";
    const fullShortUrl = `${protocol}://${host}/${shortId}`;

    return res.status(201).json({
        message: `New url is ${fullShortUrl}`,
        shortUrl: fullShortUrl,
        shortId
    });
};


const redirecting = async (req, res, next) => {
    try {
        const shortId = req.params.shortId;

        const entry = await URL.findOne({ sorturlid: shortId });

        if (!entry) {
            return res.redirect("/");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        if (typeof next === "function") {
            return next(error);
        }
        return res.status(500).json({ message: "Server error" });
    }
};

export { shorturl, redirecting };