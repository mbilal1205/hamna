"use client";

import { useEffect, useState } from "react";
import { TeddyBear, Heart } from "./ui";

type Item = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  type: "teddy" | "heart";
};

export default function FloatingBackground({ count = 14 }: { count?: number }) {
  // رینڈم آئٹمز کو ہینڈل کرنے کے لیے سٹیٹ کا استعمال
  const [items, setItems] = useState<Item[]>([]);

 useEffect(() => {
  // یہاں آئٹم کو واضح طور پر Item ٹائپ دی گئی ہے
  const generatedItems: Item[] = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 14 + Math.random() * 20,
    delay: Math.random() * 14,
    duration: 18 + Math.random() * 12,
    type: Math.random() > 0.55 ? "teddy" : "heart",
  }));
  
  setItems(generatedItems);
}, [count]);


  // جب تک سرور لوڈنگ مکمل کر کے کلائنٹ پر نہ آ جائے، خالی ڈیو دکھائیں
  if (items.length === 0) {
    return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <div
          key={it.id}
          className="absolute animate-rise"
          style={{
            left: `${it.left}%`,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
            opacity: 0.15,
          }}
        >
          {it.type === "teddy" ? (
            <TeddyBear size={it.size} sparkle={false} />
          ) : (
            <Heart size={it.size} color="#FF4D8D" />
          )}
        </div>
      ))}
    </div>
  );
}
