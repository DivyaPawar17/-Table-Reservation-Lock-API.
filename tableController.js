// controllers/tableController.js
const lockStore = require('../lockStore');

const lockTable = (req, res) => {
  const { tableId, userId, duration } = req.body;

  if (!tableId || !userId || !duration) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const existingLock = lockStore[tableId];
  const now = Date.now();

  if (existingLock && existingLock.expiry > now) {
    return res.status(409).json({
      success: false,
      message: 'Table is currently locked by another user.'
    });
  }

  lockStore[tableId] = {
    userId,
    expiry: now + duration * 1000
  };

  return res.status(200).json({
    success: true,
    message: 'Table locked successfully.'
  });
};

const unlockTable = (req, res) => {
  const { tableId, userId } = req.body;

  if (!tableId || !userId) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const currentLock = lockStore[tableId];

  if (currentLock && currentLock.userId === userId) {
    delete lockStore[tableId];
    return res.status(200).json({ success: true, message: 'Table unlocked successfully.' });
  }

  return res.status(403).json({
    success: false,
    message: 'You do not own the lock or it does not exist.'
  });
};

const getTableStatus = (req, res) => {
  const { tableId } = req.params;
  const currentLock = lockStore[tableId];
  const now = Date.now();

  if (currentLock && currentLock.expiry > now) {
    return res.status(200).json({ isLocked: true });
  }

  return res.status(200).json({ isLocked: false });
};

module.exports = {
  lockTable,
  unlockTable,
  getTableStatus
};
