// const jwt = require('jsonwebtoken');
// const router = require('express').Router();
//
// function verify_token(req, res, next) {
//     const token = req.cookies.jwt;
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: Missing token' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = { _id: decoded._id, role: decoded.role };
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
// }
//
// router.get('/check_token', verify_token, (req, res) => {
//     res.json({ _id: req.user._id, role: req.user.role });
// });
//
// module.exports = router;

const jwt = require('jsonwebtoken');
const router = require('express').Router();

function verify_token(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({message: 'Unauthorized: Missing token'});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = {_id: decoded._id, role: decoded.role};
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: 'Unauthorized: Invalid token'});
    }
}

router.get('/check_token', verify_token, (req, res) => {
    res.json({_id: req.user._id, role: req.user.role});
});

// Handle POST request to /api/logout
router.post('/logout', async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send('Logout successful');
});


module.exports = router;

