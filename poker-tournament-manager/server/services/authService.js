const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db/init');

const JWT_SECRET = process.env.JWT_SECRET || 'poker-tournament-manager-secret-change-in-production';
const JWT_EXPIRES = '7d';

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function createToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function login(email, password) {
  const db = getDb();
  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if (!admin || !verifyPassword(password, admin.password_hash)) {
    return null;
  }
  const { password_hash, ...adminSafe } = admin;
  return { admin: adminSafe, token: createToken(admin) };
}

function ensureSeedAdmin() {
  const db = getDb();
  const existing = db.prepare('SELECT id FROM admins LIMIT 1').get();
  if (existing) return;

  const hash = hashPassword('admin123');
  db.prepare(`
    INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)
  `).run('admin@tournament.local', hash, 'Organizer');
  console.log('[Auth] Seed admin created: admin@tournament.local / admin123');
}

function middleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.admin = payload;
  next();
}

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
  login,
  ensureSeedAdmin,
  middleware,
  JWT_SECRET,
};
