import { createContext, useState, useCallback, useEffect } from "react";

export const MyContext = createContext();

export function AppProvider({ children }) {
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BASE = import.meta.env.VITE_API_URL || "";

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  });

  const activeThread =
    threads.find((t) => t.threadId === activeThreadId) || null;

  useEffect(() => {
    fetchAllThreads();
  }, []);

  const fetchAllThreads = async () => {
    try {
      // ✅ stop if no token
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE}/api/thread`, {
        headers: getHeaders()
      });

      // ✅ token expired → clear state only, NO reload
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setThreads([]);
        return;
      }

      if (!res.ok) {
        console.error("Server error:", res.status);
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setThreads(data);
      }
    } catch (err) {
      console.error("Failed to fetch threads", err);
    }
  };

  const loadThread = useCallback(
    async (threadId) => {
      setActiveThreadId(threadId);
      const existing = threads.find((t) => t.threadId === threadId);
      if (existing?.messages?.length > 0) return;

      try {
        const res = await fetch(`${BASE}/api/thread/${threadId}`, {
          headers: getHeaders()
        });
        const messages = await res.json();
        setThreads((prev) =>
          prev.map((t) =>
            t.threadId === threadId ? { ...t, messages } : t
          )
        );
      } catch (err) {
        console.error("Failed to load thread messages", err);
      }
    },
    [threads]
  );

  const createNewThread = useCallback(() => {
    const id = crypto.randomUUID();
    const newThread = { threadId: id, title: "New Chat", messages: [] };
    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(id);
  }, []);

  const deleteThread = useCallback(async (threadId) => {
    try {
      await fetch(`${BASE}/api/thread/${threadId}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      setThreads((prev) => prev.filter((t) => t.threadId !== threadId));
      setActiveThreadId((prev) => (prev === threadId ? null : prev));
    } catch (err) {
      console.error("Failed to delete thread", err);
    }
  }, []);

  const sendMessage = useCallback(
    async (userText, mode = "Default") => {
      let threadId = activeThreadId;

      if (!threadId) {
        threadId = crypto.randomUUID();
        const newThread = {
          threadId,
          title: userText.slice(0, 35),
          messages: [],
        };
        setThreads((prev) => [newThread, ...prev]);
        setActiveThreadId(threadId);
      }

      const userMsg = {
        role: "user",
        content: userText,
        _id: Date.now().toString(),
      };

      setThreads((prev) =>
        prev.map((t) => {
          if (t.threadId !== threadId) return t;
          const updated = {
            ...t,
            messages: [...(t.messages || []), userMsg],
          };
          if (!t.messages?.length) updated.title = userText.slice(0, 35);
          return updated;
        })
      );

      setIsLoading(true);

      try {
        const res = await fetch(`${BASE}/api/chat`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            threadId,
            message: userText,
            mode,
          }),
        });

        // ✅ token expired → clear state only, NO reload
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setThreads([]);
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        const replyText = data.reply || "No response received.";

        const assistantMsg = {
          role: "assistant",
          content: replyText,
          _id: (Date.now() + 1).toString(),
          typing: true,
        };

        setThreads((prev) =>
          prev.map((t) =>
            t.threadId === threadId
              ? { ...t, messages: [...(t.messages || []), assistantMsg] }
              : t
          )
        );
      } catch (err) {
        console.error(err);
        const errMsg = {
          role: "assistant",
          content: "⚠️ Failed to connect to backend. Is the server running?",
          _id: (Date.now() + 1).toString(),
        };
        setThreads((prev) =>
          prev.map((t) =>
            t.threadId === threadId
              ? { ...t, messages: [...(t.messages || []), errMsg] }
              : t
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeThreadId]
  );

  const renameThread = useCallback(async (threadId, newTitle) => {
    try {
      const res = await fetch(`${BASE}/api/thread/${threadId}/rename`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await res.json();

      if (data.success) {
        setThreads((prev) =>
          prev.map((t) =>
            t.threadId === threadId ? { ...t, title: newTitle } : t
          )
        );
      }
    } catch (err) {
      console.error("Failed to rename thread", err);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        threads,
        activeThreadId,
        activeThread,
        isLoading,
        setActiveThreadId: loadThread,
        createNewThread,
        deleteThread,
        renameThread,
        sendMessage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}