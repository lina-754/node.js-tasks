const logout = async (req, res) => {
try {
    if (req.session) {
    req.session.destroy(err => {
        if (err) {
        return res.status(500).json({ message: "Logout failed" });
        }
        return res.json({ message: "Logged out successfully" });
    });
    } else {
        return res.json({ message: "Logged out successfully" });
    }
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = { logout };
