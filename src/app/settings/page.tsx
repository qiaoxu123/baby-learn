"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFamilyId, setFamilyId } from "@/lib/progress";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  const [pin, setPin] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyId, setLocalFamilyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalFamilyId(getFamilyId());
  }, []);

  const handleCreate = async () => {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setMessage("请输入4位数字 PIN");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: familyName || "My Family", pin }),
      });
      const data = await res.json();
      if (data.family) {
        setFamilyId(data.family.id);
        setLocalFamilyId(data.family.id);
        setMessage("创建成功! 进度将自动保存到服务器");
      }
    } catch {
      setMessage("创建失败，请检查网络");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (pin.length !== 4) {
      setMessage("请输入4位数字 PIN");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/family?pin=${pin}`);
      const data = await res.json();
      if (data.family) {
        setFamilyId(data.family.id);
        setLocalFamilyId(data.family.id);
        setMessage(`欢迎回来, ${data.family.name}!`);
      } else {
        setMessage("未找到该 PIN 对应的家庭");
      }
    } catch {
      setMessage("登录失败，请检查网络");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 select-none">
      <BackButton />

      <motion.div
        className="bg-white rounded-3xl p-8 shadow-xl max-w-sm w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          👨‍👩‍👧 家长设置
        </h1>

        {familyId && (
          <div className="mb-4 p-3 bg-green-50 rounded-xl text-center">
            <div className="text-green-600 text-sm">已登录</div>
            <div className="text-xs text-gray-400 mt-1">ID: {familyId}</div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">家庭名称</label>
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="例如: 宝宝的家"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">4位数字 PIN</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="1234"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              className="flex-1 py-3 bg-pink-400 text-white rounded-xl font-medium disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
              onClick={handleCreate}
              disabled={loading}
            >
              新建家庭
            </motion.button>
            <motion.button
              className="flex-1 py-3 bg-purple-400 text-white rounded-xl font-medium disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              disabled={loading}
            >
              已有 PIN 登录
            </motion.button>
          </div>

          {message && (
            <motion.div
              className="text-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message}
            </motion.div>
          )}
        </div>

        <div className="mt-6 text-xs text-gray-400 text-center">
          <p>创建家庭后，学习进度将自动保存到服务器。</p>
          <p className="mt-1">在其他设备使用相同 PIN 即可同步进度。</p>
        </div>
      </motion.div>
    </main>
  );
}
