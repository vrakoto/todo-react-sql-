const { sign, verify, decode } = require("jsonwebtoken");

module.exports = {
    forwardAccessWhileConnected(req, res, next) {
        const accessToken = req.cookies["access-token"];

        if (accessToken) {
            return res.status(403).send("Access forbidden while connected")
        }
        return next();
    },

    createTokens(user) {
        const accessToken = sign(
            { username: user.identifiant, mdp: user.mdp },
            "jwtsecretplschange"
        );

        return accessToken;
    },

    validateToken(req, res, next) {
        const accessToken = req.cookies["access-token"];
        
        if (!accessToken) {
            return res.status(401).send("Access forbidden")
        }
        
        try {
            const validToken = verify(accessToken, "jwtsecretplschange");
            if (validToken) {
                req.authenticated = true;
                return next();
            }
        } catch (err) {
            return res.status(401).json({ error: err });
        }
    },

    getAuthenticated(accessToken) {
        const decoded = decode(accessToken, "jwtsecretplschange")
        return decoded;
    }
}