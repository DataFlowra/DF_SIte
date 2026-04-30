"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Loader2, MapPin } from "lucide-react";
import { api } from "@/lib/api-client";

export default function GlobalMap() {
  const [mapData, setMapData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMap() {
      try {
        const response = await api.post("/api/maps/pin", {
          address: "633 W 5th St, Los Angeles, CA 90071, USA", // HQ
          zoom: 12,
          width: "100%",
          height: "100%"
        });

        if (response.status === "success") {
          setMapData(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch map data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMap();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
        
        {/* Info Side */}
        <div className="flex-1 text-center lg:text-left">
          <div className="w-16 h-16 rounded-2xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo mx-auto lg:mx-0 mb-6 border border-flow-indigo/20 shadow-glow-sm">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-4 text-white">Global Distribution Network</h2>
          <p className="text-data-slate font-medium mb-8 leading-relaxed">
            Your data mesh is currently spanning across 6 continents with redundant fiber links. 
            Visualizing primary ingest node location.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
             {["San Francisco", "London", "Tokyo", "Sydney", "Singapore", "New York"].map((city, i) => (
               <div key={city} className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'bg-insight-teal/10 border-insight-teal/20 text-insight-teal' : 'glass-subtle border-white/5 text-data-slate'}`}>
                 {city} {i === 0 ? "• Primary" : "• Active"}
               </div>
             ))}
          </div>
        </div>

        {/* Map Side */}
        <div className="flex-1 w-full h-[400px] rounded-[2rem] border border-white/10 overflow-hidden relative group">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <Loader2 className="w-8 h-8 text-flow-indigo animate-spin mb-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-data-slate">Acquiring Sat-Link...</span>
            </div>
          ) : mapData ? (
            <>
              <div 
                className="w-full h-full filter grayscale brightness-75 invert-[0.8] contrast-125 dark:invert dark:brightness-50 transition-all duration-700 pointer-events-none group-hover:pointer-events-auto group-hover:filter-none"
                dangerouslySetInnerHTML={{ __html: mapData.iframe }}
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 pointer-events-none">
                <MapPin className="w-3 h-3 text-red-500" />
                <span className="text-[8px] font-mono text-white/80 tracking-widest uppercase">HQ: {mapData.address.split(',')[0]}</span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-data-slate text-sm">
              Map data unavailable
            </div>
          )}
        </div>
      </div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    </motion.div>
  );
}
