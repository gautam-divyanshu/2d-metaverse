import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ArrowLeft, Users, Plus, Trash2 } from 'lucide-react';

interface MapElement {
  id: number;
  elementId: number;
  x: number;
  y: number;
  element: {
    id: number;
    imageUrl: string;
    width: number;
    height: number;
    isStatic: boolean;
  };
}

interface Element {
  id: number;
  imageUrl: string;
  width: number;
  height: number;
  isStatic: boolean;
}

interface Space {
  id: number;
  name: string;
  width: number;
  height: number;
  dimensions: string;
}

interface SpaceElement {
  id: number;
  elementId: number;
  x: number;
  y: number;
  element: {
    id: number;
    imageUrl: string;
    width: number;
    height: number;
    isStatic: boolean;
  };
}

interface MapSpace {
  id: number;
  spaceId: number;
  spaceName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  elements: SpaceElement[];
}

interface MapData {
  id: number;
  name: string;
  width: number;
  height: number;
  ownerId: number;
  elements: MapElement[];
  mapSpaces: MapSpace[];
}

const CELL_SIZE = 32;

export const MapEditorPage = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [map, setMap] = useState<MapData | null>(null);
  const [availableElements, setAvailableElements] = useState<Element[]>([]);
  const [availableSpaces, setAvailableSpaces] = useState<Space[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'elements' | 'spaces'>('elements');
  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);

  useEffect(() => {
    fetchMapData();
    fetchAvailableElements();
    fetchAvailableSpaces();
  }, [mapId]);

  useEffect(() => {
    if (map) {
      drawCanvas();
    }
  }, [map, selectedElement, selectedSpace, mousePosition]);

  const fetchMapData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/maps/map/${mapId}/edit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMap(data);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch map:', response.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch map:', error);
      setIsLoading(false);
    }
  };

  const fetchAvailableElements = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/maps/elements',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvailableElements(data.elements);
      } else {
        console.error('Failed to fetch elements');
      }
    } catch (error) {
      console.error('Failed to fetch elements:', error);
    }
  };

  const fetchAvailableSpaces = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/space/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSpaces(data.spaces || []);
      } else {
        console.error('Failed to fetch spaces');
      }
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
    }
  };

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!map) {
      console.log('No map loaded');
      return;
    }

    // Canvas click coordinates (for element/space placement)
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Note: Delete functionality moved to sidebar for better UX

    // Handle element placement
    if (selectedElement) {
      await handlePlaceElement(e);
    }
    // Handle space portal placement (represented as a special element)
    else if (selectedSpace) {
      await handlePlaceMapSpace(e);
    }
  };

  const handlePlaceElement = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!map || !selectedElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const container = canvas.parentElement;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    const rawX = e.clientX - rect.left + scrollLeft;
    const rawY = e.clientY - rect.top + scrollTop;

    let x = Math.floor(rawX / CELL_SIZE);
    let y = Math.floor(rawY / CELL_SIZE);

    // Center the element around the click point
    x = x - Math.floor(selectedElement.width / 2);
    y = y - Math.floor(selectedElement.height / 2);

    // Validate bounds
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + selectedElement.width > map.width)
      x = map.width - selectedElement.width;
    if (y + selectedElement.height > map.height)
      y = map.height - selectedElement.height;

    // Check for overlaps
    const wouldOverlap = map.elements.some((existingElement) => {
      const existingEndX = existingElement.x + existingElement.element.width;
      const existingEndY = existingElement.y + existingElement.element.height;
      const newEndX = x + selectedElement.width;
      const newEndY = y + selectedElement.height;

      return !(
        x >= existingEndX ||
        newEndX <= existingElement.x ||
        y >= existingEndY ||
        newEndY <= existingElement.y
      );
    });

    if (wouldOverlap) {
      alert('Cannot place element: would overlap with existing element');
      return;
    }

    // Add element to map
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/map/${mapId}/element`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            elementId: selectedElement.id.toString(),
            x,
            y,
          }),
        }
      );

      if (response.ok) {
        console.log('Element placed successfully');
        fetchMapData();
        setSelectedElement(null);
      } else {
        console.error('Failed to place element');
        const errorData = await response.text();
        alert(`Failed to place element: ${errorData}`);
      }
    } catch (error) {
      console.error('Failed to add element:', error);
      alert('Network error while placing element');
    }
  };

  const handlePlaceMapSpace = async (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {
    // For now, we'll represent space portals as special 2x2 elements
    // In the future, you could create special "portal" elements in the database
    if (!map || !selectedSpace) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const container = canvas.parentElement;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    const rawX = e.clientX - rect.left + scrollLeft;
    const rawY = e.clientY - rect.top + scrollTop;

    let x = Math.floor(rawX / CELL_SIZE);
    let y = Math.floor(rawY / CELL_SIZE);

    // Use actual space dimensions
    const spaceWidth = selectedSpace.width;
    const spaceHeight = selectedSpace.height;

    // Center the space around the click point
    x = x - Math.floor(spaceWidth / 2);
    y = y - Math.floor(spaceHeight / 2);

    // Validate bounds
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + spaceWidth > map.width) x = map.width - spaceWidth;
    if (y + spaceHeight > map.height) y = map.height - spaceHeight;

    // Create the space portal
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/map/${mapId}/space`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            spaceId: selectedSpace.id.toString(),
            x: x,
            y: y,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = 'Failed to place map space';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // If response is not JSON, use status text
          errorMessage = `${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Refresh map data to show the new space
      fetchMapData();
      setSelectedSpace(null);
    } catch (error) {
      console.error('Error placing map space:', error);
      alert(
        `Failed to place map space: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const handleDeleteElement = async (elementId: number) => {
    if (!confirm('Are you sure you want to delete this element?')) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/map/${mapId}/element`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: elementId.toString() }),
        }
      );

      if (response.ok) {
        console.log('Element deleted successfully');
        fetchMapData();
      } else {
        console.error('Failed to delete element');
      }
    } catch (error) {
      console.error('Failed to delete element:', error);
    }
  };

  const handleDeleteMapSpace = async (mapSpaceId: number) => {
    if (!confirm('Are you sure you want to remove this space from the map?'))
      return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/map/${mapId}/space`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: mapSpaceId.toString() }),
        }
      );

      if (response.ok) {
        console.log('Space removed from map successfully');
        fetchMapData();
      } else {
        console.error('Failed to remove space from map');
      }
    } catch (error) {
      console.error('Failed to remove space from map:', error);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedElement && !selectedSpace) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const container = canvas.parentElement;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    const rawX = e.clientX - rect.left + scrollLeft;
    const rawY = e.clientY - rect.top + scrollTop;

    const gridX = Math.floor(rawX / CELL_SIZE);
    const gridY = Math.floor(rawY / CELL_SIZE);

    setMousePosition({ x: gridX, y: gridY });
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !map) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2a3e';
    ctx.lineWidth = 1;
    for (let x = 0; x <= map.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, map.height * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= map.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(map.width * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw existing elements
    map.elements.forEach((element) => {
      const elemX = element.x * CELL_SIZE;
      const elemY = element.y * CELL_SIZE;
      const elemWidth = element.element.width * CELL_SIZE;
      const elemHeight = element.element.height * CELL_SIZE;

      // Use lighter red colors and rounded corners
      ctx.fillStyle = '#fca5a5';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;

      // Draw rounded rectangle for elements
      const cornerRadius = 8;
      ctx.beginPath();
      ctx.roundRect(elemX, elemY, elemWidth, elemHeight, cornerRadius);
      ctx.fill();
      ctx.stroke();

      // Add text label showing element ID
      ctx.fillStyle = '#7f1d1d';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = elemX + elemWidth / 2;
      const centerY = elemY + elemHeight / 2;

      ctx.fillText(`E${element.element.id}`, centerX, centerY);

      // Delete functionality available in sidebar
    });

    // Draw existing map spaces (walkable areas)
    map.mapSpaces?.forEach((mapSpace) => {
      const spaceX = mapSpace.x * CELL_SIZE;
      const spaceY = mapSpace.y * CELL_SIZE;
      const spaceWidth = mapSpace.width * CELL_SIZE;
      const spaceHeight = mapSpace.height * CELL_SIZE;

      // Use green colors for walkable spaces
      ctx.fillStyle = '#86efac';
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 2;

      // Draw rounded rectangle for spaces
      const cornerRadius = 8;
      ctx.beginPath();
      ctx.roundRect(spaceX, spaceY, spaceWidth, spaceHeight, cornerRadius);
      ctx.fill();
      ctx.stroke();

      // Add text label showing space name
      ctx.fillStyle = '#15803d';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = spaceX + spaceWidth / 2;
      const centerY = spaceY + spaceHeight / 2;

      ctx.fillText(
        mapSpace.spaceName.length > 8
          ? mapSpace.spaceName.slice(0, 8) + '...'
          : mapSpace.spaceName,
        centerX,
        centerY
      );

      // Delete functionality available in sidebar
    });

    // Draw space elements (elements inside each space)
    map.mapSpaces?.forEach((mapSpace) => {
      mapSpace.elements?.forEach((spaceElement) => {
        // Calculate absolute position: space position + element position within space
        const elemX = (mapSpace.x + spaceElement.x) * CELL_SIZE;
        const elemY = (mapSpace.y + spaceElement.y) * CELL_SIZE;
        const elemWidth = spaceElement.element.width * CELL_SIZE;
        const elemHeight = spaceElement.element.height * CELL_SIZE;

        // Use blue colors for space elements to distinguish from map elements
        ctx.fillStyle = '#93c5fd';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;

        // Draw rounded rectangle for space elements
        const cornerRadius = 8;
        ctx.beginPath();
        ctx.roundRect(elemX, elemY, elemWidth, elemHeight, cornerRadius);
        ctx.fill();
        ctx.stroke();

        // Add text label showing element ID (SE{elementId})
        ctx.fillStyle = '#1e40af';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = elemX + elemWidth / 2;
        const centerY = elemY + elemHeight / 2;

        ctx.fillText(`SE${spaceElement.element.id}`, centerX, centerY);
      });
    });

    // Draw preview of selected element at mouse position
    if ((selectedElement || selectedSpace) && mousePosition) {
      let previewWidth, previewHeight, previewColor, previewText;

      if (selectedElement) {
        previewWidth = selectedElement.width;
        previewHeight = selectedElement.height;
        previewColor = 'rgba(252, 165, 165, 0.6)'; // Semi-transparent light red
        previewText = `E${selectedElement.id}`;
      } else if (selectedSpace) {
        previewWidth = selectedSpace.width;
        previewHeight = selectedSpace.height;
        previewColor = 'rgba(134, 239, 172, 0.6)'; // Semi-transparent green
        previewText = 'Space';
      } else {
        return;
      }

      const previewX =
        (mousePosition.x - Math.floor(previewWidth / 2)) * CELL_SIZE;
      const previewY =
        (mousePosition.y - Math.floor(previewHeight / 2)) * CELL_SIZE;
      const previewPixelWidth = previewWidth * CELL_SIZE;
      const previewPixelHeight = previewHeight * CELL_SIZE;

      ctx.fillStyle = previewColor;
      ctx.strokeStyle = selectedSpace ? '#3b82f6' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      ctx.beginPath();
      ctx.roundRect(
        previewX,
        previewY,
        previewPixelWidth,
        previewPixelHeight,
        8
      );
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      // Preview text
      ctx.fillStyle = selectedSpace ? '#1e40af' : '#7f1d1d';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        previewText,
        previewX + previewPixelWidth / 2,
        previewY + previewPixelHeight / 2
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!map) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Map Not Found</h1>
            <p className="mb-4">
              The requested map could not be loaded or you don't have permission
              to edit it.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="inline mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-slate-400 hover:text-white mb-2 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">
              Edit Map: {map.name}
            </h1>
            <p className="text-slate-400">
              Size: {map.width}x{map.height} • Add elements and space portals
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/map/${map.id}`)}
              variant="secondary"
            >
              Preview Map
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sticky top-4">
              {/* Tab Navigation */}
              <div className="flex gap-1 mb-4 bg-slate-700 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('elements')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'elements'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Elements
                </button>
                <button
                  onClick={() => setActiveTab('spaces')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'spaces'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Spaces
                </button>
              </div>

              {/* Elements Tab */}
              {activeTab === 'elements' && (
                <>
                  <h3 className="text-white font-semibold mb-3">
                    Available Elements
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Click an element to select, then click on the map to place
                    it
                  </p>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableElements.map((element) => (
                      <div
                        key={element.id}
                        onClick={() => {
                          setSelectedElement(element);
                          setSelectedSpace(null);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedElement?.id === element.id
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={element.imageUrl}
                            alt="Element"
                            className="w-8 h-8 object-cover rounded border border-slate-500"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              Element #{element.id}
                            </p>
                            <p className="text-xs opacity-75">
                              Size: {element.width}x{element.height}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Spaces Tab */}
              {activeTab === 'spaces' && (
                <>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-semibold">
                      Available Spaces
                    </h3>
                    <button
                      onClick={() => setShowAddSpaceModal(true)}
                      className="p-1 text-blue-400 hover:text-blue-300"
                      title="Refresh spaces list"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    Click a space to create a portal, then click on the map to
                    place it
                  </p>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableSpaces.map((space) => (
                      <div
                        key={space.id}
                        onClick={() => {
                          setSelectedSpace(space);
                          setSelectedElement(null);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedSpace?.id === space.id
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Users className="w-8 h-8 text-blue-400 p-1 bg-slate-800 rounded" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{space.name}</p>
                            <p className="text-xs opacity-75">
                              Size: {space.dimensions}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Selected Item Info */}
              {(selectedElement || selectedSpace) && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                  <p className="text-white text-sm font-medium">Selected:</p>
                  <p className="text-slate-300 text-sm">
                    {selectedElement
                      ? `Element #${selectedElement.id} (${selectedElement.width}x${selectedElement.height})`
                      : `Map Space: ${selectedSpace?.name} (${selectedSpace?.width}x${selectedSpace?.height})`}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedElement(null);
                      setSelectedSpace(null);
                    }}
                    className="mt-2 text-xs text-slate-400 hover:text-white"
                  >
                    Click to deselect
                  </button>
                </div>
              )}

              {/* Placed Elements List */}
              {map.elements && map.elements.length > 0 && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">
                    Placed Elements
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {map.elements.map((element) => (
                      <div
                        key={element.id}
                        className="flex justify-between items-center p-2 rounded bg-slate-600/50"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={element.element.imageUrl}
                            alt="Element"
                            className="w-6 h-6 object-cover rounded border border-slate-500"
                          />
                          <span className="text-white text-sm">
                            Element at ({element.x}, {element.y})
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteElement(element.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete Element"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placed Map Spaces List */}
              {map.mapSpaces && map.mapSpaces.length > 0 && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">
                    Placed Space Portals
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {map.mapSpaces.map((mapSpace) => (
                      <div
                        key={mapSpace.id}
                        className="flex justify-between items-center p-2 rounded bg-slate-600/50"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="w-6 h-6 text-blue-400 p-1 bg-slate-800 rounded" />
                          <span className="text-white text-sm">
                            {mapSpace.spaceName} at ({mapSpace.x}, {mapSpace.y})
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteMapSpace(mapSpace.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Remove Space Portal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
              <div className="mb-4">
                <h3 className="text-white font-semibold">Map Canvas</h3>
                <p className="text-slate-400 text-sm">
                  {selectedElement &&
                    'Click on the map to place the selected element'}
                  {selectedSpace && 'Click on the map to place a space portal'}
                  {!selectedElement &&
                    !selectedSpace &&
                    'Select an element or space from the sidebar to start editing'}
                </p>
              </div>

              {/* Canvas Container */}
              <div className="overflow-auto border border-slate-600 rounded-lg bg-slate-900 max-h-[600px]">
                <canvas
                  ref={canvasRef}
                  width={map.width * CELL_SIZE}
                  height={map.height * CELL_SIZE}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  className="block cursor-crosshair"
                  style={{
                    imageRendering: 'pixelated',
                    cursor:
                      selectedElement || selectedSpace
                        ? 'crosshair'
                        : 'default',
                  }}
                />
              </div>

              {/* Instructions */}
              <div className="mt-4 text-sm text-slate-400">
                <p>• Click the red × button on elements to delete them</p>
                <p>• Elements are obstacles that block player movement</p>
                <p>
                  • Space portals (blue) will allow players to travel between
                  maps and spaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Space Portal Modal */}
      {showAddSpaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Space Portals
            </h3>
            <p className="text-slate-300 mb-4">
              Space portals allow players to travel from this map to specific
              spaces. Select a space from the sidebar and click on the map to
              place a portal.
            </p>
            <p className="text-slate-400 text-sm mb-6">
              Note: Portal functionality will be fully implemented when portal
              elements are added to the database schema.
            </p>
            <button
              onClick={() => setShowAddSpaceModal(false)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
