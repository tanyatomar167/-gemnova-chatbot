import express from "express";
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// ── GET all threads — only THIS user's threads ──────────────────
router.get("/thread", verifyToken, async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.userId })
      .sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// ── GET single thread messages — only if it belongs to user ─────
router.get("/thread/:threadId", verifyToken, async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({
      threadId,
      userId: req.userId   // ✅ must belong to this user
    });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// ── DELETE thread — only if it belongs to user ──────────────────
router.delete("/thread/:threadId", verifyToken, async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({
      threadId,
      userId: req.userId   // ✅ must belong to this user
    });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

// ── POST chat — send message ────────────────────────────────────
router.post("/chat", verifyToken, async (req, res) => {
  const { threadId, message, mode } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message too long" });
  }

  try {
    let thread = await Thread.findOne({
      threadId,
      userId: req.userId   // ✅ must belong to this user
    });

    if (!thread) {
      // create new thread with userId attached
      thread = new Thread({
        threadId,
        userId: req.userId,  // ✅ save who owns this thread
        title: message.slice(0, 35),
        messages: [{ role: "user", content: message }]
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getGeminiAPIResponse(message, mode);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;