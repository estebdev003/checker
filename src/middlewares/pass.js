module.exports = { 
    /**
     * Middleware to check if the secret is correct
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    pass (req, res, next) {
        const secretPass = String(process.env.PASSPORT_SECRET);
        if(secretPass && secretPass !== String(req.body.secret)) {
            res.status(401).send({ error: 'Unauthorized'});
            return;
        }
        next();
    }
}