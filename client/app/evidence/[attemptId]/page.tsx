'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Eye, Calendar, User, AlertTriangle, Monitor, Users, Smartphone, X } from 'lucide-react';
import { evidenceAPI } from '../../../lib/api';

export default function EvidenceViewer() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageLoadingStates, setImageLoadingStates] = useState<{[key: string]: boolean}>({});
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    loadEvidences();
  }, []);

  const loadEvidences = async () => {
    try {
      const response = await evidenceAPI.getAttemptEvidences(params.attemptId as string);
      setData(response.data);
      
      // Initialize loading states for all images
      const loadingStates: {[key: string]: boolean} = {};
      response.data.allEvidences.forEach((evidence: any) => {
        loadingStates[evidence.id] = true;
      });
      setImageLoadingStates(loadingStates);
    } catch (error) {
      console.error('Failed to load evidences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = (evidenceId: string) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [evidenceId]: false
    }));
  };

  const handleImageError = (evidenceId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [evidenceId]: true
    }));
    setImageLoadingStates(prev => ({
      ...prev,
      [evidenceId]: false
    }));
  };

  const getViolationIcon = (type: string) => {
    switch (type) {
      case 'TAB_SWITCH': return <Monitor className="h-5 w-5" style={{ color: 'var(--color-danger)' }} />;
      case 'FULLSCREEN_EXIT': return <Monitor className="h-5 w-5" style={{ color: 'var(--color-warning)' }} />;
      case 'MULTIPLE_FACES': return <Users className="h-5 w-5" style={{ color: 'var(--color-info)' }} />;
      case 'PHONE_DETECTION': return <Smartphone className="h-5 w-5" style={{ color: 'var(--color-success)' }} />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getViolationLabel = (type: string) => {
    switch (type) {
      case 'TAB_SWITCH': return 'Tab Switch';
      case 'FULLSCREEN_EXIT': return 'Fullscreen Exit';
      case 'MULTIPLE_FACES': return 'Multiple Faces';
      case 'PHONE_DETECTION': return 'Phone Detection';
      default: return type;
    }
  };

  const getViolationColor = (type: string) => {
    switch (type) {
      case 'TAB_SWITCH': return '#ef4444';
      case 'FULLSCREEN_EXIT': return '#f59e0b';
      case 'MULTIPLE_FACES': return '#3b82f6';
      case 'PHONE_DETECTION': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="loading-spinner h-16 w-16 mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-text)' }}>Loading evidence...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-warning)' }} />
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>No Evidence Found</h2>
          <button onClick={() => router.back()} className="btn btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { attempt, allEvidences, totalEvidences } = data;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="btn btn-secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Attempts
          </button>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Evidence Review</h1>
        </div>

        {/* Student Info */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Student Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>{attempt.student.name}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{attempt.student.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>Test Duration</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {new Date(attempt.startedAt).toLocaleString()}
                      {attempt.finishedAt && ` - ${new Date(attempt.finishedAt).toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Test Information</h3>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>{attempt.test.title}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Test ID: {attempt.test.slug}</p>
            </div>
          </div>
        </div>

        {/* Violation Summary */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>Violation Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface-light)' }}>
              <Monitor className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-danger)' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{attempt.tabSwitchCount}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Tab Switches</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface-light)' }}>
              <Monitor className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-warning)' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{attempt.fullscreenExitCount}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Fullscreen Exits</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface-light)' }}>
              <Users className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-info)' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{attempt.multipleFacesCount}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Multiple Faces</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface-light)' }}>
              <Smartphone className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-success)' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{attempt.phoneDetectionCount}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Phone Detection</p>
            </div>
          </div>
        </div>

        {/* Evidence Grid */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
            Evidence Screenshots ({totalEvidences})
          </h3>
          
          {allEvidences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allEvidences.map((evidence: any) => (
                <div key={evidence.id} className="card hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setSelectedImage(evidence)}>
                  <div className="relative group">
                    {/* Loading indicator */}
                    {imageLoadingStates[evidence.id] && (
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="loading-spinner h-8 w-8"></div>
                      </div>
                    )}
                    
                    {/* Error state */}
                    {imageErrors[evidence.id] && (
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Failed to load image</p>
                        </div>
                      </div>
                    )}

                    {/* Actual image */}
                    <img
                      src={evidence.url}
                      alt={`${getViolationLabel(evidence.type)} evidence`}
                      className={`w-full h-48 object-cover rounded-lg mb-4 transition-all duration-200 ${
                        imageLoadingStates[evidence.id] || imageErrors[evidence.id] ? 'hidden' : 'block'
                      }`}
                      onLoad={() => handleImageLoad(evidence.id)}
                      onError={() => handleImageError(evidence.id)}
                      style={{ objectFit: 'cover' }}
                    />
                    
                    {/* Hover overlay - only show when image is loaded */}
                    {!imageLoadingStates[evidence.id] && !imageErrors[evidence.id] && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center mb-4">
                        <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getViolationIcon(evidence.type)}
                      <span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>
                        {getViolationLabel(evidence.type)}
                      </span>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getViolationColor(evidence.type) }}
                    ></div>
                  </div>
                  
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {new Date(evidence.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No Evidence Available</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>No screenshots were captured for this attempt.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <img
              src={selectedImage.url}
              alt={`${getViolationLabel(selectedImage.type)} evidence`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                {getViolationIcon(selectedImage.type)}
                <div>
                  <p className="font-medium">{getViolationLabel(selectedImage.type)}</p>
                  <p className="text-sm opacity-75">{new Date(selectedImage.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}