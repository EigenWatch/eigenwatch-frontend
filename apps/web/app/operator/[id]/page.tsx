import OperatorStats from "@/components/operators/operator-stats";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";

export default function OperatorDetailPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#09090B]">
      <div className="max-w-7xl mx-auto">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
          <div className="w-20 h-20 rounded-2xl bg-white p-1 overflow-hidden shrink-0">
            <Image
              src="/images/rocket.png"
              alt="Rocket as pfp"
              width={500}
              height={500}
              className="w-full h-full bg-white object-contain rounded-xl"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-medium text-white mb-2">
              Eigen Yields
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#A1A1AA] mb-4">
              <div className="flex items-center gap-2">
                <span>Operator ID:</span>
                <span className="text-white">937263</span>
              </div>
              <span className="w-px h-3 bg-[#27272A]" />
              <div className="flex items-center gap-2">
                <span>Service:</span>
                <span className="text-white">EigenDA</span>
              </div>
              <span className="w-px h-3 bg-[#27272A]" />
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="text-white">Zurich, Switzerland</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-[#27272A] hover:bg-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors">
                <FaDiscord size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#27272A] hover:bg-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors">
                <FaTelegram size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#27272A] hover:bg-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors">
                <FaTwitter size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <OperatorStats />
      </div>
    </main>
  );
}
