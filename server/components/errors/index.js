let errors = {
    '404': (req, res) => {
        let viewFilePath = '404',
            statusCode = 404,
            result = {
                status: statusCode
            };

        res.status(result.status);
        res.render(viewFilePath, (err) => {
            if (err) {
                return res.json(result, result.status);
            }
            res.render(viewFilePath);
        });
    }
};

export {errors as default};
