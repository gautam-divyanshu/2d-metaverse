import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface MapSpace {
  id: number;
  name: string;
  dimensions: string;
  ownerId?: number;
  isOwner: boolean;
  thumbnail?: string | null;
  owner?: string;
}

interface MapCardProps {
  map: MapSpace;
  onClick: (mapId: number, isOwner: boolean) => void;
}

export const MapCard: React.FC<MapCardProps> = ({ map, onClick }) => {
  return (
    <div
      className="group cursor-pointer"
      onClick={() => onClick(map.id, map.isOwner)}
    >
      {/* Map Thumbnail with 16:9 aspect ratio */}
      <div
        className="relative mb-3 overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group"
        style={{
          aspectRatio: '16 / 9',
          backgroundImage: `url('/assets/maps_thumbnails/map1.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          borderRadius: '16px',
        }}
      >
        {/* Hover overlay with enter icon */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 ease-out flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  d="M16 12H4M16 12L10.999 7M16 12L10.999 17.001M16 4H18C19.105 4 20 4.895 20 6V18C20 19.105 19.105 20 18 20H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* OWNER Badge */}
        {map.isOwner && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            👑 OWNER
          </div>
        )}
      </div>

      {/* Map Name with More Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 truncate flex-1">
          {map.name}
        </h3>
        <button
          className="p-1 hover:bg-gray-100 rounded transition-colors ml-2 flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            console.log('More options for', map.name);
          }}
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
};
